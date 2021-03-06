import { isDev } from "../env"

// eslint-disable-next-line functional/no-let
let event: Event | null

export function _setEvent<T extends Event>(_e: T | null): void {
  event = _e
}
export function useEvent<T extends Event>() {
  if (!event) {
    if (isDev)
      console.warn("[useEvent]: call this function on stack event handler.")
  }

  return event as T
}
