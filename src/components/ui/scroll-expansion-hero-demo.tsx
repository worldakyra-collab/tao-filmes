"use client";

import { useEffect } from "react";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { IlCapoWorksStack } from "@/components/ui/il-capo-works";
import { AsymmetricGallery } from "@/components/ui/asymmetric-gallery";

const media = {
  src: "/video/esse1.mp4",
  poster:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&q=80",
};

/** Distância de scroll só para o vídeo encolher, antes dos trabalhos entrarem. */
const SHRINK_RATIO = 0.9;

export default function TesteScrollExpansionDemo({
  showGallery = true,
  showStackCards = false,
}: {
  showGallery?: boolean;
  showStackCards?: boolean;
}) {
  useEffect(() => {
    const html = document.documentElement;
    const previousBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    return () => {
      html.style.scrollBehavior = previousBehavior;
    };
  }, []);

  return (
    <div className="bg-black">
      {/* Pinado enquanto a página rola; trabalhos sobem por cima no fim */}
      <div className="sticky top-0 z-0 h-dvh">
        <ScrollExpandMedia
          mediaType="video"
          mediaSrc={media.src}
          posterSrc={media.poster}
          marqueeText="TAO FILMES"
          shrinkViewportRatio={SHRINK_RATIO}
        />
      </div>

      {/* Reserva scroll para o shrink completar antes do rail aparecer */}
      <div
        aria-hidden
        className="pointer-events-none relative z-0"
        style={{ height: `${SHRINK_RATIO * 100}vh` }}
      />

      {showStackCards ? (
        <div className="relative z-20 bg-black">
          <IlCapoWorksStack />
        </div>
      ) : null}

      {showGallery ? (
        <div className="relative z-20">
          <AsymmetricGallery />
        </div>
      ) : null}
    </div>
  );
}
