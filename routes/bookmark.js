// routes/bookmark.js
const express = require('express');
const Bookmark = require('../models/bookmarks');
const router = express.Router();
const pool = require('../config/db');
const { logger } = require('sequelize/lib/utils/logger');

// GET bookmarks
router.get('/', async (req, res) => {
    // const bookmarks = await Bookmark.findAll({ where: { username: req.username } })
        // .then(bookmarks => res.json(bookmarks))
    //     .catch(err => console.log(err))
    // const client = await pool.connect();
    const { username } = req.body
    try {
        // const client = await pool.connect();
        const query = 'SELECT * FROM bookmarks WHERE username = $1';
        const values = [username];
        const result = await pool.query(query, values);
        // client.release();
        if(result.rows.length === 0){
            return res.send({message: 'user not found'})
        }
        res.send({data: result.rows})

      } catch (err) {
        console.error(err);
        throw err;
      }
        
    // res.json(bookmarks);
});

// POST bookmark
router.post('/', async (req, res) => {
    const { title, page, username } = req.body;

    try {
        // const client = await pool.connect();

        const query = 'INSERT INTO bookmarks (title, page, username) VALUES ($1, $2, $3) RETURNING *';
        const values = [title, page, username];
        const result = await pool.query(query, values);
        console.log('query success');
        res.send({data: result.rows})
        // client.release();
        return result.rows[0];
      } catch (err) {
        console.error(err);
        throw err;
    }

});

// DELETE bookmark
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { username } = req.body; // Assuming the username is passed in the body of the request

    try {
        const query = 'DELETE FROM bookmarks WHERE id = $1 AND username = $2 RETURNING *';
        const values = [id, username];
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }

        res.json({ message: 'Bookmark deleted', id: result.rows[0].id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

