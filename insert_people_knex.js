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

const newFirstName = process.argv[2]
const newLastName = process.argv[3]
const newBirthday = process.argv[4]

// knex('famous_people').insert({first_name: newFirstName, last_name: newLastName, birthdate: newBirthday}).then(r => console.log("Inserted")).catch(err => {throw err})
knex('famous_people').insert({first_name: newFirstName, last_name: newLastName, birthdate: newBirthday}).returning('*').catch(err => {throw err})
