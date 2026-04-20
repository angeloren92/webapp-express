const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const routes = require('./routes/movie_routes');
const pageNotFound = require('./middleware/pageNotFound');
const serverError = require('./middleware/serverError');

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use(express.static('public'));
app.use(express.json());
app.use('/api/movies', routes);

app.use(pageNotFound);
app.use(serverError);

