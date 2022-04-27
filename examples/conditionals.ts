type Label = {
    label: string
}

type ID<T extends string | number> = {
    id: T
}

type IsString<T> = T extends string ? T : never

type PossibleIDs =  number | string | Label | boolean;

type GenerateID<T extends PossibleIDs> = T extends Label ? ID<string> : 
    T extends number ? ID<number> : 
    T extends boolean ? ID<number> :
    T extends string ? ID<string> : never;


// TODO FIgure out why this needs a cast
function generate_id_with_conditionals<T extends PossibleIDs>(val: T): GenerateID<T> {
    if(typeof val === "number" || typeof val === "string") {
        return {
            id: val
        } as GenerateID<T>
    } else if (typeof val === "boolean") {
        return {
            id: 0
        } as GenerateID<T>
    } else {
        return {
            id: val.label
        } as GenerateID<T>
    }
}


let zzzz = generate_id_with_conditionals("")
let yyyy = generate_id_with_conditionals(32)
let xxxx = generate_id_with_conditionals({ label: "" })


function generate_id(no: number): ID<number>
function generate_id(name: string): ID<string>
function generate_id(label: Label): ID<string>
function generate_id(val: number | string | Label): ID<string> | ID<number> {
    

    if (typeof val === "number") {
        return {
            id: val
        }
    } else if (typeof val === "string") {
        return {
            id: val
        }
    }

    return {
        id: "val"
    }
}

generate_id("")

export default {}