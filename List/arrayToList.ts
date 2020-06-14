import { cons, List } from "./index.ts"

// make it easier to construct lists in ts
export const arrayToList = <A>(arr: A[]): List<A> => {
  const loop = (_arr: A[]) => (z: List<A>): List<A> => {
    const len = _arr.length
    return len === 0 ? z : loop(_arr.slice(0, len - 1))(cons(_arr[len - 1])(z))
  }
  return loop(arr)(null)
}
