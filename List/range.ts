import { List, cons } from "./index.ts"

export const range = (start: number) => (end: number): List<number> => {
  if (start >= end) return null
  const loop = (_s: number) => (
    accum: List<number> | null = null
  ): List<number> => (_s < end ? loop(_s + 1)(cons(_s)(accum)) : accum)
  return loop(start)(null)
}
