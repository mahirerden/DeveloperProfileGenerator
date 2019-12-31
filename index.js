const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
var http = require('http');
var generateHTML = require('./generateHTML');

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
     return inquirer.prompt([
          {
               type: "list",
               message: "Please select header color",
               name: "header-color",
               choices: [
                    "green",
                    "blue",
                    "pink",
                    "red"
               ]
          },
          {
               type: "input",
               name: "name",
               message: "What is your name?"
          },

     ]);
}



// const PORT=8080; 

// fs.readFile('./index.html', function (err, html) {

//     if (err) throw err;    

//     http.createServer(function(request, response) {  
//         response.writeHeader(200, {"Content-Type": "text/html"});  
//         response.write(html);  
//         response.end();  
//     }).listen(PORT);
// });