const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  // res.send('Hello World!')
  // res.json({
  //   nama : "terry",
  //   kelas : 17,
  //   email : "umaysomay@gmail.com"
  // })
  res.sendFile("./index.html", {root: __dirname})
})

app.get("/about", (req,res) => {
  res.sendFile("./about.html" , {root: __dirname})
})

app.get("/contact", (req,res) => {
  res.sendFile("./contact.html", {root: __dirname})
})

app.get("/product/:id", (req,res) => {
  res.send(`product ID : ${req.params.id} <br> category : ${req.query.category}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use("/", (req,res) => {
  res.status(404)
  res.send("<h1>404 NOT FOUND</h1>")
})

// const http = require("http");
// const fs = require("fs");
// const path = require("path");
// const port = 3000;

// const rederHTML = (path, res) => {
//   fs.readFile(path, (err, data) => {
//     if (err) {
//       res.writeHead(400);
//       res.write("pathnnya salah");
//     } else {
//       res.write(data);
//     }
//     res.end();
//   });
// };

// http
//   .createServer((req, res) => {
//     res.writeHead(200, {
//       "content-type": "text/html",
//     });

//     const url = req.url;

//     switch (url) {
//       case "/about":
//         rederHTML("./about.html", res);
//         break;
//       case "/contact":
//         rederHTML("./contact.html", res);
//         break;
//       default:
//         rederHTML("./index.html", res);
//         break;
//     }

//     // if (url === "/about") {
//     //   rederHTML("./about.html", res);
//     // } else if (url === "/contact") {
//     //   rederHTML("./contact.html", res);
//     // } else {
//     //   rederHTML("./index.html", res);
//     // }
//   })
//   .listen(port, () => {
//     console.log(`server is listeing on port ${port}`);
//   });
