/**
 * Functional lists
 *
 * some rules:
 *  1. all functions may only take 0-1 arguments
 *  2. no loops, only recursion
 *  3. no side-effects
 *  4. function is a single return (i break this rule sometimes)
 *  5. no assignments in functions
 *  6. no arrays
 *  7. no ifs
 *
 * {@link https://calebharris.github.io/fp_book_club_ts/chapter_3.html}
 * {@link ./testing/list.test.ts}
 *
 */

type Nil = null // the empty list
type List<A> = Cons<A> | Nil // a list is either the empty or a cons
type Cons<A> = {
  // and a cons is a chain of lists
  head: A
  tail: List<A>
}

const cons = <A>(a: A) => (b: List<A>): List<A> => ({
  head: a,
  tail: b,
})
// honestly the errors feel icky
const head = <A>(xs: List<A>): A => {
  if (!xs) throw new TypeError("Attempted to get head of an empty list")
  else return xs.head
}
const tail = <A>(xs: List<A>): List<A> => (!xs ? xs : xs.tail)

// return a new list with head, e
const push = <A>(xs: List<A>) => (e: A) => cons(e)(xs)

// return a new list without the first n elements
const drop = <A>(xs: List<A>) => (n: BigInt): List<A> =>
  !xs ? null : n <= 0n ? xs : drop(tail(xs))(BigInt(n) - 1n)

// return a new list with elements in reverse order
const reverse = <A>(xs: List<A>) => {
  const loop = (_xs: List<A>) => (accum: List<A>): List<A> =>
    _xs === null ? accum : loop(tail(_xs))(cons(head(_xs))(accum))
  return loop(xs)(null)
}

// return a list with all but the last element
const init = <A>(xs: List<A>): List<A> =>
  !xs ? xs : tail(xs) === null ? null : cons(head(xs))(init(tail(xs)))

// take a list, a start value, and a function. Return a new value
const foldr = <A>(xs: List<A>) => <B>(z: B) => (
  f: (x: A) => (acc: B) => B
): B => (xs === null ? z : foldr(tail(xs))(f(head(xs))(z))(f))

// return the length of a list
const length = <A>(xs: List<A>): number => foldr(xs)(0)((_) => (z) => z + 1)

// make it easier to display lists in ts
const listToArray = <A>(xs: List<A>): A[] => {
  const loop = (_xs: List<A>) => (accum: A[]): A[] => {
    return _xs === null ? accum : loop(tail(_xs))([...accum, head(_xs)])
  }
  return loop(xs)([])
}

// make it easier to construct lists in ts
const arrayToList = <A>(arr: A[]): List<A> => {
  const loop = (_arr: A[]) => (accum: List<A>): List<A> => {
    const len = _arr.length
    return len === 0
      ? accum
      : loop(_arr.slice(0, len - 1))(cons(_arr[len - 1])(accum))
  }
  return loop(arr)(null)
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
