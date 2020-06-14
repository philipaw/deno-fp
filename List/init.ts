import { List, cons, tail, head, foldr } from "./index.ts"
// return a list with all but the last element
export const init = <A>(xs: List<A>): List<A> =>
  !xs ? xs : tail(xs) === null ? null : cons(head(xs))(init(tail(xs)))
