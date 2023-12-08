

//array
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
    for (let key in query) {
    }
    if (output.length == 7) {
      return "";
    } else {
      return output.substring(0, output.length - 4);
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

//POST
app.use(express.json());

app.post('/users', function(req, res) {

  if (!req.body.username) {
      res.status(400).send("username required!");
      return; 
    }
    let fields = ["username", "password", "name", "email"];
    for (let key in req.body) {
      if (!fields.includes(key)) {
        res.status(400).send("Unknown field: " + key);
        return;
      }
    }
  let sql = `INSERT INTO users (username, first_name)
  VALUES ('${req.body.username}',
  '${req.body.password}',
  '${req.body.name}',
  '${req.body.email}');
  SELECT LAST_INSERT_ID();`;

con.query(sql, function (err, result, fields) {
  if (err) throw err;
  let output = {
    id: result[0].insertId,
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
  };
  res.send(output);
});
});