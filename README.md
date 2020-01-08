# Developer Profile Generator

This is a command-line application which can be invoked with the following code.

```sh
node index.js
```
The PDF and HTML files will be populated with the following:

* Profile image
* User name
* Links to the following:
  * User location via Google Maps
  * User GitHub profile
  * User blog
* User bio
* Number of public repositories
* Number of followers
* Number of GitHub stars
* Number of users following

![Alt Text](./assets/img/terminal.png)

The application generate PDF file with using Html-Pdf Npm module.
Firts profile.Html generated then profile.pdf file will be generated dynamically.

![Alt Text](./assets/img/profileHtml.png)

![Alt Text](./assets/img/profilePDF.png)

The background color of the generated PDF matches the color that the user provides with the below code.

```sh
const colors = {
  indigo_blue: {
    wrapperBackground: "indigo",
    headerBackground: "royalblue",
    headerColor: "white",
    photoBorderColor: "white"
  },
  purple_salmon: {
    wrapperBackground: "royalblue",
    headerBackground: "salmon",
    headerColor: "white",
    photoBorderColor: "red"
  },
  orchid_thistle: {
    wrapperBackground: "orchid",
    headerBackground: "thistle",
    headerColor: "black",
    photoBorderColor: "slateblue"
  },
  gray_ligthgray: {
    wrapperBackground: "slategray",
    headerBackground: "lightgray",
    headerColor: "black",
    photoBorderColor: "black"
  }
};
```