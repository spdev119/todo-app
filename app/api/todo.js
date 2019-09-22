const mssql = require("mssql");
const uuidv4 = require("uuid/v4");
var dbconfig = require("../../dbconfig/database");
const express = require("express");
const router = express.Router();

//Test api
router.get("/", (req, res) => {
  res.send("Api is working");
});

//Get todos
router.get("/gettodos", (req, res) => {
  var conn = new mssql.ConnectionPool(dbconfig);
  try {
    conn
      .connect()
      .then(function(pool) {
        const request = new mssql.Request(pool);
        request.query("select * from todo", (err, result) => {
          if (err) {
            console.log(err);
            conn.close();
          } else {
            console.log(result);
            res.send(result);
            conn.close();
          }
        });
      })
      .catch(err => {
        console.log(err);
        conn.close();
      });
  } catch (e) {
    onsole.log(e);
    conn.close();
  }
});

//Get todos by id
router.get("/gettodos/:id", (req, res) => {
  var conn = new mssql.ConnectionPool(dbconfig);
  try {
    conn
      .connect()
      .then(function(pool) {
        var id = req.params.id;
        console.log(id);
        const request = new mssql.Request(pool);
        request.query(`select * from todo WHERE id='${id}'`, (err, result) => {
          if (err) {
            console.log(err);
            conn.close();
          } else {
            console.log(result);
            res.send(result);
            conn.close();
          }
        });
      })
      .catch(err => {
        console.log(err);
        conn.close();
      });
  } catch (e) {
    console.log(e);
    conn.close();
  }
});

//Post Todo
router.post("/todo", (req, res) => {
  var conn = new mssql.ConnectionPool(dbconfig);
  try {
    conn
      .connect()
      .then(function(pool) {
        var id = uuidv4();
        var title = req.body.title;
        console.log(`INSERT INTO 
        todo(Id, title) 
        VALUES(${id}, ${title})`);
        const request = new mssql.Request(pool);
        request.query(
          `INSERT INTO
                       todo(Id, title)
                       VALUES(${Math.floor(Math.random() * 10000) +
                         1}, '${title}')`,
          (err, result) => {
            if (err) {
              console.log(err);
              conn.close();
            } else {
              console.log(result);
              res.send(result);
              conn.close();
            }
          }
        );
      })
      .catch(err => {
        console.log(err);
        conn.close();
      });
  } catch (e) {
    console.log(err);
    conn.close();
  }
});

//Delete todo
router.delete("/:id", (req, res) => {
  var conn = new mssql.ConnectionPool(dbconfig);
  try {
    conn
      .connect()
      .then(function(pool) {
        var id = req.params.id;
        console.log(id);
        const request = new mssql.Request(pool);
        request.query(`DELETE FROM todo WHERE id='${id}'`, (err, result) => {
          if (err) {
            console.log(err);
            conn.close();
          } else {
            console.log(result);
            res.send(result);
            conn.close();
          }
        });
      })
      .catch(err => {
        console.log(err);
        conn.close();
      });
  } catch (e) {
    console.log(e);
    conn.close();
  }
});

module.exports = router;
