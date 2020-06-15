import { Lazy, lazy } from "../Lazy/index.ts"

export type LazyList<A> = Lazy<{
  head: Lazy<A>
  tail: LazyList<A>
} | null>

export const cons = <A>(a: Lazy<A>) => (b: LazyList<A>): LazyList<A> => () => ({
  head: a,
  tail: b,
})

export const head = <A>(xs: LazyList<A>): Lazy<A> => {
  const _xs = xs()
  if (!_xs) throw new TypeError("Attempted to get head of an empty list")
  else return _xs.head
}

export const tail = <A>(xs: LazyList<A>): LazyList<A> => {
  const _xs = xs()
  if (!_xs) throw new TypeError("Attempted to get tail of an empty list")
  else return _xs.tail
}

export const toLazyList = <A>(arr: [A]): LazyList<A> => {
  let xs: LazyList<A> = () => null
  for (let i = 0; i < arr.length; i++) {
    cons<A>(() => arr[i])(xs)
  }
  return xs
}

export const bad_range = (begin: Lazy<number>): LazyList<number> =>
  cons(begin)(bad_range(() => begin() + 1)) // this results in a memory leak
// () => 3
// () => (() => 3)() + 1
// () => (() => (() => 3)() + 1)() + 1

// this creates an infinite list
export const range = (begin: Lazy<number>): LazyList<number> => {
  const b = begin()
  return () => ({
    head: () => b,
    tail: range(() => b + 1),
  })
}

export const printLzList = <A>(xs: LazyList<A>) => {
  let node = xs()
  while (node !== null) {
    console.log(node.head())
    node = node.tail()
  }
}

export const take = (n: Lazy<number>) => <A>(
  xs: LazyList<A>
): LazyList<A> => () => {
  let _n = n()
  return _n > 0
    ? {
        head: head(xs),
        tail: take(() => _n - 1)(tail(xs)),
      }
    : null
}

export const filter = <A>(f: Lazy<(x: Lazy<A>) => Lazy<boolean>>) => (
  xs: LazyList<A>
): LazyList<A> => {
  const _xs = xs()
  if (_xs === null) return () => null
  else {
    const _f = f()
    const b = _f(_xs.head)()
    return b
      ? () => ({
          head: _xs.head,
          tail: filter(f)(_xs.tail),
        })
      : filter(f)(_xs.tail)
  }
}

export const even = lazy((x: Lazy<number>) => lazy(x() % 2 === 0))
export const odd = lazy((x: Lazy<number>) => lazy(x() % 2 !== 0))
