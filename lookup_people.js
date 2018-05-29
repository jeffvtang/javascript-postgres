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

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text", [someName], (err, result) => {
    console.log("Searching ...")
    if (err) {
      return console.error("error running query", err);
    }
    // console.log(result.rows); //output: 1

    let output = result.rows
    console.log("Found", output.length, "person(s) by the name '" + someName + "':")

    for (let i = 0; i < output.length; i++) {
      console.log("- " + (i + 1) + ":", output[i].first_name, output[i].last_name + ", born '" + output[i].birthdate.toLocaleDateString() + "'")
    }

    // result.rows.forEach(arrayItem => {
    //   console.log("- :", arrayItem.first_name, arrayItem.last_name + ", born '" + arrayItem.birthdate.toLocaleDateString() + "'")
    //   /*        for (objectItem in arrayItem) {
    //           console.log(arrayItem[objectItem])
    //         } */
    // })

    // result.rows.forEach(row => {
    //   // console.log(row)
    //   console.log (rows + row[1] + row[2] + row[3])
    //   for (column in row) {
    //     console.log(column, row[column]);
    //   }
    // })

    client.end();
  });
});



// client.connect((err) => {
//   if (err) {
//     return console.error("Connection Error", err);
//   }
//   client.query(`SELECT count(id) FROM famous_people WHERE first_name ILIKE "$1%"`, [someName])
//     .then(results => {
//       client.end()
//       console.log(results)
//     })
//     .catch(err => {
//       client.end()
//       return console.log(err)
//     })
//   });



// client.query("SELECT $1::int AS number", ["1"], (err, result) => {
//   if (err) {
//     return console.error("error running query", err);
//   }
//   console.log(result.rows[0].number); //output: 1
//   client.end();
// });
