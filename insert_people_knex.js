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

// knex('famous_people').insert({first_name: somefName, last_name: somelName, birthdate: somebday}).then(r => console.log("Inserted")).catch(err => {throw err})
knex('famous_people').insert({first_name: somefName, last_name: somelName, birthdate: somebday}).returning('*').catch(err => {throw err})
