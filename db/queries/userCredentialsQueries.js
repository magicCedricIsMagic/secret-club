const pool = require("../pool")

async function getAllUserCredentials() {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM user_credentials
      ORDER BY id
    `)
    return rows
  }
  catch (error) {
    console.error("error", error)
  }
}

async function getUserCredential(id) {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM user_credentials
      WHERE user_credentials.id = $1
    `, [id])
    return rows[0]
  }
  catch (error) {
    console.error("error", error)
  }
}

async function getUserCredentialByUserId(userId) {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM user_credentials
      WHERE user_credentials.user_id = $1
    `, [userId])
    return rows[0]
  }
  catch (error) {
    console.error("error", error)
  }
}

async function getUserCredentialByMail(mail) {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM user_credentials
      WHERE user_credentials.mail = $1
    `, [mail])
    return rows[0]
  }
  catch (error) {
    console.error("error", error)
  }
}

async function getLastUserCredential() {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM user_credentials
      ORDER BY id DESC
      LIMIT 1
    `)
    return rows[0]
  }
  catch (error) {
    console.error("error", error)
  }
}

async function addUserCredential(userCredential) {
  try {
    await pool.query(`
      INSERT INTO user_credentials (
        mail
        , password
        , user_id
      )
      VALUES ($1, $2, $3)
    `, [
      userCredential.mail,
      userCredential.password,
      userCredential.user_id,
    ])

    const newUserCredential = await getLastUserCredential()
    return newUserCredential
  }
  catch (error) {
    console.error("error", error)
  }
}

async function updateUserCredential(user) {
  try {
    await pool.query(`
      UPDATE user_credentials
      SET mail = $2
        , password = $3
      WHERE id = $1
    `, [
      user.id,
      user.mail,
      user.password,
    ])

    const newUserCredential = await getUserCredential(user.id)
    return newUserCredential
  }
  catch (error) {
    console.error("error", error)
  }
}

async function deleteUserCredential(id) {
  try {
    await pool.query(`
      DELETE FROM user_credentials 
      WHERE id = $1
    `, [id])
  }
  catch (error) {
    console.error("error", error)
  }
}

async function deleteAllUserCredentials() {
  try {
    await pool.query(`
      DELETE FROM user_credentials
    `)
  }
  catch (error) {
    console.error("error", error)
  }
}


module.exports = {
  getAllUserCredentials,
  getUserCredential,
  getUserCredentialByUserId,
  getUserCredentialByMail,
  getLastUserCredential,
  addUserCredential,
  updateUserCredential,
  deleteUserCredential,
  deleteAllUserCredentials,
}