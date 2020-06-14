import { Lazy } from "../Lazy/index.ts"

export type LazyNil = () => null

export type LazyList<A> = LazyCons<A> | LazyNil

export type LazyCons<A> = () => {
  head: Lazy<A>
  tail: Lazy<A>
}

export const lazyCons = <A>(a: Lazy<A>) => (b: Lazy<A>): LazyList<A> => () => ({
  head: a,
  tail: b,
})
