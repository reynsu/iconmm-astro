import { useEffect, useRef } from "react";
import * as THREE from "three";
import { withBase } from "@/lib/url";

/**
 * La bailarina del hero original (iconmm.com), reconstruida en 3D con three.js como
 * ~3.800 trozos de papel. Los datos (posición + color de cada trozo) se muestrean de la
 * imagen original y se sirven en /data/dancer.bin (26 KB).
 *
 * Interacción: el puntero empuja los trozos cercanos (y los levanta hacia la cámara);
 * un muelle amortiguado los devuelve poco a poco a su sitio con un ligero aleteo.
 */

const DATA_URL = withBase("/data/dancer.bin");

type Props = { className?: string };

export default function PaperDancer({ className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let disposed = false;
    let dispose = () => {};

    fetch(DATA_URL)
      .then((r) => r.arrayBuffer())
      .then((buf) => {
        if (disposed) return;
        dispose = mount(el, buf);
      })
      .catch(() => {});

    return () => {
      disposed = true;
      dispose();
    };
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {/* sombra de contacto, como en el original */}
      <div className="pointer-events-none absolute bottom-[7%] left-1/2 h-[8%] w-[58%] -translate-x-1/2 rounded-[50%] bg-ink/20 blur-2xl" />
    </div>
  );
}

function mount(el: HTMLElement, buf: ArrayBuffer) {
  const view = new DataView(buf);
  const N = view.getUint32(0, true);
  const xy = new Int16Array(buf, 4, N * 2);
  const rgb = new Uint8Array(buf, 4 + N * 4, N * 3);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const rnd = mulberry32(7);

  // --- escena --------------------------------------------------------------
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  Object.assign(renderer.domElement.style, {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    touchAction: "pan-y",
    opacity: "0",
    transition: "opacity 1400ms ease",
  });
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 10, 8000);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xcdbfae, 1.15));
  const key = new THREE.DirectionalLight(0xffffff, 1.7);
  key.position.set(320, 540, 900);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xfff1e0, 0.45);
  fill.position.set(-600, -200, 500);
  scene.add(fill);

  // trozo de ticket: rectángulo (misma área que el cuadrado original) con una ligera
  // curvatura para que la luz lo modele
  const geo = new THREE.PlaneGeometry(1.3, 0.78, 2, 2);
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i);
    p.setZ(i, (x * x - y * y) * 0.22);
  }
  geo.computeVertexNormals();
  // Seis diseños de ticket (texturas procedurales, casi blancas para que el color de
  // cada trozo lo ponga el tinte por instancia). Un InstancedMesh por diseño; el trozo i
  // usa el diseño i % V.
  const textures = makeTicketTextures(rnd);
  const V = textures.length;
  const meshes = textures.map((map, v) => {
    const mat = new THREE.MeshStandardMaterial({
      map,
      roughness: 0.88,
      metalness: 0,
      side: THREE.DoubleSide,
      alphaTest: 0.5, // perforaciones y muescas
    });
    const im = new THREE.InstancedMesh(geo, mat, Math.ceil((N - v) / V));
    im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(im);
    return im;
  });

  // --- estado por trozo ----------------------------------------------------
  const home = new Float32Array(N * 3);
  const pos = new Float32Array(N * 3);
  const vel = new Float32Array(N * 3);
  const rotHome = new Float32Array(N * 3);
  const rot = new Float32Array(N * 3);
  const rotVel = new Float32Array(N * 3);
  const size = new Float32Array(N);
  const phase = new Float32Array(N);
  const lift = new Float32Array(N);
  const origin = new Float32Array(N * 3); // posición de entrada
  const rotStart = new Float32Array(N * 3);
  const delay = new Float32Array(N); // escalonado de la entrada

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  const color = new THREE.Color();
  for (let i = 0; i < N; i++) {
    const hx = xy[i * 2];
    const hy = -xy[i * 2 + 1];
    const hz = (rnd() - 0.5) * 80;
    home[i * 3] = hx; home[i * 3 + 1] = hy; home[i * 3 + 2] = hz;
    minX = Math.min(minX, hx); maxX = Math.max(maxX, hx);
    minY = Math.min(minY, hy); maxY = Math.max(maxY, hy);

    rotHome[i * 3] = (rnd() - 0.5) * 0.9;
    rotHome[i * 3 + 1] = (rnd() - 0.5) * 0.9;
    rotHome[i * 3 + 2] = rnd() * Math.PI * 2;

    // entrada: cada trozo se desliza suavemente desde muy cerca de su sitio
    const a = rnd() * Math.PI * 2, d = reduceMotion ? 0 : 36 + rnd() * 90;
    origin[i * 3] = pos[i * 3] = hx + Math.cos(a) * d;
    origin[i * 3 + 1] = pos[i * 3 + 1] = hy + Math.sin(a) * d * 0.6 - (reduceMotion ? 0 : 30);
    origin[i * 3 + 2] = pos[i * 3 + 2] = hz + (reduceMotion ? 0 : (rnd() - 0.5) * 160);
    rotStart[i * 3] = rot[i * 3] = rotHome[i * 3] + (reduceMotion ? 0 : (rnd() - 0.5) * 1.6);
    rotStart[i * 3 + 1] = rot[i * 3 + 1] = rotHome[i * 3 + 1] + (reduceMotion ? 0 : (rnd() - 0.5) * 1.6);
    rotStart[i * 3 + 2] = rot[i * 3 + 2] = rotHome[i * 3 + 2] + (reduceMotion ? 0 : (rnd() - 0.5) * 0.6);

    size[i] = 5.5 + rnd() * 6.5;
    phase[i] = rnd() * Math.PI * 2;
    lift[i] = 0.6 + rnd();

    const tone = 0.9 + rnd() * 0.16;
    color.setRGB((rgb[i * 3] / 255) * tone, (rgb[i * 3 + 1] / 255) * tone, (rgb[i * 3 + 2] / 255) * tone, THREE.SRGBColorSpace);
    meshes[i % V].setColorAt((i / V) | 0, color);
  }
  for (const m of meshes) if (m.instanceColor) m.instanceColor.needsUpdate = true;

  const figW = maxX - minX, figH = maxY - minY;
  const INTRO_DUR = 1.7, INTRO_STAGGER = 0.9, INTRO_END = INTRO_DUR + INTRO_STAGGER + 0.1;
  for (let i = 0; i < N; i++) {
    const fromBottom = (home[i * 3 + 1] - minY) / figH;
    delay[i] = reduceMotion ? 0 : fromBottom * INTRO_STAGGER * 0.8 + rnd() * INTRO_STAGGER * 0.2;
  }

  // --- cámara / tamaño -----------------------------------------------------
  let camDist = 1000;
  const fit = () => {
    const w = el.clientWidth || 1, h = el.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const t = Math.tan((camera.fov * Math.PI) / 360);
    const zH = (figH * 0.56) / t;
    const zW = (figW * 0.54) / (t * camera.aspect);
    camDist = Math.max(zH, zW);
    camera.position.z = camDist;
    camera.updateProjectionMatrix();
  };
  fit();
  const ro = new ResizeObserver(fit);
  ro.observe(el);

  // --- puntero -------------------------------------------------------------
  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const ndc = new THREE.Vector2();
  const hit = new THREE.Vector3();
  const pointer = { x: 0, y: 0, vx: 0, vy: 0, nx: 0, ny: 0, active: false, last: 0 };

  const onMove = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    pointer.nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
    ndc.set(pointer.nx, pointer.ny);
    raycaster.setFromCamera(ndc, camera);
    if (!raycaster.ray.intersectPlane(plane, hit)) return;
    const now = performance.now();
    if (pointer.active) {
      const dt = Math.max(8, now - pointer.last) / 1000;
      pointer.vx = clamp((hit.x - pointer.x) / dt, -4000, 4000);
      pointer.vy = clamp((hit.y - pointer.y) / dt, -4000, 4000);
    }
    pointer.x = hit.x; pointer.y = hit.y; pointer.active = true; pointer.last = now;
  };
  const onLeave = () => { pointer.active = false; pointer.vx = pointer.vy = 0; };
  el.addEventListener("pointermove", onMove, { passive: true });
  el.addEventListener("pointerdown", onMove, { passive: true });
  el.addEventListener("pointerleave", onLeave);
  el.addEventListener("pointercancel", onLeave);
  el.addEventListener("pointerup", onLeave);

  // --- bucle ---------------------------------------------------------------
  const dummy = new THREE.Object3D();
  const clock = new THREE.Clock();
  let raf = 0, running = false, visible = true, t = 0, shown = false;

  const R = 150, R2 = R * R;
  const STIFF = 0.012, DAMP = 0.9, RSTIFF = 0.02, RDAMP = 0.88;
  const MAXV = 9; // velocidad máxima por paso, evita saltos

  const step = () => {
    raf = 0;
    if (!visible || document.hidden) { running = false; return; }
    const dt = Math.min(clock.getDelta(), 0.05);
    t += dt;
    const k = dt * 60; // pasos normalizados a 60 fps
    const damp = Math.pow(DAMP, k), rdamp = Math.pow(RDAMP, k);
    const intro = t < INTRO_END;
    const act = pointer.active && !reduceMotion && !intro;
    const px = pointer.x, py = pointer.y;
    const pvx = pointer.vx * 0.0015, pvy = pointer.vy * 0.0015;

    for (let i = 0; i < N; i++) {
      const i3 = i * 3;
      const ph = phase[i];
      // vaivén de reposo, como si el papel respirase
      const tx = home[i3] + (reduceMotion ? 0 : Math.sin(t * 0.7 + ph) * 1.6);
      const ty = home[i3 + 1] + (reduceMotion ? 0 : Math.cos(t * 0.9 + ph * 1.3) * 2.2);
      const tz = home[i3 + 2];

      if (intro) {
        const p = clamp((t - delay[i]) / INTRO_DUR, 0, 1);
        const e = 1 - Math.pow(1 - p, 3); // ease-out cúbico
        const x = origin[i3] + (tx - origin[i3]) * e;
        const y = origin[i3 + 1] + (ty - origin[i3 + 1]) * e;
        const z = origin[i3 + 2] + (tz - origin[i3 + 2]) * e;
        const rx = rotStart[i3] + (rotHome[i3] - rotStart[i3]) * e;
        const ry = rotStart[i3 + 1] + (rotHome[i3 + 1] - rotStart[i3 + 1]) * e;
        const rz = rotStart[i3 + 2] + (rotHome[i3 + 2] - rotStart[i3 + 2]) * e;
        pos[i3] = x; pos[i3 + 1] = y; pos[i3 + 2] = z;
        rot[i3] = rx; rot[i3 + 1] = ry; rot[i3 + 2] = rz;
        dummy.position.set(x, y, z);
        dummy.rotation.set(rx, ry, rz);
        dummy.scale.setScalar(size[i] * (0.6 + 0.4 * e));
        dummy.updateMatrix();
        meshes[i % V].setMatrixAt((i / V) | 0, dummy.matrix);
        continue;
      }

      let x = pos[i3], y = pos[i3 + 1], z = pos[i3 + 2];
      let vx = vel[i3], vy = vel[i3 + 1], vz = vel[i3 + 2];

      if (act) {
        const dx = x - px, dy = y - py, d2 = dx * dx + dy * dy;
        if (d2 < R2) {
          const d = Math.sqrt(d2) || 1;
          let f = 1 - d / R;
          f *= f;
          const push = 3.2 * f * k;
          vx += (dx / d) * push + pvx * f * k;
          vy += (dy / d) * push + pvy * f * k;
          vz += (7 + 9 * lift[i]) * f * k; // se levanta ligeramente hacia la cámara
          rotVel[i3] += (Math.sin(ph) * 0.5) * f * k * 0.14;
          rotVel[i3 + 1] += (Math.cos(ph * 2.1) * 0.5) * f * k * 0.14;
          rotVel[i3 + 2] += (Math.sin(ph * 3.3) * 0.4) * f * k * 0.14;
        }
      }

      // muelle amortiguado hacia la posición de reposo
      vx += (tx - x) * STIFF * k; vy += (ty - y) * STIFF * k; vz += (tz - z) * STIFF * k;
      vx = clamp(vx * damp, -MAXV, MAXV); vy = clamp(vy * damp, -MAXV, MAXV); vz = clamp(vz * damp, -MAXV * 2, MAXV * 2);
      x += vx * k; y += vy * k; z += vz * k;

      // el papel aletea mientras se mueve
      const speed = Math.abs(vx) + Math.abs(vy) + Math.abs(vz);
      const flutter = Math.min(speed * 0.003, 0.05);
      let rx = rot[i3], ry = rot[i3 + 1], rz = rot[i3 + 2];
      let rvx = rotVel[i3] + (rotHome[i3] - rx) * RSTIFF * k + Math.sin(t * 6 + ph) * flutter * k;
      let rvy = rotVel[i3 + 1] + (rotHome[i3 + 1] - ry) * RSTIFF * k + Math.cos(t * 5 + ph) * flutter * k;
      let rvz = rotVel[i3 + 2] + (rotHome[i3 + 2] - rz) * RSTIFF * k;
      rvx *= rdamp; rvy *= rdamp; rvz *= rdamp;
      rx += rvx * k; ry += rvy * k; rz += rvz * k;

      pos[i3] = x; pos[i3 + 1] = y; pos[i3 + 2] = z;
      vel[i3] = vx; vel[i3 + 1] = vy; vel[i3 + 2] = vz;
      rot[i3] = rx; rot[i3 + 1] = ry; rot[i3 + 2] = rz;
      rotVel[i3] = rvx; rotVel[i3 + 1] = rvy; rotVel[i3 + 2] = rvz;

      dummy.position.set(x, y, z);
      dummy.rotation.set(rx, ry, rz);
      dummy.scale.setScalar(size[i]);
      dummy.updateMatrix();
      meshes[i % V].setMatrixAt((i / V) | 0, dummy.matrix);
    }
    for (const m of meshes) m.instanceMatrix.needsUpdate = true;

    // paralaje sutil de cámara
    const cx = reduceMotion ? 0 : (pointer.active ? pointer.nx : 0) * 40;
    const cy = reduceMotion ? 0 : (pointer.active ? pointer.ny : 0) * 24;
    camera.position.x += (cx - camera.position.x) * Math.min(1, 0.04 * k);
    camera.position.y += (cy - camera.position.y) * Math.min(1, 0.04 * k);
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    if (!shown) { shown = true; renderer.domElement.style.opacity = "1"; }
    raf = requestAnimationFrame(step);
  };

  const start = () => {
    if (running) return;
    running = true;
    clock.getDelta();
    raf = requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
  }, { threshold: 0.02 });
  io.observe(el);
  const onVis = () => { if (!document.hidden) start(); };
  document.addEventListener("visibilitychange", onVis);
  start();

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    document.removeEventListener("visibilitychange", onVis);
    el.removeEventListener("pointermove", onMove);
    el.removeEventListener("pointerdown", onMove);
    el.removeEventListener("pointerleave", onLeave);
    el.removeEventListener("pointercancel", onLeave);
    el.removeEventListener("pointerup", onLeave);
    geo.dispose();
    for (const m of meshes) {
      const mat = m.material as THREE.MeshStandardMaterial;
      mat.map?.dispose();
      mat.dispose();
    }
    renderer.dispose();
    renderer.domElement.remove();
  };
}

function clamp(v: number, a: number, b: number) {
  return v < a ? a : v > b ? b : v;
}

// PRNG determinista: la figura se ve igual en cada carga
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Texturas de ticket (256×154 px). Fondo blanco con detalles en tinta oscura y
 * perforaciones transparentes; el color de cada trozo se aplica como tinte por instancia,
 * así que el tamaño y el color de la figura no cambian.
 */
export function makeTicketTextures(rnd: () => number): THREE.CanvasTexture[] {
  const W = 256, H = 154;
  const INK = "rgba(28,22,24,0.82)";
  const INK_SOFT = "rgba(28,22,24,0.45)";

  const make = (draw: (ctx: CanvasRenderingContext2D) => void) => {
    const canvas = document.createElement("canvas");
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext("2d")!;
    // papel: blanco con un grano vertical muy leve
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(0,0,0,0.035)";
    for (let x = 0; x < W; x += 3) if (rnd() < 0.5) ctx.fillRect(x, 0, 1, H);
    draw(ctx);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    return tex;
  };

  // utilidades de dibujo
  const hole = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  };
  const perforation = (ctx: CanvasRenderingContext2D, y: number, step = 18, r = 5) => {
    for (let x = step / 2; x < W; x += step) hole(ctx, x, y, r);
  };
  const dashed = (ctx: CanvasRenderingContext2D, x: number) => {
    ctx.save();
    ctx.strokeStyle = INK_SOFT; ctx.lineWidth = 3; ctx.setLineDash([9, 7]);
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    ctx.restore();
  };
  const textLines = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, rows: number, h = 7, gap = 13) => {
    ctx.fillStyle = INK;
    for (let r = 0; r < rows; r++) ctx.fillRect(x, y + r * gap, w * (0.45 + rnd() * 0.55), h);
  };
  const barcode = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => {
    ctx.fillStyle = INK;
    let cx = x;
    while (cx < x + w) { const bw = 2 + Math.floor(rnd() * 5); if (rnd() < 0.6) ctx.fillRect(cx, y, bw, h); cx += bw + 2; }
  };
  const qr = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, n = 7) => {
    const c = size / n; ctx.fillStyle = INK;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (rnd() < 0.5) ctx.fillRect(x + i * c, y + j * c, c, c);
    ctx.fillRect(x, y, c * 2, c * 2); ctx.fillRect(x + size - c * 2, y, c * 2, c * 2); ctx.fillRect(x, y + size - c * 2, c * 2, c * 2);
  };
  const band = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, alpha = 0.75) => {
    ctx.fillStyle = `rgba(28,22,24,${alpha})`; ctx.fillRect(x, y, w, h);
  };

  return [
    // 1 · billete de tren: cabecera, líneas de texto, código de barras y perforaciones
    make((ctx) => {
      band(ctx, 0, 0, W, 26);
      ctx.fillStyle = "rgba(255,255,255,0.9)"; ctx.fillRect(14, 8, 70, 10);
      textLines(ctx, 16, 42, 130, 4);
      barcode(ctx, 150, 48, 92, 54);
      ctx.fillStyle = INK; ctx.fillRect(16, 118, 60, 12);
      perforation(ctx, 0); perforation(ctx, H);
    }),
    // 2 · metro: borde, chevrons y banda magnética
    make((ctx) => {
      ctx.strokeStyle = INK_SOFT; ctx.lineWidth = 4; ctx.strokeRect(6, 6, W - 12, H - 12);
      ctx.fillStyle = INK;
      for (let k = 0; k < 3; k++) {
        const x = 22 + k * 30;
        ctx.beginPath(); ctx.moveTo(x, 30); ctx.lineTo(x + 16, 48); ctx.lineTo(x, 66); ctx.lineTo(x + 8, 66); ctx.lineTo(x + 24, 48); ctx.lineTo(x + 8, 30); ctx.closePath(); ctx.fill();
      }
      textLines(ctx, 130, 32, 100, 3);
      band(ctx, 0, 108, W, 30, 0.85);
    }),
    // 3 · tarjeta de embarque: dos columnas y talón con QR
    make((ctx) => {
      textLines(ctx, 14, 18, 70, 5, 6, 12);
      textLines(ctx, 96, 18, 60, 5, 6, 12);
      ctx.fillStyle = INK; ctx.fillRect(14, 96, 110, 16);
      textLines(ctx, 14, 122, 110, 2, 5, 10);
      dashed(ctx, 176);
      perforation(ctx, 0, 22, 4); perforation(ctx, H, 22, 4);
      qr(ctx, 192, 42, 52);
    }),
    // 4 · entrada: muescas laterales y "ADMIT ONE"
    make((ctx) => {
      hole(ctx, 0, H / 2, 16); hole(ctx, W, H / 2, 16);
      ctx.strokeStyle = INK_SOFT; ctx.lineWidth = 3; ctx.strokeRect(24, 14, W - 48, H - 28);
      band(ctx, 40, 44, W - 80, 22);
      band(ctx, 40, 72, W - 80, 10, 0.5);
      textLines(ctx, 48, 96, 160, 2, 6, 12);
    }),
    // 5 · recibo: muchas líneas y borde inferior dentado
    make((ctx) => {
      textLines(ctx, 18, 14, 220, 8, 5, 14);
      ctx.fillStyle = INK; ctx.fillRect(18, 126, 90, 9);
      ctx.save(); ctx.globalCompositeOperation = "destination-out"; ctx.beginPath();
      for (let x = 0; x <= W; x += 16) { ctx.lineTo(x, H); ctx.lineTo(x + 8, H - 9); }
      ctx.lineTo(W, H); ctx.closePath(); ctx.fill(); ctx.restore();
    }),
    // 6 · ticket picado: taladro, rayado diagonal y texto
    make((ctx) => {
      hole(ctx, 34, 34, 12);
      ctx.save(); ctx.beginPath(); ctx.rect(176, 0, 80, H); ctx.clip();
      ctx.strokeStyle = INK_SOFT; ctx.lineWidth = 6;
      for (let d = -H; d < W; d += 18) { ctx.beginPath(); ctx.moveTo(d, H); ctx.lineTo(d + H, 0); ctx.stroke(); }
      ctx.restore();
      textLines(ctx, 60, 24, 100, 3, 7, 14);
      barcode(ctx, 18, 92, 150, 40);
    }),
  ];
}
