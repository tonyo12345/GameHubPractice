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

app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`)
});