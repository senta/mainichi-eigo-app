export const stringifyHLS = (h: number, l: number, s: number, a = 1) =>
  `hsla(${h}, ${l}%, ${s}%, ${a})`
