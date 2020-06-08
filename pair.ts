type Pair<A> = { first: A; second: A }

const pair = <A>(a: A) => (b: A): Pair<A> => ({
  first: a,
  second: b,
})

const fst = <A>(p: Pair<A>): A => p.first
const snd = <A>(p: Pair<A>): A => p.second

export { Pair, pair, fst, snd }
