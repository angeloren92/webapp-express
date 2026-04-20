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
    const movieId = req.params.id;
    const queryMovie = 'SELECT * FROM movies WHERE id = ?';
    connection.query(queryMovie, [movieId], (err, results) => {
        if (err) {
            console.error('Error fetching movie:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ error: 'Movie not found' });
            return;
        }
        const queryReviews = 'SELECT * FROM reviews WHERE movie_id = ?';
        connection.query(queryReviews, [movieId], (err, reviews) => {
            if (err) {
                console.error('Error fetching reviews:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            results[0].reviews = reviews;
            res.json(results[0]);
        });
    });
}

module.exports = { index, show };