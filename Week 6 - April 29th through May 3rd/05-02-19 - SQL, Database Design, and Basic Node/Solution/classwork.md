``` javascript
    // FILE 1
    import {random} from "./secondFile.js"
    let num1 = parseInt(process.argv[2]);
    let num2 = parseInt(process.argv[3]);

    if(isNaN(num1) || isNaN(num2)){
        console.log("You must provide two numbers!")
    }
    else{
        if(num1>num2){
            console.log(random(num2, num1))
        }
        else{
            console.log(random(num1, num2))
        }
    }


    //FILE 2
    export default function random(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
```

``` javascript
let fetch = require("node-fetch");

let callType = process.argv[2]

switch(callType.toLowerCase()){
    case 'xrate':
    callXRate(process.argv[3], process.argv[4]);
    break;
    case 'stock': 
    callStock(process.argv[3]);
    break;
    default: 
    console.log("\x1b[31m", "Invalid option provided", "\x1b[37m", "Please provide one of the following:")
    console.log("\x1b[32m",'xrate: ', "\x1b[37m", 'Followed by two currency symbols to see live exchange rate (all space separated)')
    console.log("\x1b[33m", 'OR');
    console.log("\x1b[32m", 'stock: ', "\x1b[37m", 'followed by a stock symbol to see current live information.')
}

async function callStock(symbol){
const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=DQXD1V0JETLYTH2O`)
let json = await response.json();
console.log(json);
}

async function callXRate(from, to){
    const response = await fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=DQXD1V0JETLYTH2O`)
    let json = await response.json()
    console.log(json);
}

```