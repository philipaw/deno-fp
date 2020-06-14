import { List, cons } from "./index.ts"
// return a new list with head, e
export const push = <A>(xs: List<A>) => (e: A) => cons(e)(xs)
