import { assertEquals, assertThrows } from "../deps.ts"
import {
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
  name: "cons test",
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
  name: "tail test",
  fn(): void {
    const xs = cons(2)(cons(3)(null))
    assertEquals(tail(xs), { head: 3, tail: null })
    const xs2 = cons(1)(xs)
    assertEquals(tail(xs2), xs)
    // empty case
    assertEquals(tail(null), null)
  },
})

Deno.test({
  name: "arrayToList test",
  fn(): void {
    const arr = [1, 2, 3, 4]
    const xs = arrayToList(arr)
    assertEquals(xs, cons(1)(cons(2)(cons(3)(cons(4)(null)))))

    const arr2: any[] = []
    const nil = arrayToList(arr2)
    assertEquals(nil, null)
  },
})

Deno.test({
  name: "listToArray test",
  fn(): void {
    const xs = cons("cat")(cons("dog")(cons("bird")(null)))
    const arr = listToArray(xs)
    assertEquals(arr, ["cat", "dog", "bird"])

    assertEquals(listToArray(null), [])
  },
})

Deno.test({
  name: "reverse test",
  fn(): void {
    const xs = cons("cat")(cons("dog")(cons("bird")(null)))
    const rev = reverse(xs)
    assertEquals(rev, cons("bird")(cons("dog")(cons("cat")(null))))
    assertEquals(xs, reverse(rev))

    assertEquals(null, reverse(null))
  },
})

Deno.test({
  name: "init test",
  fn(): void {
    const xs = cons("cat")(cons("dog")(cons("bird")(null)))
    const inited = init(xs)

    assertEquals(inited, cons("cat")(cons("dog")(null)))
    assertEquals(init(inited), cons("cat")(null))
    assertEquals(init(init(inited)), null)
    // empty case
    assertEquals(init(null), null)
  },
})

Deno.test({
  name: "foldr test",
  fn(): void {
    const xs = cons("cat")(cons("dog")(cons("bird")(null)))
    const folded = foldr(xs)("")((x) => (z) => z + x + ". ")
    assertEquals(folded, "cat. dog. bird. ")

    const threeFactorial = arrayToList([3, 2, 1])
    const evaluated = foldr(threeFactorial)(1)((x) => (z) => x * z)
    assertEquals(evaluated, 6)
  },
})

Deno.test({
  name: "push test",
  fn(): void {
    const xs1 = push<string>(null)("bird")
    assertEquals(xs1, { head: "bird", tail: null })

    const xs2 = push(xs1)("dog")
    assertEquals(xs2, { head: "dog", tail: xs1 })

    const xs3 = push(xs2)("cat")
    const expect = cons("cat")(cons("dog")(cons("bird")(null)))
    assertEquals(xs3, expect)
  },
})

Deno.test({
  name: "drop test",
  fn(): void {
    assertEquals(drop(null)(1n), null)

    const xs = cons("cat")(cons("dog")(cons("bird")(null)))
    assertEquals(drop(xs)(1n), arrayToList(["dog", "bird"]))
    assertEquals(drop(xs)(2n), arrayToList(["bird"]))
    assertEquals(drop(xs)(3n), arrayToList([]))
  },
})
