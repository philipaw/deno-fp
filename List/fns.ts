import { List, cons, tail, head, foldr } from "./index.ts"

// return a new list with head, e
const push = <A>(xs: List<A>) => (e: A) => cons(e)(xs)

// return a new list without the first n elements
const drop = <A>(xs: List<A>) => (n: BigInt): List<A> =>
  !xs ? null : n <= 0n ? xs : drop(tail(xs))(BigInt(n) - 1n)

// return a new list with elements in reverse order
const reverse = <A>(xs: List<A>) => {
  const loop = (_xs: List<A>) => (z: List<A>): List<A> =>
    _xs === null ? z : loop(tail(_xs))(cons(head(_xs))(z))
  return loop(xs)(null)
}

// return a list with all but the last element
const init = <A>(xs: List<A>): List<A> =>
  !xs ? xs : tail(xs) === null ? null : cons(head(xs))(init(tail(xs)))

// return the length of a list
const length = <A>(xs: List<A>): number => foldr(xs)(0)((z) => (_) => z + 1)

// make it easier to display lists in ts
const listToArray = <A>(xs: List<A>): A[] => {
  const loop = (_xs: List<A>) => (z: A[]): A[] => {
    return _xs === null ? z : loop(tail(_xs))([...z, head(_xs)])
  }
  return loop(xs)([])
}

// make it easier to construct lists in ts
const arrayToList = <A>(arr: A[]): List<A> => {
  const loop = (_arr: A[]) => (z: List<A>): List<A> => {
    const len = _arr.length
    return len === 0 ? z : loop(_arr.slice(0, len - 1))(cons(_arr[len - 1])(z))
  }
  return loop(arr)(null)
}

export { push, drop, reverse, init, length, arrayToList, listToArray }
