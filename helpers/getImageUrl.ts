import { ImageLoaderProps } from "next/image";

const getImageUrl = () => process.env.NEXT_PUBLIC_SAVE_PLUS_IMAGES_URL;

export const imgLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${getImageUrl()}/${src}?w=${width}&q=${quality || 75}`;
};

export const avatarLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export default getImageUrl;
