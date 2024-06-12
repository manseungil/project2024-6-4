const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "test"
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.get("/getRandomUser", (req, res) => {
    const query = "SELECT * FROM members ORDER BY RAND() LIMIT 1";
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching random user from database:', err);
            res.status(500).json({ error: "Error fetching random user from database" });
            return;
        }
        res.json(results[0]);
    });
});

const PORT = 5002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
