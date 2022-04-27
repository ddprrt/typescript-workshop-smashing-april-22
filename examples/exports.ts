export interface IPerson {
    name: string,
    age: number
}

export function print_person(p: IPerson) {
    console.log(p.name);
}