import { assertEquals } from "../deps.ts"
import { arrayToList, range, listToArray } from "../List/index.ts"

Deno.test({
  name: "list.range",
  fn(): void {
    const xs = range(1)(4)
    assertEquals(xs, arrayToList([1, 2, 3]))
    const xs2 = range(0)(100)
    assertEquals(
      listToArray(xs2),
      new Array(100).fill(0).map((_, i) => i)
    )
  },
})
