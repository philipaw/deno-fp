import { Lazy } from "./index.ts"

export const lazySum = (a: Lazy<number>) => (
  b: Lazy<number>
): Lazy<number> => () => a() + b()
