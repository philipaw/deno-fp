import { assertEquals } from "../../deps.ts"
import { List, cons, foldr, arrayToList } from "../../List/index.ts"

Deno.test({
  name: "list.foldr",
  fn(): void {
    const xs: List<string> = cons("cat")(cons("dog")(cons("bird")(null)))
    const folded = foldr(xs)("")((z) => (x) => z + x + ". ")
    assertEquals(folded, "cat. dog. bird. ")

    const threeFactorial = arrayToList([3, 2, 1])
    const evaluated = foldr(threeFactorial)(1)((z) => (x) => x * z)
    assertEquals(evaluated, 6)
  },
})
