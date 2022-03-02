const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Rhoda@17",
    database: "email-filter"

})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) =>{
    const sqlGet = "SELECT * FROM emailfilter_db";
    db.query(sqlGet, (error, result) =>{
        res.send(result);
    });
});

app.post("/api/post", (req, res) => {
    const {username, email, contact, message} = req.body;
    const sqlInsert = "INSERT INTO emailfilter_db (username, email, contact, message) VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [username, email, contact, message], (error, result) => {
        if (error){
            console.log(error);
        }
    });
});

app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM emailfilter_db WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
        if (error){
            console.log(error);
        }
    });
});

app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT FROM emailfilter_db WHERE id = ?";
    db.query(sqlGet, parseInt(id), (error, result) => {
        if (error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const {username, email, contact, message} = req.body;
    const sqlUpdate = "UPDATE emailfilter_db SET username = ?, email = ?, contact = ?, message =? WHERE id = ? ";
    db.query(sqlUpdate, [username, email, contact, message, id], (error, result) => {
        if (error){
            console.log(error);
        }
        res.send(result);
    });
});

app.get("/", (req, res) => {
    // const sqlInsert = "INSERT INTO emailfilter_db (username, email, contact, message) VALUES ('luckyaremu', 'b@gmail.com', '123456789', 'jckfsdufzbasdjkguykfbhsdfjkasd')";
    // db.query(sqlInsert, (err, result) => {
    //     console.log("error", error);
    //     console.log("result", result);
    //     res.send("hello connected");
    // });
});

app.listen(5000, () => {
    console.log("app is running successfully on port 5000")
})
