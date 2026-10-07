import Image from "next/image";
import { Bi } from "@/components/tx";

export function Plate({
  src,
  altEn,
  altPt,
  captionEn,
  captionPt,
  position = "center center",
  aspect = "aspect-[4/3]",
  priority = false,
  sizes = "(min-width: 1280px) 720px, 100vw",
  className = "",
}: {
  src: string;
  altEn: string;
  altPt: string;
  captionEn?: string;
  captionPt?: string;
  position?: string;
  aspect?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden bg-paper-2 ${aspect}`}>
        <Image
          src={src}
          alt={altEn}
          data-alt-pt={altPt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </div>
      {captionEn && captionPt ? (
        <figcaption className="mt-3 flex items-center gap-3 text-muted">
          <span className="gold-line w-6" />
          <span className="caps">
            <Bi en={captionEn} pt={captionPt} />
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}

export function FramedPortrait({ className = "" }: { className?: string }) {
  return (
    <figure className={`w-[200px] max-w-full ${className}`}>
      <div className="bg-paper-2 p-3">
        <Image
          src="/media/portraits/dr-hanna-upscaled-500.jpg"
          alt="Dr. Donald P. Hanna"
          width={500}
          height={500}
          className="h-auto w-full max-w-[200px] object-cover object-[center_18%]"
          style={{ maxWidth: 200 }}
        />
      </div>
      <figcaption className="mt-3 caps text-muted">
        <Bi en="DR. DONALD P. HANNA" pt="DR. DONALD P. HANNA" />
      </figcaption>
    </figure>
  );
}
