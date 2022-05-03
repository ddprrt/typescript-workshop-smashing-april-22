type PathKeys<T> =
    object extends T 
    ? string 
    : T extends readonly any[] 
      ? Extract<keyof T, `${number}`> | SubKeys<T, Extract<keyof T, `${number}`>>
      : T extends object 
        ? Extract<keyof T, string> | SubKeys<T, Extract<keyof T, string>>
        : never;

type SubKeys<T, K extends string> = K extends keyof T ? `${K}.${PathKeys<T[K]>}` : never;

type PropType<T, Path extends string> =
    Path extends keyof T 
    ? T[Path] 
    : Path extends `${infer K}.${infer R}` 
      ? K extends keyof T 
        ? PropType<T[K], R> 
        : unknown 
      : unknown;

declare function getProp<T, P extends PathKeys<T>>(obj: T, path: P): PropType<T, P>;

const obj = {
    name: 'John',
    age: 42,
    cars: [
        { make: 'Ford', age: 10 },
        { make: 'Trabant', age: 35 }
    ]
} as const;

const make = getProp(obj, "cars.0.make")

export {}