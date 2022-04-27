type PersonKeys = "name" | "age"
type EmployeeKeys = "name" | "profession"

// Extract
type Common<T, U> = T extends U ? T : never;


type CommonOfPersonAndEmployee = Common<PersonKeys, EmployeeKeys>

// PSEUDO CODE
/*
Common<PersonKeys, EmployeeKeys> = 
Common<"name" | "age", "name" | "profession"> = 
  "name" | "age" extends "name" | "profession" = 

  "name" extends "name" | "profession" ? "name" : never |
  "age"  extends "name" | "profession" ? "age" : never

  "name" | never

  "name"
  */

// Exclude
type Remove<T, U> = T extends U ? never : T;


type RemoveAge = Remove<PersonKeys, "age">
/*
Remove<PersonKeys, "age"> = 
Remove<"name" | "age", "age"> = 
    "name" | "age" extends "age"

    "name" extends "age" ? never : "name" |
    "age" extends "age" ? never : "age"

    "name" | never

    "name"
*/
/*
type RemoveEmployeeKeys = Remove<PersonKeys, EmployeeKeys>

Remove<"name" | "age", "name" | "profession">

    "name" extends "name" | "profession" ? never : "name" |
    "age" extends "name" | "profession" ? never : "age" 

    never | "age"

    "age"
*/

type Circle = { kind: "circle", radius: number }
type Triangle = { kind: "triangle", x: number, y: number }
type Square = { kind: "square", x: number }

type Shape = Circle | Square | Triangle;

type RemoveCircle = Remove<Shape, Circle>

/*

{ kind: "circle" } extends { kind: "circle", radius: number } ? never : { kind: "circle", radius: number } |
{ kind: "triangle"  } extends { kind: "circle", radius: number } ? never : { kind: "triangle", x: number, y: number } |
{ kind: "square" } extends extends { kind: "circle", radius: number } ? never : { kind: "square", x: number } 

*/

type RemoveKind<Group extends { kind: any }, K extends Group["kind"]> = Remove<Group, { kind: K }>

export type GetKind<Group extends { kind: any }, K extends Group["kind"]> = Common<Group, { kind: K }>


type RemovedCircle = RemoveKind<Shape, "triangle">

type GetSquare = GetKind<Shape, "square">
type GetCircle = GetKind<Shape, "circle">

function getArea(shape: Shape) {
    if ("x" in shape) {
        shape
    }
}

import type { COptions } from "./default_options";

function something_with_options(cc: COptions) {

}


export default {}