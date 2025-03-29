import mysql2, { createConnection } from 'mysql2'
import mysql from 'mysql2'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

//initialize dotenv
dotenv.config();

const app =express();
const port = 5000;

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).promise();

app.get('/games', async (req, res) => {
    try{
        const [rows] = await db.query("SELECT * FROM games");
        res.json(rows);
    } catch(err){
        console.log("Error in fetching games", err);
        res.status(500).json({ message: 'Error retrieving users' });
    }
})

app.post('/addgames', async (req, res) => {
    try {
        const sql = 'INSERT INTO games (title, description, category, release_date, platforms, thumbnail_url, game_url, developer, publisher, rating, tags, image_links) VALUES (?)'
        const values = [
            req.body.title,
            req.body.description,
            req.body.category,
            req.body.release_date,
            req.body.platforms,
            req.body.thumbnail_url,
            req.body.game_url,
            req.body.developer,
            req.body.publisher,
            req.body.rating,
            req.body.tags,
            req.body.image_links
        ]
        
        const [result] = await db.query(sql, [values]);
        res.json(result);
        console.log('Game inserted successfully:', result);
    } catch (error) {
        console.error('Error inserting game:', error);
        res.status(500).json({ message: 'Error inserting game' });
    }
}
);

app.put('/updategames/:id', async (req, res) => {
    try {
        const gameId = req.params.id;
        const sql = 'UPDATE games SET title = ?, description = ?, category = ?, release_date = ?, platforms = ?, thumbnail_url = ?, game_url = ?, developer = ?, publisher = ?, rating = ?, tags = ?, image_links = ? WHERE id = ?';
        const values = [
            req.body.title,
            req.body.description,
            req.body.category,
            req.body.release_date,
            req.body.platforms,
            req.body.thumbnail_url,
            req.body.game_url,
            req.body.developer,
            req.body.publisher,
            req.body.rating,
            req.body.tags,
            req.body.image_links,
            gameId
        ];

        const [result] = await db.query(sql, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Employee not found.' });
        }
        res.status(200).json({ message: 'Employee updated successfully.' });
    } catch (error) {
        console.error('Error updating game:', error);
        res.status(500).json({ message: 'Error updating game' });
    }
});

app.delete('/deletegames/:id', async (req, res) => {
    try {
        const gameId = req.params.id;
        const sql = 'DELETE FROM games WHERE id = ?';
        const [result] = await db.query(sql, [gameId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Game not found.' });
        }
        res.status(200).json({ message: 'Game deleted successfully.' });
    } catch (error) {
        console.error('Error deleting game:', error);
        res.status(500).json({ message: 'Error deleting game' });
    }
}
);

app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`)
});