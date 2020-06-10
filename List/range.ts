import { List, cons } from "./index.ts"

export const range = (start: number) => (end: number): List<number> => {
  if (start >= end) throw new RangeError("start must be less than end")
  const loop = (_e: number) => (
    accum: List<number> | null = null
  ): List<number> => (start > _e ? accum : loop(_e - 1)(cons(_e)(accum)))
  return loop(end - 1)(null)
}
