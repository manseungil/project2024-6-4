const express = require("express");
const http = require("http");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// MySQL 데이터베이스 연결 설정
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "test"
});

// MySQL 데이터베이스 연결
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// HTTP GET 요청을 처리하는 라우트 (무작위 매칭)
app.get("/getRandomUser", (req, res) => {
    const query = "SELECT * FROM members ORDER BY RAND() LIMIT 1";
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching random user from database:', err);
            res.status(500).json({ error: "Error fetching random user from database" });
            return;
        }
        res.json(results[0]); // 무작위 사용자 정보를 응답으로 보냄
    });
});

const PORT = 5002;
server.listen(PORT, () => {
    console.log(`Matching server is running on port ${PORT}`);
});
