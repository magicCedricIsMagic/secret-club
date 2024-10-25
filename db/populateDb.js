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
    ('Guest', 'guest')
    , ('Unvalidated member', 'unvalidated')
    , ('Member', 'member')
    , ('Administrator', 'admin')
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


  INSERT INTO users (
    name
    , surname
    , photo_url
    , color
    , membership_status_id
  ) 
  VALUES (
    'Gallon'
    , 'Cédric'
    , 'https://www.magic-cedric.fr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbonjour-2.b72b5234.png&w=828&q=75'
    , '#344cb7'
    , '1'
  );

  INSERT INTO user_credentials (
    mail
    , password
    , user_id
  ) 
  VALUES (
    'cedrictravailletresdur@gmail.com'
    , 'toto'
    , '1'
  );

  INSERT INTO messages (
    text
    , user_id
  ) 
  VALUES (
    'Bonjour.'
    , '1'
  );

`

/*
INSERT INTO users (
  mail
  , password
  , name
  , surname
  , photo_url
  , color
  , membership_status_id
) 
VALUES (
  'cedrictravailletresdur@gmail.com'
  , 'toto'
  , 'Cédric'
  , 'Gallon'
  , 'https://www.magic-cedric.fr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbonjour-2.b72b5234.png&w=828&q=75'
  , '#344cb7'
  , '1'
);

INSERT INTO messages (
  text
  , user_id
) 
VALUES (
  'Bonjour.'
  , '1'
);
*/


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
