// Generic error handler middleware
const serverError = (err, req, res, next) => {
    // Log error on server
    console.error('Internal Server Error:', err);
    // Send JSON error response
    res.status(500).json({ error: err.message || 'Internal Server Error' });
}

module.exports = serverError;

