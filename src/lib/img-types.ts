/** Atributos de una imagen ya optimizada por `astro:assets`, serializables como prop de isla React. */
export type ImgAttrs = {
  src: string;
  srcSet?: string;
  sizes?: string;
  width: number;
  height: number;
};
