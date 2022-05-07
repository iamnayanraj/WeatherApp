const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const header = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
  };
  if (req.url == "/") {
    if (req.method === "OPTIONS") {
      res.writeHead(204, header);
      res.end();
      return;
    }
    let cityName = "";
    req.on("data", (chunk) => {
      cityName += chunk;
    });
    req.on("end", () => {
      const cityObj = JSON.parse(cityName);
      const city = cityObj.city;
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=539cd4b086fa9e5546734c2b96c3173c`;
      let data = "";
      http
        .get(url, (response) => {
          response.on("data", (chunk) => {
            data += chunk;
          });
          response.on("end", () => {
            data = JSON.parse(data);
            if (data.cod === "404" || data.cod === "400") {
              res.writeHead(200, header);
              res.end(JSON.stringify(data));
            } else {
              res.writeHead(200, header);
              res.end(
                JSON.stringify({
                  temprature: (data.main.temp - 273.5).toFixed(2),
                  cityname: data.name,
                  countryname: data.sys.country,
                  description: data.weather[0].description,
                })
              );
            }
          });
        })
        .on("error", (err) => {
          console.log(err.message);
        });
    });
  }
});
server.listen(5000, "127.0.0.1");
