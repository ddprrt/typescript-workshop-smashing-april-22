type ToyBase = {
    name: string,
    price: number,
    quanity: number,
    minimumAge: number
}

type BoardGame = ToyBase & {
    players: number,
    pieces: undefined,
    kind: "boardgame"
}

interface Puzzle extends ToyBase {
    pieces: number,
    kind: "puzzle"
}

type Doll = ToyBase & {
    material: "plastic" | "plush",
    pieces: undefined
    kind: "doll"
}

type VideoGame = ToyBase & {
    cartridge: boolean,
    system: "NES" | "SNES" | "Master System",
    kind: "videogame",
}

type Bricks = ToyBase & {
    brand: "lego" | "megablocks" | "cobi" | "gobricks"
    kind: "bricks"
}

type Toy = BoardGame | Puzzle | Doll | VideoGame | Bricks;

type ToyKind = Toy["kind"] // Index Access Type

type GroupedToys = {
    [Prop in ToyKind]: Toy[] // Mapped Object Types
}

const puzzle: Puzzle = {
    name: "Dinosaur Puzzle",
    price: 10,
    quanity: 100,
    minimumAge: 8,
    pieces: 80,
    kind: "puzzle"
}

declare function filterByKind(kind: ToyKind): Toy[];

function groupToys(toys: Toy[]): GroupedToys {
    let groups: GroupedToys = {
        boardgame: [],
        doll: [],
        puzzle: [],
        videogame: [],
        bricks: [],
    }

    for(const toy of toys) {
        groups[toy.kind].push(toy)
    }

    return groups
}

filterByKind("boardgame")


declare const toys: Toy[]


function printToy(toy: Toy) {
    toy["kind"] === toy.kind

    for(let prop in toy) {

    }
    switch(toy.kind) {
        case "puzzle":
            // print puzzle info
            break;
        case "boardgame":
            // print boardgame info
            break;
        case "doll":
            // print doll info
            break;
        case "videogame":
            // print video game info
            break;
        default:
            //assertNever(toy);
    }
}


function assertNever(val: never) {
    throw Error("This is a situation that can never happen")
}

type A = { a: string }
type A_2 = { a: number, b: string}

type Union = A | A_2

type Intersection = A & A_2

