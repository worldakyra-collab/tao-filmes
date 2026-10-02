const MAX_PLAYING = 2;
const playing = new Set<HTMLVideoElement>();
const waiters = new Set<() => void>();

function notify() {
  waiters.forEach((wake) => wake());
}

export function claimPlayback(video: HTMLVideoElement) {
  if (playing.has(video)) return true;
  if (playing.size >= MAX_PLAYING) return false;
  playing.add(video);
  return true;
}

export function releasePlayback(video: HTMLVideoElement) {
  if (!playing.delete(video)) return;
  notify();
}

export function onPlaybackSlot(wake: () => void) {
  waiters.add(wake);
  return () => {
    waiters.delete(wake);
  };
}
