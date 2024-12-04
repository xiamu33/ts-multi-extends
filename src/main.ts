export function multiExtends<
  B extends Constructor<any>,
  E extends ConstructorExtFn<Constructor<any>>
>(
  extendsBase: B,
  extendsFunctions: E[]
): B & UnionToIntersection<ReturnType<E>> {
  let func: ConstructorExtFn<Constructor<any>>;
  let ans: Constructor<any> = extendsBase;
  while (extendsFunctions.length) {
    func = extendsFunctions.shift()!;
    ans = func(ans);
  }
  return ans as any;
}

type Constructor<T = unknown> = new (...args: any[]) => T;
type ConstructorExtFn<T extends Constructor> = (Cls: T) => T;

type UnionToIntersection<T> = UnionToFunction<T> extends (arg: infer P) => any
  ? P
  : never;
type UnionToFunction<T> = T extends any ? (arg: T) => any : never;
