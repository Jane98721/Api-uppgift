const express = require ('express')
const app = express();
app.listen(1000);
console.log ('körs på port 1000')

let mysql = require ('mysql');

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/apitest.html");
  });
  

let con = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: "",
    database: 'användare1',
});

const COLUMNS = ["id", "username", "password", "name", "email"];

app.get("/users", function (req, res) {
    let sql = "SELECT * FROM users";
    let condition = createCondition(req.query);
    con.query(sql + condition, function (err, result, fields) {
      if (err) throw err
      res.json(result);
    });
  });

  let createCondition = function (query) {
    let output = " WHERE ";
    if (output.length == 5) {
      return "";
    } else {
      return output.substring(0, output.length - 2);
    }
  };

 app.get("/users/:id", function (req, res) {
    let sql = "SELECT * FROM users WHERE id=" + req.params.id;
    
    con.query(sql, function (err, result, fields) {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send("The column with the given ID was not found"); 
      }
    });
  });
  

  app.use (express.urlencoded ({extended:true}));
  app.post("/", function (req, res) {
  con = mysql.createConnection ({
      host: 'localhost',
      user: 'root',
      password: "",
      database: 'användare1',
  });

  con.connect (function (err) {
      console.log ("uppkopplad till databas");
      let sql= `INSERT INTO users (username, password, name, email)
      VALUES ('${req.body.username}', '${req.body.password}', '${req.body.name}', '${req.body.email}')`;
      console.log (sql);
      con.query (sql, function (err, result) {
          if (err) console.log (err);
          res.redirect ("/");
      });
  
  });
  });

   
