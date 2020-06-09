import { assertEquals } from "../deps.ts"

Deno.test({
  name: "testing example",
  fn(): void {
    assertEquals("world", "world")
    assertEquals({ hello: "world" }, { hello: "world" })
  },
})
