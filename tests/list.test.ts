import { assertEquals, assertThrows } from "../deps.ts"
import {
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
} from "../list.ts"

Deno.test({
  name: "Cons test",
  fn(): void {
    const xs = null
    assertEquals(xs, null)
    const xs2 = cons("dog")(xs)
    assertEquals(xs2, { head: "dog", tail: null })
    const xs3 = cons("cat")(xs2)
    assertEquals(xs3, { head: "cat", tail: { head: "dog", tail: null } })
  },
})

Deno.test({
  name: "head test",
  fn(): void {
    const xs = cons(2)(cons(3)(null))
    assertEquals(head(xs), 2)
    const xs2 = cons(1)(xs)
    assertEquals(head(xs2), 1)
    // TODO: fixme
    assertThrows(
      head(null),
      TypeError,
      "Attempted to get head of an empty list"
    )
  },
})
