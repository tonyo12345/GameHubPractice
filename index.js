import mysql from 'mysql2';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

// Initialize dotenv
dotenv.config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// Set up MySQL connection using pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
}).promise(); // Use the promise-based API for MySQL

// Route to get all users
// app.get('/api/users', async (req, res) => {
//   try {
//     // Query the database to get all employees
//     const [rows] = await pool.query('SELECT * FROM employees');
//     res.json(rows); // Send the results as JSON
//   } catch (err) {
//     console.error('Error fetching users:', err);
//     res.status(500).json({ message: 'Error retrieving users' });
//   }
// });
app.get('/api/users', async (req, res) => {
    try {
      // Get the first_name from query parameters if provided
      const { first_name } = req.query;
  
      let query = 'SELECT * FROM employees';
      let queryParams = [];
  
      // If first_name is provided, modify the query to filter by first_name
      if (first_name) {
        query += ' WHERE first_name = ?';
        queryParams.push(first_name);
      }
  
      // Query the database with optional filtering
      const [rows] = await pool.query(query, queryParams);
      res.json(rows); // Send the results as JSON
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ message: 'Error retrieving users' });
    }
  });
  
  app.post('/api/signup', async (req, res) => {
    console.log(req.body);
    try {
      const sql = "INSERT INTO employees (first_name, last_name, age, gender, birth_date, profile_link, position) VALUES (?)";
  
      const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.age,
        req.body.gender,
        req.body.birth_date,
        req.body.profile_link,
        req.body.position
      ];
  
      // Use await for the query to handle the promise
      const [data] = await pool.query(sql, [values]);
      
      res.json(data); // Send the result back
    } catch (err) {
      console.error('Error inserting user:', err);
      res.status(500).json({ message: 'Error inserting user' });
    }
  });

  app.put('/api/users/:employee_id', async (req, res) => {
    const employeeId = req.params.employee_id; // Correctly extract employee_id from the route params
    const { first_name, last_name, age, gender, birth_date, profile_link, position} = req.body;
  
    const sql = `
      UPDATE employees 
      SET first_name = ?, last_name = ?, age = ?, gender = ?, birth_date = ?, profile_link = ?, position = ? 
      WHERE employee_id = ?`;
  
      if (!first_name || !last_name || !age || !gender || !birth_date || !profile_link || !position) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

    try {
      const [result] = await pool.query(sql, [first_name, last_name, age, gender, birth_date, profile_link, position, employeeId]);
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Employee not found.' });
      }
      
      res.status(200).json({ message: 'Employee updated successfully.' });
    } catch (err) {
      console.error('Error updating employee:', err);
      return res.status(500).json({ message: 'Database error.' });
    }
  });
  
  app.get('/api/users/:employee_id', async (req, res) => {
    const employeeId = req.params.employee_id; 
    console.log(employeeId);// Extract the employee_id from the URL params
  
    try {
      // Query the database to get the employee with the given ID
      const [rows] = await pool.query('SELECT * FROM employees WHERE employee_id = ?', [employeeId]);
  
      // If no employee is found, return a 404
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      // Send the employee data back as the response
      res.json(rows);
    } catch (err) {
      console.error('Error fetching employee:', err);
      res.status(500).json({ message: 'Error retrieving employee' });
    }
  });
  
  // DELETE method to remove a user by ID
  app.delete('/api/users/:employee_id', async (req, res) => {
    const employeeId = req.params.employee_id;
  
    // SQL query to delete the employee
    const query = 'DELETE FROM employees WHERE employee_id = ?';
  
    try {
      // Use async/await to handle the query
      const [result] = await pool.execute(query, [employeeId]);
  
      // Check if the employee was actually deleted
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Employee not found.' });
      }
  
      // Successful deletion
      res.status(200).json({ message: `Employee with ID ${employeeId} deleted successfully.` });
    } catch (err) {
      console.error('Error deleting employee:', err);
      return res.status(500).json({ error: 'Failed to delete employee.' });
    }
  });
  
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
