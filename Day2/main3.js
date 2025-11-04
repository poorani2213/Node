import * as fs from  "fs/promises"

async function hlo(){
 
    try{
 
   await fs.writeFile('evenodd.js', `
const num = 7;
if (num % 2 === 0) {
  console.log("Even number");
} else {
  console.log("Odd number");
}
  console.log("Even ,Odd logic are  written successfully!");
`); 


await fs.writeFile('prime.js',`
const num = 13;
  let isPrime = true;
  if(num <= 1) isPrime = false;
 else {
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      isPrime = false;
      break;
    }
  }
}
  
if (isPrime) console.log("Prime number");
else console.log("Not a prime number");
console.log("Prime check logic written!");
   } 
`)

// reverse string logic method:

    await fs.writeFile('reverse.js', `
const text = "hello";
const rev = text.split("").reverse().join("");
console.log("Reversed string:", rev);
`);
    console.log("Reverse string logic written!");

// factorial logic:

await fs.writeFile('factorial.js', `
const num = 5;
let fact = 1;

for (let i = 1; i <= num; i++) {
  fact *= i;
}

console.log("Factorial of", num, "is", fact);
`);
    console.log("Factorial logic is sucessfully written!");
  
    

    }catch(error){
     
        console.log(error.message);

    }

}




hlo();