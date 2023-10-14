const express = require('express');
const path = require('path');
// const morgan = require('morgan')

const app = express();

const PORT = 3000;


const createPath = (page) => path.resolve(__dirname, 'public', 'views', `${page}.html`);
  
app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server listening port: ${PORT}`);
});

// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// app.use(express.static('public'));
app.use(express.static("public"));

// app.use(express.static('styles'));

app.get(['/', 'index.html'], (req, res) =>{
  res.sendFile(createPath('index'));
});
