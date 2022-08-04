import express from "express";
import cors from "cors";
import fs  from "fs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());


let content = Date.now();

let fn = new Date();
let filename = fn.getDate() + "-" + (fn.getMonth() + 1) + "-" + fn.getFullYear() +
   "-" + fn.getHours() + "-" + fn.getMinutes() + "-" + fn.getSeconds() + ".txt";



   app.get("/", (request, response) => {
    response.send(
      "Welcome to App <br>"+
      "/createNewFile for creating file <br>"+
      "/listFiles for list of all files created"
    );
  });

//creating directory
function directory(){
  var dir = './myfiles';
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
  return dir;
  }
   directory();
  
// creating new file 

app.get("/createNewFile", async (request, response) => {
  await fs.writeFileSync(`./myfiles/${filename}`, `${content}`, (err) => {
    console.log(err ? err : "Success!");
  });
  console.log("file created")
  response.send(filename);
});

// list of all the files 

app.get("/listFiles", (request, response) => {
  fs.readdir("./myfiles/", async (err, files) => {
    let list = [];
    await files.forEach((file) => {
      console.log(file);
      list.push(file);
    });
    response.send(list);
  });
});

app.listen(PORT, () => console.log("The server connected in ", PORT));