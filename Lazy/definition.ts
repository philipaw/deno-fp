export type Lazy<A> = () => A
export const lazy = <A>(a: A): Lazy<A> => () => a
