"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  PageCurtain,
  CURTAIN_HOLD_MS,
  type CurtainPace,
  type CurtainPhase,
} from "@/components/layout/PageCurtain";
import { forceUnlockBodyScroll, lockBodyScroll } from "@/lib/scroll-lock";

type PageTransitionContextValue = {
  phase: CurtainPhase;
  navigate: (href: string) => void;
  arrivedViaCurtain: boolean;
};

const PageTransitionContext = createContext<PageTransitionContextValue>({
  phase: "hidden",
  navigate: () => undefined,
  arrivedViaCurtain: false,
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

function normalizePath(href: string) {
  try {
    const url = new URL(href, window.location.origin);
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return href;
  }
}

function pathOnly(href: string) {
  try {
    return new URL(href, window.location.origin).pathname;
  } catch {
    return href;
  }
}

function isInternalNavLink(anchor: HTMLAnchorElement) {
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;
  if (anchor.dataset.noTransition === "true") return false;

  const href = anchor.getAttribute("href");
  if (!href) return false;
  if (
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("javascript:")
  ) {
    return false;
  }

  try {
    const url = new URL(href, window.location.origin);
    return url.origin === window.location.origin;
  } catch {
    return false;
  }
}

function samePage(href: string) {
  const next = new URL(href, window.location.origin);
  return (
    next.pathname === window.location.pathname &&
    next.search === window.location.search &&
    next.hash === window.location.hash
  );
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<CurtainPhase>("covered");
  const [pace, setPace] = useState<CurtainPace>("full");
  const [arrivedViaCurtain, setArrivedViaCurtain] = useState(false);

  const pendingHref = useRef<string | null>(null);
  const busy = useRef(false);
  const expectPath = useRef<string | null>(null);
  const phaseRef = useRef(phase);
  const pathnameRef = useRef(pathname);
  phaseRef.current = phase;
  pathnameRef.current = pathname;

  const navigate = useCallback(
    (href: string) => {
      const target = normalizePath(href);
      if (busy.current) return;
      if (samePage(target)) return;

      busy.current = true;
      pendingHref.current = target;
      expectPath.current = pathOnly(target);
      setArrivedViaCurtain(false);
      setPace("full");
      setPhase("closing");
      router.prefetch(pathOnly(target));
    },
    [router],
  );

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target as Element | null;
      const anchor = target?.closest?.("a");
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return;
      if (!isInternalNavLink(anchor)) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const normalized = normalizePath(href);
      if (samePage(normalized)) return;

      event.preventDefault();
      navigate(normalized);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate]);

  const onClosed = useCallback(() => {
    const href = pendingHref.current;
    if (!href) {
      busy.current = false;
      setPhase("hidden");
      return;
    }

    setPhase("covered");
    router.push(href);
  }, [router]);

  const onOpened = useCallback(() => {
    pendingHref.current = null;
    expectPath.current = null;
    busy.current = false;
    setPhase("hidden");
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (pendingHref.current) return;
      if (phaseRef.current !== "covered") return;
      setPhase("opening");
    }, 16);
    return () => window.clearTimeout(timer);
  }, []);

  // Cortina coberta + rota nova → abre.
  useEffect(() => {
    if (phase !== "covered") return;
    if (!expectPath.current) return;
    if (pathname !== expectPath.current) return;

    setArrivedViaCurtain(true);
    const timer = window.setTimeout(() => {
      setPhase("opening");
    }, CURTAIN_HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [pathname, phase]);

  // A cortina só abre quando a rota nova já chegou. Enquanto isso, fica branca.
  useEffect(() => {
    if (phase !== "covered") return;
    if (!expectPath.current) return;
    if (pathname === expectPath.current) return;

    const retry = window.setTimeout(() => {
      if (phaseRef.current !== "covered") return;
      if (pathnameRef.current === expectPath.current) return;
      if (pendingHref.current) router.push(pendingHref.current);
    }, 1200);

    const hard = window.setTimeout(() => {
      if (phaseRef.current !== "covered") return;
      if (pathnameRef.current === expectPath.current) return;
      if (pendingHref.current) window.location.assign(pendingHref.current);
    }, 8000);

    return () => {
      window.clearTimeout(retry);
      window.clearTimeout(hard);
    };
  }, [phase, pathname, router]);

  useEffect(() => {
    // Limpa overflow preso de navegações anteriores (HMR / race de locks).
    forceUnlockBodyScroll();
  }, []);

  useEffect(() => {
    if (phase === "hidden") return;
    return lockBodyScroll();
  }, [phase]);

  useEffect(() => {
    if (!arrivedViaCurtain || phase !== "hidden") return;
    const timer = window.setTimeout(() => setArrivedViaCurtain(false), 120);
    return () => window.clearTimeout(timer);
  }, [arrivedViaCurtain, phase, pathname]);

  return (
    <PageTransitionContext.Provider
      value={{ phase, navigate, arrivedViaCurtain }}
    >
      {children}
      <PageCurtain phase={phase} pace={pace} onClosed={onClosed} onOpened={onOpened} />
    </PageTransitionContext.Provider>
  );
}
