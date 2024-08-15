
const express = require('express');
const pool = require('../config/db'); 
const router = express.Router();

// Create a Note
router.post('/', async (req, res) => {
    const { id, page, x, y, color, text } = req.body;

    try {
        const query = `INSERT INTO notes (id, page, x, y, color, text) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [id, page, x, y, color, text];
        const result = await pool.query(query, values);
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get All Notes
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM notes');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a Note
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { page, x, y, color, text } = req.body;

    try {
        const query = `UPDATE notes SET page = $1, x = $2, y = $3, color = $4, text = $5 WHERE id = $6 RETURNING *`;
        const values = [page, x, y, color, text, id];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a Note
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = `DELETE FROM notes WHERE id = $1 RETURNING *`;
        const values = [id];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json({ message: 'Note deleted', data: result.rows[0] });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
