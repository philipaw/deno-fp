import { assertEquals, assertThrows } from "../../deps.ts"
import { arrayToList, List, cons, consG, head, tail } from "../index.ts"

Deno.test({
  name: "list.cons",
  fn(): void {
    const xs: List<string> = null
    assertEquals(xs, null)
    const xs2 = cons("dog")(xs)
    assertEquals(xs2, { head: "dog", tail: null })
    const xs3 = cons("cat")(xs2)
    assertEquals(xs3, { head: "cat", tail: { head: "dog", tail: null } })
  },
})

Deno.test({
  name: "list.head",
  fn(): void {
    const xs: List<number> = cons(2)(cons(3)(null))
    assertEquals(head(xs), 2)
    const xs2 = cons(1)(xs)
    assertEquals(head(xs2), 1)
    // error case
    assertThrows(
      (): void => {
        head(null)
      },
      TypeError,
      "Attempted to get head of an empty list"
    )
  },
})

Deno.test({
  name: "list.tail",
  fn(): void {
    const xs: List<number> = cons(2)(cons(3)(null))
    assertEquals(tail(xs), { head: 3, tail: null })
    const xs2 = cons(1)(xs)
    assertEquals(tail(xs2), xs)
    // empty case
    assertEquals(tail(null), null)
  },
})

Deno.test({
  name: "list.consG",
  fn(): void {
    const ar = [1, 2, 3]
    const xs: List<number> = arrayToList(ar)
    const xs_g = consG(xs)
    let i = 1
    for (let x in xs_g) {
      assertEquals(x, i)
      i += 1
    }
  },
})
