//De vanliga koden
const express= require ('express')
const app = express();
app.listen(4000);
console.log ('körs på port 4000')

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

const mysql = require("mysql"); 
con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jensen2023",
});

//array
const COLUMNS = ["id", "username", "password", "name", "email"];


//Hämta alla
app.get("/users", function (req, res) {
    let sql = "SELECT * FROM users"; //kod
    let condition = createCondition(req.query);//kod
    console.log(sql + condition); //kod
    con.query(sql + condition, function (err, result, fields) {
      if (err) throw err
      res.json(result);
    });
  });

// ID
 app.get("/users/:id", function (req, res) {
    let sql = "SELECT * FROM users WHERE id=" + req.params.id;
    console.log(sql);
    
    con.query(sql, function (err, result, fields) {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send("The column with the given ID was not found"); 
      }
    });
  });


//LÄS MER OM DETTA
  let createCondition = function (query) {
    console.log(query);
    let output = " WHERE ";
    for (let key in query) {
      if (COLUMNS.includes(key)) {
        output += `${key}="${query[key]}" OR `;
      }
    }
    if (output.length == 7) {
      return "";
    } else {
      return output.substring(0, output.length - 4);
    }
  };


 