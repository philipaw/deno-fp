import { List, map } from "./index.ts"

export const square = (xs: List<number>) => map(xs)((x) => x * x)
