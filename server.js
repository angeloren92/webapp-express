const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const routes = require('./routes/movie_routes');

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.use(express.json());
app.use('/api/movies', routes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

