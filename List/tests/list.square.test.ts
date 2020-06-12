import { assertEquals } from "../../deps.ts"
import { arrayToList, range, square } from "../index.ts"

Deno.test({
  name: "list.range",
  fn(): void {
    const xs = range(1)(4)
    assertEquals(square(xs), arrayToList([1, 4, 9]))
  },
})
