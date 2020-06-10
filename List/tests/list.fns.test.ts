import { assertEquals } from "../../deps.ts"
import {
  List,
  cons,
  push,
  drop,
  reverse,
  init,
  length,
  arrayToList,
  listToArray,
} from "../../List/index.ts"

Deno.test({
  name: "list.arrayToList",
  fn(): void {
    const arr = [1, 2, 3, 4]
    const xs: List<number> = arrayToList(arr)
    assertEquals(xs, cons(1)(cons(2)(cons(3)(cons(4)(null)))))

    const arr2: any[] = []
    const nil = arrayToList(arr2)
    assertEquals(nil, null)
  },
})

Deno.test({
  name: "list.listToArray",
  fn(): void {
    const xs: List<string> = cons("cat")(cons("dog")(cons("bird")(null)))
    const arr = listToArray(xs)
    assertEquals(arr, ["cat", "dog", "bird"])

    assertEquals(listToArray(null), [])
  },
})

Deno.test({
  name: "list.push",
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
  name: "list.drop",
  fn(): void {
    assertEquals(drop(null)(1n), null)

    const xs: List<string> = cons("cat")(cons("dog")(cons("bird")(null)))
    assertEquals(drop(xs)(1n), arrayToList(["dog", "bird"]))
    assertEquals(drop(xs)(2n), arrayToList(["bird"]))
    assertEquals(drop(xs)(3n), arrayToList([]))
  },
})

Deno.test({
  name: "list.reverse",
  fn(): void {
    const xs: List<string> = cons("cat")(cons("dog")(cons("bird")(null)))
    const rev = reverse(xs)
    assertEquals(rev, cons("bird")(cons("dog")(cons("cat")(null))))
    assertEquals(xs, reverse(rev))

    assertEquals(null, reverse(null))
  },
})

Deno.test({
  name: "list.init",
  fn(): void {
    const xs: List<string> = cons("cat")(cons("dog")(cons("bird")(null)))
    const inited = init(xs)

    assertEquals(inited, cons("cat")(cons("dog")(null)))
    assertEquals(init(inited), cons("cat")(null))
    assertEquals(init(init(inited)), null)
    // empty case
    assertEquals(init(null), null)
  },
})

Deno.test({
  name: "list.length",
  fn(): void {
    const xs: List<number> = arrayToList([1, 2, 3, 4])
    assertEquals(length(xs), 4)
    assertEquals(length(drop(xs)(3n)), 1)
    // empty case
    assertEquals(length(null), 0)
  },
})
