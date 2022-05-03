/**
 * Object keys :-(
 */

type Person = {
    name: string,
    age: number
}

/*type ObjectKeys<T> =
    T extends object ? (keyof T)[] :
    T extends number ? [] :
    T extends Array<any> | string ? string[] : never

declare global {
    interface ObjectConstructor {
        keys<T>(o: T): ObjectKeys<T>
    }    
}*/

function hasKey<T>(o: T, key: string | number | symbol): key is keyof T {
    return key in o
}

function printPerson<T extends Person>(p: T) {
    const other: Person = {
        name: "Fritz Furball",
        age: 18
    }
    Object.keys(p).forEach((key) => {
        if(hasKey(p, key) && hasKey(other, key)) {
            console.log(key, other[key], p[key])
        }
    })

    for (let key in p) {
        console.log(key, p[key])
    }
}

const me = {
    name: "Stefan",
    age: 40,
    city: "Linz"
}


printPerson(me)

/**
 * Index access of objects :-(
 */

const me_person: Person = {
    name: "Stefan",
    age: 40,
}

const fritz: Person = {
    name: "Fritz Furball",
    age: 18
}

function update<T extends PersonKeys>(key: T) {
    const val = fritz[key]
    me_person[key] = val
}

type PersonKeys = keyof Person


update("age")
/*
type Switch = {
    address: number,
    on: 0 | 1
}

declare const switcher: Switch;
declare const key: keyof Switch

switcher[key] = 0;
switcher[key] = 1
switcher[key] = 2;*/

/**
 * Array.includes on narrow types :-(
 */

// CRUD API
const actions = ["CREATE", "READ", "UPDATE", "DELETE", 0] as const;

/*
declare global {
    interface Array<T> {
        includes(searchElement: any, fromIndex?: number): searchElement is T
    }
    interface ReadonlyArray<T> {
        includes(searchElement: any, fromIndex?: number): searchElement is T
    }
}*/


function includes<U, T extends U>(coll: ReadonlyArray<T>, el: U): el is T {
    return coll.includes(el as T)
}

/*
function x(a: number): string {
    return a as string
}*/

function execute(action: string | number) {
    
    if (includes(actions, action)) {
        switch(action) {
            case "CREATE": break;
            case "DELETE": break;
            case "READ": break;
            case "UPDATE": break;
            case 0: break;
            default:
                action
        }
        // action == CREATE | READ | UPDATE | DELETE
    }
}

type CheckSubset<T, U extends T> = unknown

type Z = CheckSubset<Person, { name: string, age: number, city: string }>

type Integer<T extends number> = `${T}` extends `${bigint}` ? T : never

type Z1 = Integer<100>
type Z2 = Integer<1000.12>

function accepts_only_integers<T extends number>(int: Integer<T>) {

}

accepts_only_integers(100)

type Length<T extends { length: any }> = T["length"]

type StringLength = Length<string>
type ArrayLength = Length<Array<string>>
type TupleLength = Length<[number, bigint, boolean, string]>

type Chars<T extends string> = T extends `${infer First}${infer Rest}` ?
    [First, ...Chars<Rest>] : []

type CharsOfHello = Chars<"hello">

type StrLength<T extends string> = Chars<T>["length"]

type LenghtOfHello = StrLength<"Hello">

type OnlyAChar<T extends string> = StrLength<T> extends 1 ? T : never;

function addChar<T extends string>(ch: OnlyAChar<T>) {
    throw new CharacterAddError();
}

addChar("a")
addChar("b")
addChar("h")
addChar("e")
addChar("l")
addChar("l")
addChar("o")

export {}


/**
 * Error handling :-(
 */

class CharacterAddError extends Error {

}

try {
    addChar("2")
} catch(e: unknown) {
    if (e instanceof CharacterAddError) {
        
    }
}