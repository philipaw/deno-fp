import { List, map } from "./index.ts"

export const square = (xs: List<number>) => map(xs)((x) => x * x)

export const __square__empty = (f: (x: number) => number) => (
  xs: List<number>
) => map(xs)(f)
