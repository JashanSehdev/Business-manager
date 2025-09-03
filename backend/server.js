import express from 'express';
import cors from 'cors';
import pool from './database.js';  

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.post('/submit', async (req, res) => {
  const { name, email, city , state, phone } = req.body;
  console.log(`Name: ${name}, Email: ${email}, city: ${city}, state: ${state}, Phone: ${phone}`);
  senddata({name, email, city, state, phone});
  res.send('Form data received');
});

async  function senddata({name, email, city, state, phone}) {

    try {
        const [rows] = await pool.query('insert into  Customers (name, email, city, state, phone) values(?,?,?,?,?)', [name, email, city, state, phone]);
        console.log('Database connection successful:', rows);
    } catch (err) {
        console.error('Database connection failed:', err.message, err.stack);
    }
}

//testDBConnection();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
