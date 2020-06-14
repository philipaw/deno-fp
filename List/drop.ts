import { List, tail } from "./index.ts"

// return a new list without the first n elements
export const drop = <A>(xs: List<A>) => (n: BigInt): List<A> =>
  !xs ? null : n <= 0n ? xs : drop(tail(xs))(BigInt(n) - 1n)
