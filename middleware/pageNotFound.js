const pageNotFound = (req, res) => {
    res.status(404).json({ error: 'Page Not Found' });
}

module.exports = pageNotFound;