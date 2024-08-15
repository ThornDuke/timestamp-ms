// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:param", (req, res) => {
  const unixFormatRe = /^[0-9]+$/;
  const utcFormatRe = /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/;
  const param = req.params.param;

  if (unixFormatRe.test(param)) {
    const date = new Date(Number(param)).toUTCString();
    res.json({ unix: param, utc: date });
  } else if (utcFormatRe.test(param)) {
    const dateValue = new Date(param).valueOf();
    const dateUtc = new Date(param).toUTCString();
    res.json({ unix: dateValue, utc: dateUtc });
  } else {
    res.status(200);
    res.json({ error: "Incorrect API format" });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
