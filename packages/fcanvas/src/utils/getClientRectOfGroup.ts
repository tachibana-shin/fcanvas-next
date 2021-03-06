import type { ComputedRef } from "@vue/reactivity"

import { BOUNCE_CLIENT_RECT } from "../symbols"
import type { GetClientRectOptions } from "../type/GetClientRectOptions"
import type { Offset } from "../type/Offset"
import type { Rect } from "../type/Rect"

// eslint-disable-next-line functional/no-mixed-type
export interface FakeShape {
  $: Partial<Offset>
  [BOUNCE_CLIENT_RECT]: ComputedRef<Rect>
  // eslint-disable-next-line functional/no-method-signature
  getClientRect(): Rect
}

export function getClientRectGroup(
  children: Set<FakeShape>,
  config?: GetClientRectOptions
) {
  // eslint-disable-next-line functional/no-let
  let x = Infinity
  // eslint-disable-next-line functional/no-let
  let y = Infinity
  /* width = 0,
       height = 0, */
  // eslint-disable-next-line functional/no-let
  let fillWidth = 0
  // eslint-disable-next-line functional/no-let
  let fillHeight = 0
  children.forEach((node) => {
    const clientRect = config
      ? node.getClientRect()
      : node[BOUNCE_CLIENT_RECT].value
    const { x: attrX = 0, y: attrY = 0 } = node.$

    x = Math.min(x, clientRect.x + attrX)
    y = Math.min(y, clientRect.y + attrY)

    const sumWidth = -clientRect.x + attrX + clientRect.width
    const sumHeight = -clientRect.y + attrY + clientRect.height

    // fillWidth = Math.max(fillWidth, sumWidth);
    // fillHeight = Math.max(fillHeight, sumHeight);
    if (fillWidth < sumWidth) fillWidth = sumWidth
    // width = sumWidth//clientRect.width;

    if (fillHeight < sumHeight) fillHeight = sumHeight
    // height = sumHeight//clientRect.height;
  })

  return {
    x,
    y,
    width: fillWidth,
    height: fillHeight
  }
}
