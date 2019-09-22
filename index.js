var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mssql = require("mssql");
var dbconfig = require("./dbconfig/database");
var port = process.env.PORT || 8080;

const Todos = require("./app/api/todo");

app.use(bodyParser.urlencoded({ extended: "true" }));

//create totdo table
function connectSQL() {
  var conn = new mssql.ConnectionPool(dbconfig);
  try {
    conn
      .connect()
      .then(function(pool) {
        console.log("db connected");
        conn.close();
        // const table = new mssql.Table("todoapp");
        // table.create = true;
        // table.columns.add("Id", mssql.NVarChar(200), {
        //   nullable: false,
        //   primary: true
        // });
        // table.columns.add("title", mssql.VarChar(50), { nullable: false });
        // table.rows.add("777", "test");

        // const request = new mssql.Request(pool);
        // request.bulk(table, (err, result) => {
        //   if (err) {
        //     console.log(err);
        //     conn.close();
        //   } else {
        //     console.log(result);
        //     conn.close();
        //   }
        // });
      })
      .catch(err => {
        console.log(err);
        conn.close();
      });
  } catch (e) {
    onsole.log(err);
    conn.close();
  }
}

app.use("/api/todos", Todos);

app.listen(port, () => console.log("Todo app is listening on port :: " + port));
console.log("App listening on port " + port);
connectSQL();
