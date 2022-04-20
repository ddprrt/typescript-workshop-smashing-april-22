type Dice = 1 | 2 | 3 | 4 | 5 | 6;

function is_valid(input: number): input is Dice {
    return [1, 2, 3, 4, 5, 6].includes(input)
}

function roll_dice(input: number) {
    
    if(is_valid(input)) {
        // this is a valid six side dice
        switch(input) {
            case 1:
                break;
            case 2: 
                break;
            case 3:
                break;
            case 4:
                break;
            case 5: 
                break;
            case 6:
                break;
            default:
                console.log("Oh no! This should NEVER happen");
        }
    }
}

const array = [undefined, 1, undefined, 2, 3, 4, 5];

function filter_undefined(input: (number | undefined)[]): asserts input is number[]  {
    input.filter(e => e !== undefined)
}

filter_undefined(array);

array