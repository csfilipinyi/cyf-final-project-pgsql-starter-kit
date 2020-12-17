const express = require("express");
const app = express();
const cors = require("cors");

const { Pool } = require("pg");
require("dotenv").config();

const PORT = process.env.PORT || 3002;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const pool = new Pool({
  user: "tester",
  host: "localhost",
  database: "attendance",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.post("/login", function (req, res) {
  //console.log(req.body)
  const email = req.body.email;
  const password = req.body.password;
  if (!req.body.email || !req.body.password) {
    return res.status(404).send("email and password required");
  }

  pool
    .query(
      "SELECT * FROM users INNER JOIN user_type ON users.user_type = user_type.id WHERE email = $1 AND password = $2 ",
      [email, password]
    )
    .then((result) => {
      if (result.rows.length > 0) {
        return res.json(result.rows[0]);
      } else {
        return res.status(404).send("user not available");
      }
    });
});


// API to allow a student choose a session to attend
app.get("/class", function (req, res) {
  pool.query("SELECT * FROM class", (error, result) => {
    res.json(result.rows);
  });
});

app.get("users/location/class/session", function (req, res) {
  pool.query("select users.name, user_type.type, location.name, class.name, session.name from users, user_type, location, class,session where user_type.id=users.user_type and location.id = class.location_id and class.id = session.class_id and users.id = 3", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/users/:studentId/class", (req, res) => {
  console.log("student");
  const studentId = req.params.studentId;
  const user_type = req.query.user_type;
  const username = req.query.username;
  
  const classQuery =
    "SELECT class.name FROM users, class WHERE user_type = $1 AND users.name = $2 AND users.id = $3";
    
  pool
  .query(classQuery, [user_type, username, studentId] )
   if (result.rows.length > 0) {
        return res.json(result.rows[0]);
      } else {
        return res.status(404).send("user not available");
      }
 
}); 

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
