// const pg = require("pg");
const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database,
    port: settings.port,
    ssl: settings.ssl
  }
});

const somefName = process.argv[2]
const somelName = process.argv[3]
const somebday = process.argv[4]

// function returnString(err, output) {
//   if (err) {
//     return console.error("Connection Error", err);
//   }
//   console.log("Found", output.length, "person(s) by the name '" + someName + "':")

//   for (let i = 0; i < output.length; i++) {
//     console.log("- " + (i + 1) + ":", output[i].first_name, output[i].last_name + ", born '" + output[i].birthdate.toLocaleDateString() + "'")
//   }
//   knex.destroy()
// }

// console.log('Searching ...')
// knex.select().from('famous_people').where('first_name', 'like', someName).orWhere('last_name', 'like', someName)
//   .asCallback(function (err, rows) {
//     if (err) returnString(err);
//     returnString(null, rows)
//   });


knex('famous_people').insert({first_name: somefName, last_name: somelName, birthdate: somebday}).then(r => console.log("Inserted"))


//   knex.connect((err) => {
//     if (err) {
//       cb(err)
//     }
//     knex.query("SELECT * FROM famous_people WHERE first_name LIKE $1::text OR lasPault_name LIKE $1::text", [someName], (err, result) => {
//       console.log("Searching ...")
//       if (err) {
//         return console.error("error running query", err);
//       }
//       cb(null, result.rows)
//     });
//   });
// }

// searcher(returnString)
