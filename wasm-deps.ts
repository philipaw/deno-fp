const wasmCode = await Deno.readFile(
  "./target/wasm32-uknown-unkown/debug/wasm_rs.wasm"
)
const wasmModule = new WebAssembly.Module(wasmCode)
const wasmInstance = new WebAssembly.Instance(wasmModule)

export const { square } = wasmInstance.exports
