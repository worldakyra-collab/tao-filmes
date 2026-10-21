"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SiteLive() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/fuiejvudnvpsfu3ruwrv2fuefvjp9f30dvr@d22fevui")) return;

    const versao = async () => {
      try {
        const response = await fetch("/api/painel/estado", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "versao" }),
        });
        const data = (await response.json()) as { version: number };
        const saved = sessionStorage.getItem("tao-versao");
        if (saved !== null && saved !== String(data.version)) {
          sessionStorage.setItem("tao-versao", String(data.version));
          window.location.reload();
          return;
        }
        sessionStorage.setItem("tao-versao", String(data.version));
      } catch {
        /* segue sem travar a página */
      }
    };

    void versao();
    const watch = window.setInterval(versao, 20000);
    return () => window.clearInterval(watch);
  }, [pathname]);

  return null;
}
