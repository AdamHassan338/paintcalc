import prompt from 'prompt-sync';
type wall = {
    width: number;
    height: number;
}

const litersPerMetet2 = 0.1;

let totalPaint = 0;
const syncPrompt = prompt();

function calculatePaintForWall(width : number,height : number): number {
    let area : number = width * height;

    return area * litersPerMetet2;

}

function getInteger(promptMessage: string): number {
    let isValid = false;
    let number;

    while (!isValid) {

        const input: string = syncPrompt(promptMessage);
        number = parseInt(input, 10);

        if (!isNaN(number)) {
            if(number>0)
                isValid = true;
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

    while(!isValid){
        const input: string = syncPrompt(promptMessage).toUpperCase();
        if ( input === "YES" )
            return true;
        if( input === "NO" )
            return false;
        console.log("Please enter a Yes or No. ")
    }

    return false;
}



//get number of rooms
    //get number of walls
        //get size of wall
        //get exclude area
function run(){
    //let test : boolean = getBool("Do you like fruits? ");
    let rooms : number =getInteger('How manny rooms will you paint? ')
    for(let i = 0; i <rooms ; i++){
        let walls : number = getInteger(`How manny walls will you paint in room ${i+1} `)

        for(let j = 0; j< walls ; j++){
            let width : number = getInteger(`what is the width of wall ${j+1} `);
            let height : number = getInteger(`what is the height of wall ${j+1} `);
            
            totalPaint+= calculatePaintForWall(width,height);
        }

    }
   console.log(`You will need ${totalPaint} Liters of paint`);
    
}

run();
