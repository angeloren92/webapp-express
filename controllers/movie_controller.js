// Controller for movie-related endpoints
const connection = require('../data/DB_movies');

// Return all movies as JSON
const index = (req, res, next) => {
    const query = 'SELECT * FROM movies';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching movies:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        // Send the list of movies
        res.json(results);
    });
}

// Return a single movie and its reviews
const show = (req, res) => {
    const movieId = parseInt(req.params.id);
    const queryMovie = 'SELECT * FROM movies WHERE id = ?';
    connection.query(queryMovie, [movieId], (err, results) => {
        if (err) {
            console.error('Error fetching movie:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        if (results.length === 0) {
            // Movie not found
            res.status(404).json({ error: 'Movie not found' });
            return;
        }
        // Fetch reviews for the movie
        const queryReviews = 'SELECT * FROM reviews WHERE movie_id = ?';
        connection.query(queryReviews, [movieId], (err, reviews) => {
            if (err) {
                console.error('Error fetching reviews:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            // Attach reviews and send the movie object
            results[0].reviews = reviews;
        });

        const queryAvgVote = 'SELECT round(avg(vote), 2) AS average_vote FROM reviews WHERE movie_id = ?';
        connection.query(queryAvgVote, [movieId], (err, avgResult) => {
            if (err) {
                console.error('Error fetching average vote:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            console.log(avgResult);
            // Attach average vote to the movie object
            results[0].average_vote = avgResult[0].average_vote;
            res.json(results[0]);
        });
    });
}

const addReview = (req, res) => {
    const movieId = parseInt(req.params.id);
    const { name, vote, text } = req.body;
    const query = 'INSERT INTO reviews ( movie_id, name, vote, text) VALUES (?, ?, ?, ?)';
    connection.query(query, [movieId, name, text, vote], (err, results) => {
        if (err) {
            console.error('Error adding review:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Review added successfully' });
    });
}

module.exports = { index, show, addReview };