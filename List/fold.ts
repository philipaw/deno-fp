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
): B => (xs === null ? z : f(foldr(tail(xs))(z)(f))(head(xs))) // javascript isnt actually tail end optimized (yet?)

// this is functional, but poorly optimized because tail recursion isnt stack safe in js
export const foldl_UNSAFE = <A>(xs: List<A>) => <B>(z: B) => (
  f: (_z: B) => (x: A) => B
): B => {
  const loop = (_xs: List<A>) => (accum: B): B =>
    _xs === null ? accum : loop(tail(_xs))(f(accum)(head(_xs)))
  return loop(xs)(z)
}

export const foldl = <A>(xs: List<A>) => <B>(z: B) => (
  f: (_z: B) => (x: A) => B
): B => {
  let node = xs
  let state = z

  while (node !== null) {
    state = f(state)(head(node))
    node = tail(node)
  }

  return state
}
