import { push, List, foldr } from "./index.ts"

/**
 * @description iterate over a list and return a new list with values that satisy the given boolean function
 *
 * @param xs target to iterate over
 * @param f function that applies to each element of the list and returns a boolean
 */
export const filter = <A>(xs: List<A>) => (f: (_: A) => boolean): List<A> =>
  foldr(xs)<List<A>>(null)((z) => (x) => (!f(x) ? z : push(z)(x)))
