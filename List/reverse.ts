import { List, cons, tail, head, foldr } from "./index.ts"

// return a new list with elements in reverse order
export const reverse = <A>(xs: List<A>) => {
  const loop = (_xs: List<A>) => (z: List<A>): List<A> =>
    _xs === null ? z : loop(tail(_xs))(cons(head(_xs))(z))
  return loop(xs)(null)
}
