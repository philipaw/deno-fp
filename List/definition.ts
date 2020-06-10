/**
 * Functional lists
 *
 * some rules:
 *  1. all functions may only take 0-1 arguments
 *  2. no loops, only recursion
 *  3. no side-effects
 *  4. function is a single return (i break this rule sometimes)
 *  5. no assignments in functions (also this)
 *  6. no arrays
 *  7. no ifs (also also this)
 *
 * {@link https://calebharris.github.io/fp_book_club_ts/chapter_3.html}
 * {@link ./testing/list.test.ts}
 *
 */

type Nil = null // the empty list, this is just for show

type List<A> = Cons<A> | Nil // a list is either the empty or a cons

// and a cons is a chain of lists
type Cons<A> = {
  head: A
  tail: List<A>
}

// eg: cons(1)(cons(2)(cons(3)(null)))
const cons = <A>(a: A) => (b: List<A>): List<A> => ({
  head: a,
  tail: b,
})

// the error is gross, but its easier this way
const head = <A>(xs: List<A>): A => {
  if (!xs) throw new TypeError("Attempted to get head of an empty list")
  else return xs.head
}

const tail = <A>(xs: List<A>): List<A> => (!xs ? xs : xs.tail)

// takes a list and returns a generator for that list
const consG = function* <A>(toIterate: List<A>) {
  let node = toIterate

  while (node !== null) {
    yield head(node)
    node = tail(node)
  }

  yield null
}

export { Nil, List, Cons, cons, consG, head, tail }
