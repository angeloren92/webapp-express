const connection = require('../data/DB_movies');

const index = (req, res) => {
    const query = 'SELECT * FROM movies';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching movies:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
}

const show = (req, res) => {

}

module.exports = { index, show };