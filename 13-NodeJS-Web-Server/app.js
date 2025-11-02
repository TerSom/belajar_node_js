const http = require("http");
const fs = require("fs");
const path = require("path");
const port = 3000;

const rederHTML = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(400);
      res.write("pathnnya salah");
    } else {
      res.write(data);
    }
    res.end();
  });
};

http
  .createServer((req, res) => {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    const url = req.url;

    switch (url) {
      case "/about":
        rederHTML("./about.html", res);
        break;
      case "/contact":
        rederHTML("./contact.html", res);
        break;
      default:
        rederHTML("./index.html", res);
        break;
    }

    // if (url === "/about") {
    //   rederHTML("./about.html", res);
    // } else if (url === "/contact") {
    //   rederHTML("./contact.html", res);
    // } else {
    //   rederHTML("./index.html", res);
    // }
  })
  .listen(port, () => {
    console.log(`server is listeing on port ${port}`);
  });
