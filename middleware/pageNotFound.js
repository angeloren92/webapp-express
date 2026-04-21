// 404 handler middleware
const pageNotFound = (req, res) => {
    // Respond with JSON error for unknown routes
    res.status(404).json({ error: 'Page Not Found' });
}

module.exports = pageNotFound;