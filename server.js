const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);
  
app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server listening port: ${PORT}`);
});

app.get('/', (req, res) =>{
  res.sendFile(createPath('index'));
});