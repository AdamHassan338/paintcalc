"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
class Brand {
    constructor(name, prices) {
        this.colours = [
            ["PEACH", 0],
            ["CREAM", 0],
            ["CLAY", 0],
            ["WHITE", 0],
            ["INDIGO", 0],
            ["OLIVE", 0],
            ["SAGE", 0]
        ];
        this.name = name;
        this.prices = prices;
    }
}
let dulux = new Brand("Dulux", [3.00, 3.70, 5.30, 6.00]);
let goodHome = new Brand("GoodHome", [2.80, 3.30, 5.00, 5.70]);
let sandtex = new Brand("Sandtex", [3.20, 3.40, 5.20, 5.10]);
function printPrice(brand) {
    console.log(brand.name);
    console.log(`10L £${brand.prices[0] * 10}`);
    console.log(`5L £${brand.prices[1] * 5}`);
    console.log(`2.5L £${brand.prices[2] * 2.5}`);
    console.log(`1L £${brand.prices[3]}\n`);
}
const syncPrompt = (0, prompt_sync_1.default)();
const litersPerMetet2 = 0.1;
let colours = [
    ["PEACH", 0],
    ["CREAM", 0],
    ["CLAY", 0],
    ["WHITE", 0],
    ["INDIGO", 0],
    ["OLIVE", 0],
    ["SAGE", 0]
];
let walls = [];
function isValidColour(colour) {
    for (let i = 0; i < colours.length; i++) {
        if (colours[i][0] === colour)
            return true;
    }
    console.log(colour);
    return false;
}
let totalPaint = 0;
function calculatePaintForWall(width, height) {
    let area = width * height;
    return area * litersPerMetet2;
}
function area(width, height) {
    return width * height;
}
function getInteger(promptMessage) {
    let isValid = false;
    let number;
    while (true) {
        const input = syncPrompt(promptMessage);
        number = parseInt(input, 10);
        if (!isNaN(number)) {
            if (number > 0)
                return number;
            else
                console.log('please Enter a number larger than 0.');
        }
        else {
            console.log('please Enter a number.');
        }
    }
    return -1;
}
function getBool(promptMessage) {
    let isValid = false;
    while (true) {
        const input = syncPrompt(promptMessage).toUpperCase();
        if (input === "YES")
            return true;
        if (input === "NO")
            return false;
        console.log("Please enter a Yes or No. ");
    }
    return false;
}
function getColour(promptMessage) {
    /* TO DO */
    /* print the colour options */
    while (true) {
        const input = syncPrompt(promptMessage).toUpperCase();
        if (isValidColour(input))
            return input;
        console.log("please enter a valid colour");
    }
    return "";
}
function getBrand(promptMessage) {
    while (true) {
        const input = syncPrompt(promptMessage).toLowerCase();
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
function calculateCost(brand) {
    console.log("You will need to buy: ");
    let total = 0;
    for (let i = 0; i < brand.colours.length; i++) {
        if (brand.colours[i][1] <= 0)
            continue;
        let ten = 0;
        let five = 0;
        let two = 0;
        let one = 0;
        let cost = "";
        let remainder = brand.colours[i][1];
        ten = Math.floor(remainder / 10);
        remainder -= 10 * ten;
        five = Math.floor(remainder / 5);
        remainder -= 5 * five;
        two = Math.floor(remainder / 2.5);
        remainder -= 2.5 * two;
        one = Math.ceil(remainder);
        console.log(`${brand.name} ${brand.colours[i][0]} ${brand.colours[i][1]}Liters `);
        if (ten > 0) {
            cost = (Math.round(ten * 10 * brand.prices[0] * 100) / 100).toFixed(2);
            console.log(`- ${ten} x 10L Tins = £${cost}`);
        }
        if (five > 0) {
            cost = (Math.round(five * 5 * brand.prices[1] * 100) / 100).toFixed(2);
            console.log(`- ${five} x 5L Tins = £${cost}`);
        }
        if (two > 0) {
            cost = (Math.round(two * 2.5 * brand.prices[2] * 100) / 100).toFixed(2);
            console.log(`- ${two} x 2.5L Tins = £${cost}`);
        }
        if (one > 0) {
            cost = (Math.round(one * 1 * brand.prices[3] * 100) / 100).toFixed(2);
            console.log(`- ${one} x 1L Tins = £${cost}`);
        }
        total += ten * 10 * brand.prices[0];
        total += five * 5 * brand.prices[1];
        total += two * 2.5 * brand.prices[2];
        total += one * 1 * brand.prices[3];
    }
    console.log(`Total: £${(Math.round(total * 100) / 100).toFixed(2)}`);
}
//get number of rooms
//get number of walls
//get size of wall
//get exclude area
function run() {
    printPrice(dulux);
    printPrice(goodHome);
    printPrice(sandtex);
    let brand = getBrand(`What brand of paint do you want to buy: Dulux, GoodHome, Sandtex? `);
    let rooms = getInteger('How manny rooms will you paint? ');
    for (let i = 0; i < rooms; i++) {
        let numWalls = getInteger(`How manny walls will you paint in room ${i + 1} `);
        let sameColour = getBool(`Will you paint all walls in room ${i + 1} the same colour? [YES,NO] `);
        let colour = "";
        let colourindex = -1;
        if (sameColour) {
            colour = getColour(`What colour will you paint this room? `);
            colourindex = brand.colours.findIndex(([k, _]) => k === colour);
        }
        for (let j = 0; j < numWalls; j++) {
            let wall = {};
            wall.width = getInteger(`what is the width of wall ${j + 1} `);
            wall.height = getInteger(`what is the height of wall ${j + 1} `);
            wall.excludeArea = 0;
            if (!sameColour) {
                colour = getColour("What colour will you paint this wall? ");
                colourindex = brand.colours.findIndex(([k, _]) => k === colour);
            }
            wall.colour = colour;
            brand.colours[colourindex][1] += area(wall.width, wall.height);
            totalPaint += calculatePaintForWall(wall.width, wall.height);
            let toExclude = getBool("Are the any areas you wish to exclude on this wall? [YES,NO] ");
            if (toExclude) {
                let end = false;
                let count = 1;
                while (!end) {
                    let width = getInteger(`What is the WIDTH of area ${count} to exclude?`);
                    let height = getInteger(`What is the HEIGHT of area ${count} to exclude?`);
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
