#[no_mangle]
pub extern "C" fn square(x: u32) -> u32 {
    x * x
}

// looks like you must specify for each transformation type, as wasm has no suppot for generics
// #[no_mangle]
// pub extern "C" fn fold_rs<T, B, F>(xs: &[T], init: B, f: F) -> B
// where
//     F: FnMut(B, &T) -> B,
// {
//     xs.into_iter().fold(init, f)
// }

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
