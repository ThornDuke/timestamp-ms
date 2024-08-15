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

app.get("/api", (req, res) => {
  const now = new Date();
  const utcDate = now.toUTCString();
  const unixDate = now.valueOf();

  res.json({
    unix: unixDate,
    utc: utcDate,
  });
});

app.get("/api/:param", (req, res) => {
  const param = req.params.param;

  const testDate = new Date(Number.isInteger(Number(param)) ? Number(param) : param);
  if (Number.isNaN(testDate.valueOf())) {
    // incorrect date format
    res.status(200);
    res.json({ error: "Invalid date" });
  } else if (Number.isInteger(Number(param))) {
    // date as a unix number
    const date = new Date(Number(param)).toUTCString();
    res.json({ unix: Number(param), utc: date });
  } else {
    // date as a string
    const dateValue = new Date(param).valueOf();
    const dateUtc = new Date(param).toUTCString();
    res.json({ unix: dateValue, utc: dateUtc });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
