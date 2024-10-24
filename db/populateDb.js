#! /usr/bin/env node
require("dotenv").config()

const { Client } = require("pg")

const SQL = `
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , author VARCHAR (100)
    , text TEXT NOT NULL
  );

  INSERT INTO messages (author, text) 
  VALUES
    ('Jean Dupont', 'Bonjour, mon nom est Jean Dupont.')
    , ('Jeanne Dupond', 'Salut ! Moi c''est Jeanne !')
  ;

`

async function main() {
  console.log("seeding…")
  const client = new Client({
    connectionString: process.env.DB_CONNECTION_STRING,
  })
  await client.connect()
  await client.query(SQL)
  await client.end()
  console.log("done")
}

main()
