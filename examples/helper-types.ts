type Person = {
    name: string,
    age: number
}

const a_record: Record<string, string> = {}

const another_record: Record<"name" | "age", number | string> = {
    name: "Stefan",
    age: 42
}

type Optional<T> = {
   [K in keyof T]?: T[K]
}

type OptionalPerson = Optional<Person>

type Address = {
    street: string,
    number: number,
    city: string,
    postalcode: number
}

type OptionalAddress = Optional<Address>

type PersonAgain = Required<OptionalPerson>

type ReadonlyPerson = Readonly<Person>

type Writable<T> = {
    -readonly [K in keyof T]: T[K]
}

type WriteablePersonAgain = Writable<ReadonlyPerson>

// Optional === Partial

const interestingKeys = ["street", "number"] as const;

type InterestingKeys = (typeof interestingKeys)[number]

type InterestingAddress = {
    [K in InterestingKeys]: Address[K]
}

type Select<Obj, Keys extends keyof Obj> = {
    [K in Keys]: Obj[K]
}

type ZZ = Address[keyof Address]

type InterestingAddressWithSelect = Select<Address, "city"| "postalcode">
type InterestingAddressWithPick = Pick<Address, "city"| "postalcode">

type FormatURLs = {
    format360p: URL,
    format480p: URL,
    format720p: URL,
    format1080p: URL,
    format4k: URL,
    format120p: URL,
    formatVR: [URL, URL]
}

function loadSubset(urls: Split<FormatURLs>) {

}

loadSubset({
    format1080p: new URL("..."),
    format4k: new URL("..."),
    format120p: new URL("..."),
    formatVR: [new URL("..."), new URL("...")]
})


type Split<T> = {
    [K in keyof T]: {
        [P in K]: T[P]
    }
}[keyof T]

type SplitPersonality = Split<Person>



type AtLeastOneFormat = {
    format360p: URL 
} | {
    format480p: URL 
} | {
    format720p: URL 
} | {
    format1080p: URL 
} | {
    format4k: URL 
} | {
    format120p: URL
}

type F1080p = {
    format1080p: URL 
}

let my_format: F1080p;

let other_format = {
    format1080p: new URL("..."),
    format4k: new URL("..."),
    format120p: new URL("..."),
};

my_format = other_format

function do_something_with_f1080(inp: F1080p) {
    inp.format1080p
}

do_something_with_f1080(other_format)

export default {}