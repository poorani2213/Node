
import * as fs from 'fs/promises'


async function  greet(){
 
try{

 await fs.writeFile('well.txt',"Hello")
 console.log("yes");

 //await fs.readFile('well.txt', 'utf-8')
 //console.log("its running readfile");

 //await fs.rename("well.txt","great.txt")
 //console.log("file name its scuessfully changed!");

 //await fs.appendFile('great.txt',"poorani, welocome")
 //console.log("new line is added sucessfully");
 
 //await fs.unlink('well.txt')
 //console.log("files deleted...")
 
 //await fs.access('great.txt')
 //console.log("yes it is there");

}catch(error){
  
console.log(error.message);

};

}
 greet();