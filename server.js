// Web server
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Web-server en linea! Port: ${PORT}...`);
});
