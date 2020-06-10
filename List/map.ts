import { cons, foldl, List } from "./index.ts"

/**
 * Takes a list, xs, and returns a new list with a function, f, applied to each member of xs
 * @param xs
 * @param f
 */
export const map = <A>(xs: List<A>) => (f: (_: A) => A): List<A> =>
  foldl(xs)<List<A>>(null)((z) => (x) => cons(f(x))(z))
