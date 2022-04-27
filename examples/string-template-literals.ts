function say_hi(name: string) {
    return `Hi ${name}`
}


type GrabEventName<T> = T extends `on${infer R}` ? Uncapitalize<R> : never

type GrabReturnValue<T extends Function> = T extends (...args: any[]) => infer R ? R : never;

type MustBeNumber = GrabReturnValue<() => number>

type ReturnValueBindEvent = GrabReturnValue<typeof bindEvent>

type ZZ = GrabEventName<"onClick">


type GrabActualType<T> = T extends Promise<infer R> ? R : T;

type X = GrabActualType<number>
type Y = GrabActualType<Promise<string[]>>


// Let me look that up
type EventName<T extends string> = T extends `on${infer R}` ? 
    R extends Capitalize<R> ? T : never : never;

type Z = Capitalize<"stefan">
type Event = EventName<"onClick">

function bindEvent<T extends string>(eventName: EventName<T>, fn: Function) {

}

function defineEvent(event: string) {

}

bindEvent("onClick", () => {})
// bindEvent("meh", () => {})

defineEvent("Smashing") // onSmashing
// bindEvent("onsmashing", () => {})

bindEvent("onKeydown", () => {})

type SingleWhiteSpace = `${string} ${string}`;

const z: SingleWhiteSpace = " ";
const y: SingleWhiteSpace = "a whitespace"
const x: SingleWhiteSpace = "whitespaceattheend "
const u: SingleWhiteSpace = " beginwithawhitesepace"

type NoWhiteSpace<T extends string> = T extends `${string} ${string}` ? never : T;

type HeaderWhichIsOk = NoWhiteSpace<"X-Smashing-Magazine">
type ARealHeader = NoWhiteSpace<"Cookie">
type HeaderWhichIsntOK = NoWhiteSpace<"O h nooooo">

function addHeader<T extends string>(header: NoWhiteSpace<T>) {}

addHeader("X-Smashing-Magazine")
addHeader("Cookie")
// addHeader("oh nooo")

declare function get(path: string, callback: Function): void;

export {}

