import prompt from 'prompt-sync';

type Wall = {
    width?: number;
    height?: number;
    area? : number;
    colour? : string;
    excludeWidth? : number;
    excludeHeight? : number;
    excludeArea? : number;
}

const syncPrompt = prompt();

const litersPerMetet2 = 0.1;


let colours: Array<[key: string, value: number]> = [
    ["white", 0],
    ["peach", 0],
    ["red", 0],
    ["blue", 0]
  ];

let walls : Array<Wall> = [];


function isValidColour(colour:string) : boolean {

    for(let i = 0; i< colours.length; i++){
        if(colours[i][0]===colour)
            return true;
    }
    return false;
}

let totalPaint = 0;


function calculatePaintForWall(width : number,height : number): number {
    let area : number = width * height;

    return area * litersPerMetet2;

}

function area(width : number, height : number) : number {
    return width*height;
}

function getInteger(promptMessage: string): number {
    let isValid = false;
    let number;

    while (true) {

        const input: string = syncPrompt(promptMessage);
        number = parseInt(input, 10);

        if (!isNaN(number)) {
            if(number>0)
                return number;
            else
                console.log('please Enter a number larger than 0.');
        } else {
            console.log('please Enter a number.');
        }
    }


    return -1;
}

function getBool(promptMessage: string) : boolean {
    let isValid = false;

    while(true){
        const input: string = syncPrompt(promptMessage).toUpperCase();
        if ( input === "YES" )
            return true;
        if( input === "NO" )
            return false;
        console.log("Please enter a Yes or No. ");
    }

    return false;
}

function getColour(promptMessage : string) : string {

    /* TO DO */
    /* print the colour options */
    while(true){
        const input : string = syncPrompt(promptMessage).toLowerCase();
        if(isValidColour(input))
            return input;
        console.log("please enter a valid colour");
    }
    return"";
}



//get number of rooms
    //get number of walls
        //get size of wall
        //get exclude area
function run(){

    let rooms : number = getInteger('How manny rooms will you paint? ');
    console.log(rooms);
    for(let i = 0; i <rooms ; i++){
        let walls : number = getInteger(`How manny walls will you paint in room ${i+1} `);
        let sameColour : boolean = getBool(`Will you paint all walls in room ${i+1} the same colour? [YES,NO] `);
        let colour : string = "";
        let colourindex : number = -1;

        if(sameColour){
            colour = getColour(`What colour will you paint this room? `);
            colourindex = colours.findIndex(([k, _]) => k === colour);
        }
        
        for(let j = 0; j< walls ; j++){
            let wall : Wall = {}
            wall.width  = getInteger(`what is the width of wall ${j+1} `);
            wall.height = getInteger(`what is the height of wall ${j+1} `);

            if(!sameColour){
                colour = getColour("What colour will you paint this wall? ")
                colourindex = colours.findIndex(([k, _]) => k === colour);

            }
            wall.colour = colour;
            colours[colourindex][1] += area(wall.width,wall.height);

            totalPaint+= calculatePaintForWall(wall.width,wall.height);            

        }

    }
   console.log(`You will need ${totalPaint} Liters of paint`);
    
}

run();
