const express = require('express');
const app = express()
 
app.get('/', function (req, res) {
  res.send('Home page')
})
 
app.listen(3000)