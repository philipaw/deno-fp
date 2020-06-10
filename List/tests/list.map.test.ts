import { assertEquals } from "../../deps.ts"
import { List, map, arrayToList } from "../index.ts"

Deno.test({
  name: "list.map",
  fn(): void {
    const xs: List<string> = arrayToList(["cat", "dog", "bird"])
    const mapped = map(xs)((s) => s.toUpperCase())
    assertEquals(mapped, arrayToList(["CAT", "DOG", "BIRD"]))
  },
})
