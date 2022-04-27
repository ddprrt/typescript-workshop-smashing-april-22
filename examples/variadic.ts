type ThisIsATuple = [number, string];

const me: ThisIsATuple = [40, "Stefan"]

type StartsWithStringAndEndsWithString<T extends unknown[]> = [string, ...T, string]

const z = [1, 2, ...[3, 4]] as const

type T1 = StartsWithStringAndEndsWithString<[boolean]>
type T2 = StartsWithStringAndEndsWithString<[number, boolean, number]>

type GenericTuple<T> = [string, T, string]

declare function h(...r: [a: string, b: string, c: string]): void

type Arguments<T extends unknown[]> = [...T, (...args: any[]) => any]

type StartsWithStringAndHasCallback = Arguments<[string, string]>

const fn: StartsWithStringAndHasCallback = ["Stefan", "", () => {}];

function starts_with_string_and_has_callback<T extends Arguments<[string, string]>>(...args: T) {

}

starts_with_string_and_has_callback("Stefan", "", () => {

})

function collect<T extends string, U extends unknown[]>(name: T, ...args: U): { [P in T]: U }  {
    return { [name]: args } as  { [P in T]: U } 
}

collect("numbers", 1, 2, 3, 4, 5) // { numbers: number[] }
collect("objects", {}, { name: "Stefan"}).objects[1].name

function concat<T extends readonly unknown[], U extends readonly unknown[]>(arr1: T, arr2: U): [...T, ...U] {
    return [...arr1, ...arr2];
}

const a = concat([1, 2, 3], [4, 5, 6])
const b = concat(["a", "b"], [1, 2, 3])


declare function load(
    file: string,
    encoding: string,
    callback: (fileContents: string) => void
): void

load("./my-scripts.ts", "UTF-8", (res) => {
    console.log(res)
})

declare function del(
    file: string,
    callback: (deletionSuccessful: boolean) => void
): void

//const promisifedLoad = promisify(load);

type InferArguments<T> = 
    T extends (...t: [...infer Arg, (...args: any) => any]) => any ? 
    Arg : never;

type Original = (file: string, encoding: string, num: number) => void
// Step 1: Make a tuple 
type Step1 = (...args: [file: string, encoding: string, num: number]) => void
// Step 2: Make parts that you don't know yet, variadic
type Step2<V extends unknown[]> = (...args: [...args: V, num: number]) => void


type X = Step2<[string, string]>
type Y = Step2<[number, number, boolean]>
type Z = Step2<[]>

type LoadIsValid = LoadFn extends Step2<[string, string]> ? true : false;

// Step 3: Type, that can grab V
type Step3<T> = T extends Step2<infer Args> ? Args : never;

type OK = Step1 extends Step2<[string, string]> ? true: false;

type LoadFn = (...args: [file: string, encoding: string, num: number]) => void

type ArgumentsOfLoadFunction = Step3<LoadFn>


type InferCallbackResults<T> = 
    T extends (...t: [...infer Arg, (argument_one_of_the_callback: infer Res) => any]) => any ?
    Res : never;

type RealLoadFn = typeof load;

type LoadArgs = InferArguments<RealLoadFn>
type DeleteArgs = InferArguments<typeof del>

type LoadResult = InferCallbackResults<RealLoadFn>
type DelResult = InferCallbackResults<typeof del>

function promisify<Fun extends (...args: any[]) => any>(f: Fun) : 
    (...args: InferArguments<Fun>) => Promise<InferCallbackResults<Fun>> {
    return function(...args: InferArguments<Fun>) {
        return new Promise((resolve) => {
            function callback(result: InferCallbackResults<Fun>) {
                resolve(result)
            }
            args.push(callback);
            f.call(null, ...args)
        })
    }
}

const promisifedLoad = promisify(load);

promisifedLoad("./my-file.ts", "UTF-8").then(res => {

})

const promisifiedDel = promisify(del);

promisifiedDel("./my-file.ts").then(res => {

})

function do_something_with_lots_of_args(
    x: number, y: boolean, z: object, a: number, b: number, cb: (res: { name: string }) => void
): void {

}

let promisified_mess = promisify(do_something_with_lots_of_args);
promisified_mess(1, true, {}, 2, 3).then(res => {
    res.name
})

export {}