import { head, List, tail } from "./index.ts"

// make it easier to display lists in ts
export const listToArray = <A>(xs: List<A>): A[] => {
  const loop = (_xs: List<A>) => (z: A[]): A[] => {
    return _xs === null ? z : loop(tail(_xs))([...z, head(_xs)])
  }
  return loop(xs)([])
}
