"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const syncPrompt = (0, prompt_sync_1.default)();
const litersPerMetet2 = 0.1;
//const colours : string[] = ["white","peach","red","blue"];
let colours = [
    ["white", 0],
    ["peach", 0],
    ["red", 0],
    ["blue", 0]
];
/* TO DO */
/*  STORE COLOURS WITH THE AREA THEY NEED TO PAINT */
function isValidColour(colour) {
    for (let i = 0; i < colours.length; i++) {
        if (colours[i][0] === colour)
            return true;
    }
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
        const input = syncPrompt(promptMessage).toLowerCase();
        if (isValidColour(input))
            return input;
        console.log("please enter a valid colour");
    }
    return "";
}
//get number of rooms
//get number of walls
//get size of wall
//get exclude area
function run() {
    let rooms = getInteger('How manny rooms will you paint? ');
    console.log(rooms);
    for (let i = 0; i < rooms; i++) {
        let walls = getInteger(`How manny walls will you paint in room ${i + 1} `);
        let sameColour = getBool(`Will you paint all walls in room ${i + 1} the same colour? [YES,NO] `);
        let colour;
        let colourindex = -1;
        if (sameColour) {
            colour = getColour(`What colour will you paint this room? `);
            colourindex = colours.findIndex(([k, _]) => k === colour);
        }
        for (let j = 0; j < walls; j++) {
            let width = getInteger(`what is the width of wall ${j + 1} `);
            let height = getInteger(`what is the height of wall ${j + 1} `);
            if (!sameColour) {
                colour = getColour("What colour will you paint this wall? ");
                colourindex = colours.findIndex(([k, _]) => k === colour);
            }
            colours[colourindex][1] += area(width, height);
            console.log(colours[colourindex][1]);
            totalPaint += calculatePaintForWall(width, height);
        }
    }
    console.log(`You will need ${totalPaint} Liters of paint`);
}
run();
