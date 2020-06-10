import { List, tail, head } from "./index.ts"

/**
 * @description: take a function which reduces from space A -> B and
 * apply it to every element in a List starting with the head
 *
 * @param xs list to iterate
 * @param z initial value of output
 * @param f function that will apply to each element
 */
export const foldr = <A>(xs: List<A>) => <B>(z: B) => (
  f: (_z: B) => (x: A) => B
): B => (xs === null ? z : foldr(tail(xs))(f(z)(head(xs)))(f))

// this is poorly optimized
export const foldl = <A>(xs: List<A>) => <B>(z: B) => (
  f: (_z: B) => (x: A) => B
): B => (xs === null ? z : f(foldl(tail(xs))(z)(f))(head(xs)))
