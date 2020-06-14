import { List, cons, tail, head, foldr } from "./index.ts"

// return the length of a list
export const length = <A>(xs: List<A>): number =>
  foldr(xs)(0)((z) => (_) => z + 1)
