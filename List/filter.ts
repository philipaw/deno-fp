import { cons, List, foldl } from "./index.ts"

/**
 * @description iterate over a list and return a new list with values that satisy the given boolean function
 *
 * @param xs target to iterate over
 * @param f function that applies to each element of the list and returns a boolean
 */
export const filter = <A>(xs: List<A>) => (f: (x: A) => boolean): List<A> =>
  foldl(xs)<List<A>>(null)((z) => (_x) => (!f(_x) ? z : cons(_x)(z)))
