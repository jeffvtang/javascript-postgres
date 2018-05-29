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

const someName = process.argv[2]

function returnString(err, output) {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Found", output.length, "person(s) by the name '" + someName + "':")

  output.forEach(function (arrayitem, i) {
    console.log("- " + (i + 1) + ":", arrayitem.first_name, arrayitem.last_name + ", born '" + arrayitem.birthdate.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }) + "'")
  })
  // for (let i = 0; i < output.length; i++) {
  //   console.log("- " + (i + 1) + ":", output[i].first_name, output[i].last_name + ", born '" + output[i].birthdate.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }) + "'")
  // }
  knex.destroy()
}

console.log('Searching ...')
knex.select().from('famous_people').where('first_name', 'like', someName).orWhere('last_name', 'like', someName)
  .then(function (rows) {
    returnString(null, rows)
  })
  .catch(function (err) {
    returnString(err)
  });
