const express = require('express');
const bodyParser = require('body-parser');
// const auth = require('./middleware/auth');

const app = express();

// Use bodyParser to parse JSON request bodies
app.use(bodyParser.json());

// Define routes
const bookmarkRoutes = require('./routes/bookmark');

// Apply the auth middleware to the routes
app.use('/api/bookmarks', bookmarkRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Osborne Books API');
});

const PORT = 3000

app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

module.exports = app;
