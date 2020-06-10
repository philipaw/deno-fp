import { cons, foldr, List } from "./index.ts"

/**
 * Takes a list, xs, and returns a new list with a function, f, applied to each member of xs
 * @param xs
 * @param f
 */
export const map = <A>(xs: List<A>) => (f: (x: A) => A): List<A> =>
  foldr(xs)<List<A>>(null)((z) => (_x) => cons(f(_x))(z))
