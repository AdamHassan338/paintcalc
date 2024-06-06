"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import * as promptSync from 'prompt-sync';
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const litersPerMetet2 = 0.1;
let totalPaint = 0;
const syncPrompt = (0, prompt_sync_1.default)();
function calculatePaintForWall(width, height) {
    let area = width * height;
    return area * litersPerMetet2;
}
function getInteger(promptMessage) {
    let isValid = false;
    let number;
    while (!isValid) {
        const input = syncPrompt(promptMessage);
        number = parseInt(input, 10);
        if (!isNaN(number)) {
            if (number > 0)
                isValid = true;
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
    while (!isValid) {
        const input = syncPrompt(promptMessage).toUpperCase();
        if (input === "YES")
            return true;
        if (input === "NO")
            return false;
        console.log("Please enter a Yes or No. ");
    }
    return false;
}
function start() {
    //let test : boolean = getBool("Do you like fruits? ");
    let rooms = getInteger('How manny rooms will you paint? ');
    for (let i = 0; i < rooms; i++) {
        let walls = getInteger(`How manny walls will you paint in room ${i + 1} `);
        for (let j = 0; j < walls; j++) {
            let width = getInteger(`what is the width of wall ${j + 1} `);
            let height = getInteger(`what is the height of wall ${j + 1} `);
            totalPaint += calculatePaintForWall(width, height);
        }
    }
    console.log(`You will need ${totalPaint} Liters of paint`);
}
start();
//get number of rooms
//get number of walls
//get size of wall
//get exclude area
