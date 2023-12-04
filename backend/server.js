const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Server listening on ${PORT}`);
});

// app.use()


app.get('/api', (req, res) => {
    res.send({ express: 'Holla from server' });
});