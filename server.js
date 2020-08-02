var express = require("express");
var CORS = require("cors");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");
app.use(CORS({ origin: true }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// connection configurations
var dbConn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "db",
});

// connect to database
dbConn.connect();

// Retrieve all employees
app.get("/employees", function (req, res) {
  dbConn.query("SELECT * FROM Employees", function (error, results, fields) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results,
      message: "Employees list.",
    });
  });
});

// Add a new employee
app.post("/employee", function (req, res) {
  let id_employee = req.body.id_employee;
  let fullname = req.body.fullname;
  let funcion = req.body.funcion;
  let id_boss = req.body.id_boss;

  dbConn.query(
    `INSERT INTO Employees (id_employee,fullname,funcion,id_boss) Values (?, ?, ?, ?)`,
    [id_employee, fullname, funcion, id_boss],
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "successfully added",
      });
    }
  );
});

app.delete("/deleteEmp/:id", function (req, res) {
  let id = req.params.id;
  console.log(id);
  dbConn.query("DELETE FROM Employees WHERE id_employee = ?", id);
});

// set port
app.listen(33068, function () {
  console.log("Node app is running on port 33068");
});

module.exports = app;
