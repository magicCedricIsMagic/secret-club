#! /usr/bin/env node
require("dotenv").config()

const { Client } = require("pg")

const SQL = `
  DROP TABLE messages;
  DROP TABLE user_credentials;
  DROP TABLE users;
  DROP TABLE membership_statuses;
`

async function main() {
  console.log("emptying…")
  const client = new Client({
    connectionString: process.env.DB_CONNECTION_STRING,
  })
  await client.connect()
  await client.query(SQL)
  await client.end()
  console.log("done")
}

main()
