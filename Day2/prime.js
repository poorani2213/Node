
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
   
