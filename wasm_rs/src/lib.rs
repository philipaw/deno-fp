#[no_mangle]
pub extern "C" fn square(x: u32) -> u32 {
    x * x
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
