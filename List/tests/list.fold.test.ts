import { assertEquals } from "../../deps.ts"
import {
  List,
  cons,
  foldr,
  foldl,
  foldl_UNSAFE,
  arrayToList,
} from "../index.ts"

Deno.test({
  name: "list.foldr",
  fn(): void {
    const xs: List<string> = cons("cat")(cons("dog")(cons("bird")(null)))
    const folded = foldr(xs)("")((z) => (x) => x + ". " + z)
    assertEquals(folded, "cat. dog. bird. ")

    const threeDescending = arrayToList([3, 2, 1])
    const evaluated = foldr(threeDescending)(0)((z) => (x) => x - z)
    assertEquals(evaluated, 2)
  },
})

Deno.test({
  name: "list.foldl",
  fn(): void {
    const xs: List<string> = cons("cat")(cons("dog")(cons("bird")(null)))
    const folded = foldl(xs)("")((z) => (x) => x + ". " + z)
    assertEquals(folded, "bird. dog. cat. ")

    const threeDescending = arrayToList([1, 2, 3])
    const evaluated = foldl(threeDescending)(0)((z) => (x) => z - x)
    assertEquals(evaluated, -6)
  },
})

Deno.test({
  name: "list.foldl_UNSAFE",
  fn(): void {
    const xs: List<string> = cons("cat")(cons("dog")(cons("bird")(null)))
    const folded = foldl_UNSAFE(xs)("")((z) => (x) => x + ". " + z)
    assertEquals(folded, "bird. dog. cat. ")

    const threeDescending = arrayToList([1, 2, 3])
    const evaluated = foldl_UNSAFE(threeDescending)(0)((z) => (x) => z - x)
    assertEquals(evaluated, -6)
  },
})
