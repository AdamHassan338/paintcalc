import prompt from 'prompt-sync';

type Wall = {
    width?: number;
    height?: number;
    area?: number;
    colour?: string;
    excludeWidth?: number;
    excludeHeight?: number;
    excludeArea?: number;
}

type Shape = "quad" | "circle"

class Brand {
    name: string;
    prices: number[];
    colours: Array<[key: string, value: number]> = [
        ["PEACH", 0],
        ["CREAM", 0],
        ["CLAY", 0],
        ["WHITE", 0],
        ["INDIGO", 0],
        ["OLIVE", 0],
        ["SAGE", 0]
    ];

    constructor(name: string, prices: number[]) {
        this.name = name;
        this.prices = prices;
    }

}

let dulux: Brand = new Brand("Dulux", [3.00, 3.70, 5.30, 6.00]);
let goodHome: Brand = new Brand("GoodHome", [2.80, 3.30, 5.00, 5.70]);
let sandtex: Brand = new Brand("Sandtex", [3.20, 3.40, 5.20, 5.10]);


function printPrice(brand: Brand) {
    console.log(brand.name);

    console.log(`10L £${brand.prices[0] * 10}`);
    console.log(`5L £${brand.prices[1] * 5}`);
    console.log(`2.5L £${brand.prices[2] * 2.5}`);
    console.log(`1L £${brand.prices[3]}\n`);
}



const syncPrompt = prompt();

const litersPerMetet2 = 0.1;


let colours: Array<[key: string, value: number]> = [
    ["PEACH", 0],
    ["CREAM", 0],
    ["CLAY", 0],
    ["WHITE", 0],
    ["INDIGO", 0],
    ["OLIVE", 0],
    ["SAGE", 0]
];

let walls: Array<Wall> = [];


function isValidColour(colour: string): boolean {

    for (let i = 0; i < colours.length; i++) {
        if (colours[i][0] === colour)
            return true;
    }
    console.log(colour);
    return false;
}

let totalPaint = 0;


function calculatePaintForWall(area: number) : number {

    return area * litersPerMetet2;

}

function area(width: number, height: number): number {
    return width * height;
}

function getNumber(promptMessage: string): number {
    let isValid = false;
    let number;

    while (true) {

        const input: string = syncPrompt(promptMessage);
        number = parseInt(input, 10);

        if (!isNaN(number)) {
            if (number > 0)
                return number;
            else
                console.log('please Enter a number larger than 0.');
        } else {
            console.log('please Enter a number.');
        }
    }


    return -1;
}

function getBool(promptMessage: string): boolean {
    let isValid = false;

    while (true) {
        const input: string = syncPrompt(promptMessage).toUpperCase();
        if (input === "YES")
            return true;
        if (input === "NO")
            return false;
        console.log("Please enter a Yes or No. ");
    }

    return false;
}

function getColour(promptMessage: string): string {

    /* TO DO */
    /* print the colour options */
    while (true) {
        const input: string = syncPrompt(promptMessage).toUpperCase();
        if (isValidColour(input))
            return input;
        console.log("please enter a valid colour");
    }
    return "";
}

function getBrand(promptMessage: string): Brand {
    while (true) {
        const input: string = syncPrompt(promptMessage).toLowerCase();
        switch (input) {
            case "dulux":
                return dulux;
                break;
            case "goodhome":
                return goodHome;
                break;
            case "sandtex":
                return sandtex;
                break;
            default:
                console.log("Sorry, Enter a Brand we sell: Dulux, Goodhome, Sandtex");
        }
    }
}

function getShape(promptMessage: string): Shape {
    while (true) {
        const input: string = syncPrompt(promptMessage).toLowerCase();
        switch (input) {
            case "quad" :
                return "quad";
                break;
            case "circle":
                return "circle";
                break;
            default:
                console.log("Sorry, supported shapes are quad or circle choose one of these that best fits. ");
        }
    }
}

function getShapeArea(shape : Shape) : number {

    switch(shape){
        case "quad":
            let width : number = getNumber("What is the width?" );
            let height : number = getNumber("What is the height? ");
            return area(width,height);
            break;
        case "circle":
            let radius : number = getNumber("What is the radius? ");
            return Math.PI * Math.pow(radius,2);
            break
        default:
            console.log(`IN VALID SHAPE IN "getShapeArea(shape : Shape) : number" function call`);
            return -1;
            break;
    }
    return -1;
}

function calculateCost(brand : Brand){
    console.log("You will need to buy: ")
    let total : number = 0;
    for(let i : number = 0; i<brand.colours.length; i++){
        if(brand.colours[i][1]<=0)
            continue;

        let ten : number = 0;
        let five : number = 0;
        let two : number = 0;
        let one : number = 0;
        let cost : string = "";

        let remainder = brand.colours[i][1];

        ten = Math.floor(remainder/10);
        remainder-= 10*ten;

        five = Math.floor(remainder/5);
        remainder -= 5*five;

        two = Math.floor(remainder/2.5);
        remainder  -= 2.5*two;
        
        one = Math.ceil(remainder);
        console.log(`${brand.name} ${brand.colours[i][0]} ${brand.colours[i][1]}Liters `)

        
        if(ten>0){
            cost = (Math.round(ten * 10 * brand.prices[0] * 100) / 100).toFixed(2);
            console.log(`- ${ten} x 10L Tins = £${cost}`);
        }
        if(five>0){
            cost = (Math.round(five * 5 * brand.prices[1] * 100) / 100).toFixed(2);
            console.log(`- ${five} x 5L Tins = £${cost}`);
            }
        if(two>0){
            cost = (Math.round(two * 2.5 * brand.prices[2] * 100) / 100).toFixed(2);
            console.log(`- ${two} x 2.5L Tins = £${cost}`);
        }
        if(one>0){
            cost = (Math.round(one * 1 * brand.prices[3] * 100) / 100).toFixed(2);
            console.log(`- ${one} x 1L Tins = £${cost}`);
        }

        total += ten * 10 * brand.prices[0];
        total += five * 5 * brand.prices[1];
        total += two * 2.5 * brand.prices[2];
        total += one * 1 * brand.prices[3];

        

    }

    console.log(`Total: £${(Math.round(total * 100) / 100).toFixed(2)}`)
}



//get number of rooms
//get number of walls
//get size of wall
//get exclude area
//ask how manny doors are in this room
    //how manny windows are in this room
    //are all windows the same size
    //are all windows the same shape
    //ask how manny doors are in 
function run() {

    printPrice(dulux);
    printPrice(goodHome);
    printPrice(sandtex);

    let brand: Brand = getBrand(`What brand of paint do you want to buy: Dulux, GoodHome, Sandtex? `);
    let rooms: number = getNumber('How manny rooms will you paint? ');

    for (let i = 0; i < rooms; i++) {
        let numWalls: number = getNumber(`How manny walls will you paint in room ${i + 1} `);
        let sameColour: boolean = getBool(`Will you paint all walls in room ${i + 1} the same colour? [YES,NO] `);
        let colour: string = "";
        let colourindex: number = -1;

        let areDoors, areWindows : boolean;

        areDoors = getBool(`Are there any doors in room ${i+1}? [YES,NO] `);
        areWindows = getBool(`Are there any windows in room ${i+1}? [YES,NO] `);

        if (sameColour) {
            colour = getColour(`What colour will you paint this room? `);
            colourindex = brand.colours.findIndex(([k, _]) => k === colour);
        }

        for (let j = 0; j < numWalls; j++) {
            let wall: Wall = {}
            wall.width = getNumber(`what is the width of wall ${j + 1} `);
            wall.height = getNumber(`what is the height of wall ${j + 1} `);
            wall.excludeArea = 0;

            if (!sameColour) {
                colour = getColour("What colour will you paint this wall? ")
                colourindex = brand.colours.findIndex(([k, _]) => k === colour);

            }
            wall.colour = colour;
            brand.colours[colourindex][1] += area(wall.width, wall.height);

            totalPaint += calculatePaintForWall(wall.width * wall.height);

            if(areDoors){
                let isDoor: boolean = getBool(`Are there any doors on wall ${j+1}? [YES,NO] `);
                if(!isDoor)
                    break;
                let numDoors : number = getNumber(`How manny doors are on wall ${j+1}? (count double doors as 2) `);
                brand.colours[colourindex][1] -= area(2*numDoors, 0.9*numDoors);
                totalPaint-= calculatePaintForWall(2*numDoors * 0.9*numDoors);
            }

            if(areWindows){
                let isWindow: boolean = getBool(`Are there any windows on wall ${j+1}? [YES,NO] `);
                let sameShape : boolean;
                let shape : Shape = "quad";
                if(!isWindow)
                    break;
                let numWindows : number = getNumber(`How manny windows on wall ${j+1}?`);
                if(numWindows==1){
                    sameShape = true;
                }
                else
                    sameShape = getBool(`Are all windows on this wall the same shape? [YES,NO] `);
                if(sameShape)
                    shape = getShape("What is the shape? [QUAD,CIRCLE] ")
                for(let k : number = 0 ; k<numWindows ; k++){
                    if(!sameShape)
                        shape = getShape(`What is the shape of window ${k+1}? [QUAD,CIRCLE] `);
                    console.log(`Dimentions of window ${k+1}: `);
                    let windowArea = getShapeArea(shape);
                    brand.colours[colourindex][1] -= windowArea;
                    totalPaint-= calculatePaintForWall(windowArea);
                }

            }


            let toExclude: boolean = getBool("Are the any areas you wish to exclude on this wall other than doors and windows? [YES,NO] ");

            if (toExclude) {
                let end: boolean = false;
                let count: number = 1;
                while (!end) {
                    let width: number = getNumber(`What is the WIDTH of area ${count} to exclude?`);
                    let height: number = getNumber(`What is the HEIGHT of area ${count} to exclude?`);
                    wall.excludeArea += area(width, height);
                    brand.colours[colourindex][1] -= area(width, height);
                    end = !getBool("Are there any more areas to exclude? [YES,NO] ");
                    console.log(wall.excludeArea);
                }
            }

            walls.push(wall);
        }

    }
    console.log(brand.colours);
    calculateCost(brand);

}

run();
