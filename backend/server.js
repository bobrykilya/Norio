const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;


app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Server listening on ${PORT}`);
});