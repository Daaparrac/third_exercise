var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// default route
app.get("/", function (req, res) {
  return res.send({ error: true, message: "hello" });
});
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

// Retrieve user with id
app.get("/user/:fullname", function (req, res) {
  let employee_name = req.params.fullname;

  if (!employee_name) {
    return res.status(400).send({
      error: true,
      message: "Please provide fullname for example 'Empleado1'",
    });
  }

  dbConn.query("SELECT * FROM Employees ", employee_name, function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results[0],
      message: "Employees list.",
    });
  });
});

// Add a new employee
app.post("/employee", function (req, res) {
  let employee = req.body.employee;
  console.log(employee);
  if (!employee) {
    return res
      .status(400)
      .send({ error: true, message: "Please provide employee" });
  }

  console.log(employee);

  dbConn.query(
    "INSERT INTO Employees (id_employee,fullname,funcion,id_boss) VALUES ",
    { employee: employee },
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "New employee has been created successfully.",
      });
    }
  );
});

// set port
app.listen(33068, function () {
  console.log("Node app is running on port 3000");
});

module.exports = app;
