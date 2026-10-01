import { resolveMedia, youtubeId } from "@/lib/portfolio-videos";
import { YoutubeFrame } from "@/components/ui/YoutubeFrame";

export function MediaCover({
  src,
  title,
  className = "absolute inset-0 h-full w-full",
}: {
  src: string;
  title?: string;
  className?: string;
}) {
  const youtube = youtubeId(src);
  if (youtube) {
    return <YoutubeFrame videoId={youtube} title={title} className={className} />;
  }

  const media = resolveMedia(src);

  if (media.kind === "embed") {
    return (
      <iframe
        src={media.src}
        title={title || "Vídeo"}
        className={`${className} pointer-events-none border-0`}
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  return (
    <video
      src={media.src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={title}
      disablePictureInPicture
      disableRemotePlayback
      controls={false}
      className={`${className} object-cover`}
    />
  );
}
