const pool = require("../pool")

async function getAllUsers() {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM users
      ORDER BY id
    `)
    return rows
  }
  catch (error) {
    console.error("error", error)
  }
}

async function getUser(id) {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM users
      WHERE users.id = $1
    `, [id])
    return rows[0]
  }
  catch (error) {
    console.error("error", error)
  }
}

async function getLastUser() {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM users
      ORDER BY id DESC
      LIMIT 1
    `)
    return rows[0]
  }
  catch (error) {
    console.error("error", error)
  }
}

async function addUser(user) {
  try {
    await pool.query(`
      INSERT INTO users (
        name
        , surname
        , photo_url
        , color
        , membership_status_id
      )
      VALUES ($1, $2, $3, $4, $5)
    `, [
      user.name,
      user.surname,
      user.photo_url,
      user.color,
      user.membership_status_id,
    ])

    const newUser = await getLastUser(user.id)
    return newUser
  }
  catch (error) {
    console.error("error", error)
  }
}

async function updateUser(user) {
  try {
    await pool.query(`
      UPDATE users
      SET name = $2
        , surname = $3
        , photo_url = $5
        , color = $6
        , membership_status_id = $4
      WHERE id = $1
    `, [
      user.id,
      user.name,
      user.surname,
      user.photo_url,
      user.color,
      user.membership_status_id,
    ])

    const newUser = await getUser(user.id)
    return newUser
  }
  catch (error) {
    console.error("error", error)
  }
}

async function deleteUser(id) {
  try {
    await pool.query(`
      DELETE FROM users 
      WHERE id = $1
    `, [id])
  }
  catch (error) {
    console.error("error", error)
  }
}

async function deleteAllUsers() {
  try {
    await pool.query(`
      DELETE FROM users
    `)
  }
  catch (error) {
    console.error("error", error)
  }
}


module.exports = {
  getAllUsers,
  getUser,
  getLastUser,
  addUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
}