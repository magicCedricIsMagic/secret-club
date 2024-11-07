#! /usr/bin/env node
require("dotenv").config()

const { Client } = require("pg")

const SQL = `
  CREATE TABLE IF NOT EXISTS membership_statuses (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , name VARCHAR (50) NOT NULL
    , slug VARCHAR (50) NOT NULL
  );

  INSERT INTO membership_statuses (name, slug) 
  VALUES
    ('Inscrit non validé', 'unvalidated')
    , ('Membre', 'member')
    , ('Administrateur', 'admin')
  ;

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , name VARCHAR (100) NOT NULL
    , surname VARCHAR (100) NOT NULL
    , photo_url TEXT
    , color VARCHAR (100)
    , membership_status_id INTEGER NOT NULL
    , CONSTRAINT FK_User_MembershipStatus FOREIGN KEY(membership_status_id) REFERENCES membership_statuses(id)
  );

  CREATE TABLE IF NOT EXISTS user_credentials (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , mail VARCHAR (100) NOT NULL
    , password VARCHAR (100) NOT NULL
    , user_id INTEGER NOT NULL
    , CONSTRAINT FK_UserCredential_User FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , text TEXT NOT NULL
    , date TIMESTAMP NOT NULL DEFAULT NOW()
    , user_id INTEGER NOT NULL
    , CONSTRAINT FK_Message_User FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );
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
