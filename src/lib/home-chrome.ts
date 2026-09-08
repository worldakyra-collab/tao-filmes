export const HOME_SOUND_EVENT = "tao:home-sound";

export function emitHomeSound(on: boolean) {
  window.dispatchEvent(new CustomEvent(HOME_SOUND_EVENT, { detail: on }));
}
