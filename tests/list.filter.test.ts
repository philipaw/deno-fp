import { assertEquals } from "../deps.ts"
import { arrayToList, filter, range } from "../List/index.ts"

Deno.test({
  name: "list.filter",
  fn(): void {
    const xs = range(1)(7)
    const filtered = filter(xs)((x) => x % 2 === 0)
    assertEquals(filtered, arrayToList([2, 4, 6]))
  },
})
