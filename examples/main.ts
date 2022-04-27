import type { IPerson } from "./exports";
import { print_person } from "./exports";

const z: IPerson = {
    name: "Stefan",
    age: 40
}

print_person(z);