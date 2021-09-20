const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'CRUDDataBase'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM contacts";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

app.post('/api/insert', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;

    const sqlInsert = "INSERT INTO contacts (name, email) VALUES (?,?)";
    db.query(sqlInsert, [name, email], (err, result) => {
        console.log(result);
    });
});

app.delete('/api/delete/:name', (req, res) => {
    const name = req.params.name;
    const sqlDelete = "DELETE FROM contacts WHERE name = ?";
    db.query(sqlDelete, name, (err, result) => {
        if (err) {
            console.log(err);
        }
    });
});

app.put('/api/update', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const sqlUpdate = "UPDATE contacts SET email = ? WHERE name = ?";
    db.query(sqlUpdate, [email, name], (err, result) => {
        if (err) {
            console.log(err);
        }
    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});