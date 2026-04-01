/**
 * Composes functions right-to-left.
 *
 * @example
 * ```ts
 * const transform = compose(trim, toLowerCase);
 * transform('  HELLO  '); // 'hello'
 * ```
 *
 * @param fns - Functions to compose, applied right-to-left
 * @returns A new function that pipes its argument through each function from right to left
 */
export function compose<A, B, C>(f: (b: B) => C, g: (a: A) => B): (a: A) => C;
export function compose<A, B, C, D>(
  f: (c: C) => D,
  g: (b: B) => C,
  h: (a: A) => B,
): (a: A) => D;
export function compose<A, B, C, D, E>(
  f: (d: D) => E,
  g: (c: C) => D,
  h: (b: B) => C,
  i: (a: A) => B,
): (a: A) => E;
export function compose(
  ...fns: ReadonlyArray<(arg: unknown) => unknown>
): (arg: unknown) => unknown {
  return (arg) => fns.reduceRight((acc, fn) => fn(acc), arg);
}
