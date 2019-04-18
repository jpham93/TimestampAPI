const express = require('express')
const app = express()

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/timestamp', function (req, res) {
  let date = new Date()
  res.json({ "unix": date.getTime(), "UTC": date.toUTCString() })
})

app.get("/api/timestamp/:date_string", function (req, res) {
  let dateString = req.params.date_string
  let date

  // Use regex patterns to determine if date is valid
  const isoPattern = /^\d{4}-\d{1,2}-\d{1,2}$/
  const intPattern = /^\d+$/

  // Check if date is ISO-8601 format YYYY-MM-DD
  if (isoPattern.test(dateString)) {
    date = new Date(dateString)
    res.json({ "unix": date.getTime(), "UTC": date.toUTCString() })
  }

  // ELSE check if dateString is is int
  else if (intPattern.test(dateString)) {
    // convert string integer to
    date = new Date(parseInt(dateString))
    res.json({ "unix": date.getTime(), "UTC": date.toUTCString() })
  }

  // ELSE date_string is invalid
  else {
    res.json({ "unix": null, "utc": "Invalid Date" })
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});