// null is an empty list in this case
type List<A> = Cons<A> | null

type Cons<A> = {
  head: A
  tail: List<A>
}
const cons = <A>(a: A) => (b: List<A>): List<A> => ({
  head: a,
  tail: b,
})
const head = <A>(xs: List<A>): A => {
  if (!xs) throw new Error("Attempted to get head of an empty list")
  else return xs.head
}
const tail = <A>(xs: List<A>): List<A> => {
  if (!xs) throw new Error("Attempted to get tail of an empty list")
  else return xs.tail
}

// return a new list with head, e
const push = <A>(xs: List<A>) => (e: A) => cons(e)(xs)

// return a new list without the first n elements
const drop = <A>(xs: List<A>) => (n: BigInt): List<A> =>
  n <= 0n ? xs : drop(tail(xs))(BigInt(n) - 1n)

// return a new list with elements in reverse order
const reverse = <A>(xs: List<A>) => {
  const loop = (_xs: List<A>) => (accum: List<A>): List<A> => {
    const [h, t] = [head(xs), tail(xs)]
    return tail === null ? accum : loop(t)(cons(h)(accum))
  }
  return loop(xs)(null)
}

// return a list with all but the last element
const init = <A>(xs: List<A>): List<A> => {
  const [h, t] = [head(xs), tail(xs)]
  return t === null ? null : cons(h)(init(t))
}

// take a list, a start value, and a function. Return a new value
const foldr = <A>(xs: List<A>) => <B>(z: B) => (
  f: (elem: A) => (acc: B) => B
): B => {
  const [h, t] = [head(xs), tail(xs)]
  return t === null ? z : foldr(t)(f(h)(z))(f)
}

// return the length of a list
const length = <A>(xs: List<A>): number => foldr(xs)(0)((_) => (z) => z + 1)

// make it easier to display lists in ts
const listToArray = <A>(xs: List<A>): A[] => {
  const loop = (_xs: List<A>) => (accum: A[]): A[] => {
    const [h, t] = [head(_xs), tail(_xs)]
    return t === null ? accum : loop(t)([h, ...accum])
  }
  return loop(xs)([])
}

// make it easier to construct lists in ts
const arrayToList = <A>(arr: A[]): List<A> => {
  const loop = (_arr: A[]) => (accum: List<A>): List<A> => {
    return _arr.length === 0
      ? accum
      : loop(_arr.slice(1, _arr.length))(cons(_arr[0])(accum))
  }
  return loop(arr)(cons(arr[0])(null))
}

export {
  Cons,
  List,
  cons,
  head,
  tail,
  push,
  drop,
  reverse,
  init,
  foldr,
  length,
  arrayToList,
  listToArray,
}
