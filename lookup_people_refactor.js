const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

const someName = process.argv[2]

function returnString(err, output) {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Found", output.length, "person(s) by the name '" + someName + "':")

  for (let i = 0; i < output.length; i++) {
    console.log("- " + (i + 1) + ":", output[i].first_name, output[i].last_name + ", born '" + output[i].birthdate.toLocaleDateString() + "'")
  }

  client.end();
}

function searcher(cb) {
  client.connect((err) => {
    if (err) {
      cb(err)
    }
    client.query("SELECT * FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text", [someName], (err, result) => {
      console.log("Searching ...")
      if (err) {
        return console.error("error running query", err);
      }
      cb(null, result.rows)
    });
  });
}

searcher(returnString)
