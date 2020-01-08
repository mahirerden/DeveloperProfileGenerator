const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
var generateHTML = require('./generateHTML');
var pdf = require('html-pdf');
var options = { format: 'Letter' };

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
     return inquirer.prompt([
          {
               type: "list",
               message: "Please select template color",
               name: "color",
               choices: [
                    "indigo_blue",
                    "purple_salmon",
                    "orchid_thistle",
                    "gray_ligthgray"
               ]
          },
          {
               type: "input",
               name: "name",
               message: "What is your name? "
          },
          {
               type: "input",
               name: "currentjob",
               message: "What is your current job? "
          },
          {
               type: "input",
               name: "location",
               message: "Where are you from? "
          },
          {
               type: "input",
               name: "githubname",
               message: "What is GitHub UserName? "
          },
          {
               type: "input",
               name: "linkedin",
               message: "Enter your LinkedIn UserName: "
          },
          {
               type: "input",
               name: "bio",
               message: "Enter your bio: "
          }
     ]);
};

async function init() {
     console.log("hi")
     try {
          const answers = await promptUser();

          var queryUrl = `https://api.github.com/users/${answers.githubname}/repos`;
          await axios.get(queryUrl).then(res => {
               answers.publicRepo = res.data.length;
               //console.log(answers.publicRepo);
          });

          queryUrl = `https://api.github.com/users/${answers.githubname}/followers`;
          await axios.get(queryUrl).then(res => {
               answers.followers = res.data.length;
               //console.log(answers.followers);
          });
          queryUrl = `https://api.github.com/users/${answers.githubname}/following`;
          await axios.get(queryUrl).then(res => {
               answers.following = res.data.length;
               //console.log(answers.following);
          });
          queryUrl = `https://api.github.com/users/${answers.githubname}/starred`;
          await axios.get(queryUrl).then(res => {
               answers.starred = res.data.length;
               //console.log(answers.starred);
          });
          queryUrl = `https://api.github.com/users/${answers.githubname}`;
          await axios.get(queryUrl).then(res => {
               var id = res.data.id;
               //console.log(id);
               answers.imgUrl = `https://avatars2.githubusercontent.com/u/${id}?v=4`;
               //console.log(answers.imgUrl);
          });

          const html = generateHTML.generate(answers);

          await writeFileAsync("profile.html", html);

          var htmlPdf = fs.readFileSync('./profile.html', 'utf8');

          await pdf.create(htmlPdf, options).toFile('./profile.pdf', function(err, res) {
               if (err) return console.log(err);
               console.log(res);
          }); 

          console.log("Successfully wrote to profile.html");
          console.log("Successfully generated profile.pdf");
     } catch (err) {
          console.log(err);
     }
}

init();