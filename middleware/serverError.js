const serverError = (err, req, res, next) => {
    console.error('Internal Server Error:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
}

module.exports = serverError;