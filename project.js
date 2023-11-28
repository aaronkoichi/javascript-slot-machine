// 1. Deposit some money

// 2. Determine number of lines to bet
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. check if the user won
// 6. Give the user their winnings/ take their bet
// 7. play again


// function
// function deposit() {
//     return 1;

// }

// importing the package
const prompt = require("prompt-sync")();


// global variables
// rows and columns
const ROWS = 3;
const COLS = 3;

// Dictionary
// Key : value
const SYMBOLS_COUNT  = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8
}


// multiplier
const SYMBOL_VALUES = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2
}

//Also a function
const deposit = () => {

    while (true) {
            // constant variable
        const depositAmount = prompt("Enter a deposit amount: ");
        // Cast to float
        const numberDepositAmount = parseFloat(depositAmount);

        // isNaN = is not a number
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount. Try Again.");
        } else {
            return numberDepositAmount; // Return (will break the loop)
        }
    }
    
}

const getNumberOfLines = () => {
    while (true) {
            // constant variable
        const lines = prompt("Enter the number of lines to bet on(1-3): ");
        // Cast to float
        const numberOfLines = parseFloat(lines);

        // isNaN = is not a number
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines. Try Again.");
        } else {
            return numberOfLines; // Return (will break the loop)
        }
    }
}

const getBet = (balance, lines) => {
    while (true) {
        // constant variable
        const bet = prompt("Enter the bet per line: ");
        // Cast to float
        const numberBet = parseFloat(bet);

        // isNaN = is not a number
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet. Try again.");
        } else {
            return numberBet; // Return (will break the loop)
        }
    }
    
}

const spin = () => {
    const symbols = []; // array
    // Loop through the dictionary
    // simillar to python: for x, y in symbols_count: something like that 
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        // console.log(symbol,count);
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);  // simillar to append

        }
    }
     // nested arrays
    const reels = [];

    // nested loops
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols]; // importing array from another array
        for (let j  = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length) // generate a random index
            const selectedSymbol = reelSymbols[randomIndex]; // pick the symbol
            reels[i].push(selectedSymbol) // represent the reel we are currently working on
            reelSymbols.splice(randomIndex, 1); // remove one element
        }
    }

    return reels;
};
// spin();

const transpose = (reels) => {
    const rows = [];

    for (let  i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }

    return rows;
};


const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if (i != row.length - 1) {
                rowString += " | "
            }
        } 
        console.log(rowString);
    }
}

const getWinnings = (rows,bet, lines) => {
    let winnings = 0;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame =  true;


        for (const symbol of symbols) {
            if ( symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }
        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings;
}

const game = () => {
    // let = able for us to change the variable ltr.
    let balance = deposit();

    // game loop
    while (true) {
        console.log("You have a balance of: $" + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;   
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log("You Won, $" + winnings.toString());

        if (balance <= 0) {
            console.log("You ran out of money!");
            break;
        }

        const playAgain = prompt("Do you want to play again? (y/n)? ") 

        if (playAgain != 'y') break;



    }
}



// main
game();



