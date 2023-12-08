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
    database: 'jensen2023',
});

const COLUMNS = ["id", "carname", "cartype", "color"];

app.get("/cars", function (req, res) {
    let sql = "SELECT * FROM cars";
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

 app.get("/cars/:id", function (req, res) {
    let sql = "SELECT * FROM cars WHERE id=" + req.params.id;
    
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
      database: 'jensen2023',
  });

  con.connect (function (err) {
      console.log ("uppkopplad till databas");
      let sql= `INSERT INTO cars (carname, cartype, color)
      VALUES ('${req.body.carname}', '${req.body.cartype}', '${req.body.color}')`;
      console.log (sql);
      con.query (sql, function (err, result) {
          if (err) console.log (err);
          res.redirect ("/");
      });
  
  });
  });

   
