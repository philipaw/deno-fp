import { Lazy } from "../Lazy/index.ts"

export type LazyList<A> = Lazy<{
  head: Lazy<A>
  tail: LazyList<A>
} | null>

export const lzcons = <A>(a: Lazy<A>) => (
  b: LazyList<A>
): LazyList<A> => () => ({
  head: a,
  tail: b,
})

export const lzhead = <A>(xs: LazyList<A>): Lazy<A> => {
  const _xs = xs()
  if (!_xs) throw new TypeError("Attempted to get head of an empty list")
  else return _xs.head
}

export const lztail = <A>(xs: LazyList<A>): LazyList<A> => {
  const _xs = xs()
  if (!_xs) throw new TypeError("Attempted to get tail of an empty list")
  else return _xs.tail
}

export const toLazyList = <A>(arr: [A]): LazyList<A> => {
  let xs: LazyList<A> = () => null
  for (let i = 0; i < arr.length; i++) {
    lzcons<A>(() => arr[i])(xs)
  }
  return xs
}

export const range = (begin: Lazy<number>): LazyList<number> =>
  lzcons(begin)(range(() => begin() + 1))
