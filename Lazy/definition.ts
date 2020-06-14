import { List } from "../List/index.ts"

export type Lazy<A> = () => A

export type LazyList<A> = List<Lazy<A>>
