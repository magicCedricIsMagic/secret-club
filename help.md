## Initialisation projet
`pnpm init` 
<br>
`pnpm install express`
<br>
`touch .gitignore` ou `echo ".env" "node_modules" > .gitignore` ou `printf ".env\nnode_modules" > .gitignore`

<br>

## PostgreSql
| Commande                     | Détails                                               |
| ---------------------------- | ----------------------------------------------------- |
| `psql`                       | Enter the PostgreSQL shell                            |
| `\l`                         | View the current dbs                                  |
| `\c top_users`               | Connect to the db named `top_users`                   |
| `\d`                         | View the tables                                       |
| `\d+ usernames`              | Describe the table `usernames`                        |
| `SELECT * FROM usernames;`   | Check the table `usernames`                           |
| `\c postgres`                | Reconnect to the default postgres db                  |
| `DROP TABLE usernames;`      | ⚠ Delete the table named `usernames`                  |
| `DROP DATABASE top_users;`   | ⚠⚠ Delete the db named `top_users` and all its tables |
| `CREATE DATABASE top_users;` | Create a db named `top_users`                         |
| `\q`                         | Quit the PostgreSQL shell                             |