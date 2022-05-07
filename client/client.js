const http = require("http");
const fs = require("fs");
const path = require("path");
const clientFilePath = path.join(__dirname, "//public", "//index.html");
const clientFile = fs.readFileSync(clientFilePath, "utf-8");

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url == "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(clientFile);
  } else if (path.extname(req.url) == ".js") {
    var jsPath = path.join(__dirname, "public", req.url);
    console.log(jsPath);
    fs.readFile(jsPath, (err, js) => {
      res.writeHead(200, { "content-type": "text/javascript" });
      res.end(js);
    });
  } else if (path.extname(req.url) == ".jpg") {
    var imagePath = path.join(__dirname, "public", req.url);
    fs.readFile(imagePath, (err, image) => {
      res.writeHead(200, { "content-type": "image/jpg" });
      res.end(image);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("No Page Found");
  }
});

server.listen(3000, "127.0.0.1");
