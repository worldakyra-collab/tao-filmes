export function CoverEmbedStyle() {
  return (
    <style href="cover-embed">{`
      .cover-embed {
        overflow: hidden;
      }
      .cover-embed iframe {
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        width: max(100%, 177.78vh) !important;
        height: max(100%, 56.25vw) !important;
        max-width: none !important;
        max-height: none !important;
        border: 0 !important;
        transform: translate(-50%, -50%) !important;
      }
      .cover-embed.cover-still iframe {
        pointer-events: none !important;
        width: max(100%, 177.78vh) !important;
        height: max(100%, 56.25vw) !important;
        transform: translate(-50%, -50%) scale(1.08) !important;
      }
    `}</style>
  );
}
