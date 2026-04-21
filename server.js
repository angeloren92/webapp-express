const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const routes = require('./routes/movie_routes');
const pageNotFound = require('./middleware/pageNotFound');
const serverError = require('./middleware/serverError');
const cors = require('cors');

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use(cors({
    origin: process.env.FRONTENDED_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.static('public'));
app.use(express.json());
app.use('/api/movies', routes);

app.use(pageNotFound);
app.use(serverError);

