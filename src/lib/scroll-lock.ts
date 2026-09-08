let lockCount = 0;

/** Trava o scroll do body com contagem — evita ficar preso ao navegar. */
export function lockBodyScroll() {
  if (typeof document === "undefined") {
    return () => undefined;
  }

  lockCount += 1;
  document.body.style.overflow = "hidden";

  let released = false;
  return () => {
    if (released) return;
    released = true;
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) {
      document.body.style.overflow = "";
    }
  };
}

export function forceUnlockBodyScroll() {
  if (typeof document === "undefined") return;
  lockCount = 0;
  document.body.style.overflow = "";
}
