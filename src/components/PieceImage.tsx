import Image from "next/image";
import { urlFor } from "@/sanity/client";

type Props = {
  image?: any;
  alt: string;
  ratio?: "square" | "portrait" | "wide";
  priority?: boolean;
  sizes?: string;
};

const ratioClass = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  wide: "aspect-[16/9]",
};

export default function PieceImage({ image, alt, ratio = "portrait", priority, sizes }: Props) {
  const src = image ? urlFor(image).width(1600).auto("format").url() : null;
  return (
    <div className={`relative w-full overflow-hidden bg-rule ${ratioClass[ratio]}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes || "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"}
          className="object-cover"
          priority={priority}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-ink/30 serif text-lg">
          Image forthcoming
        </div>
      )}
    </div>
  );
}
