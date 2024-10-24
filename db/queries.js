const pool = require("./pool")

async function getAllMessages() {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM messages
      ORDER BY id
    `)
    return rows
  }
  catch (error) {
    console.error("error", error)
  }
}

async function getMessage(id) {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM messages
      WHERE messages.id = $1
    `, [id])
    return rows[0]
  }
  catch (error) {
    console.error("error", error)
  }
}

async function getLastMessage() {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM messages
      ORDER BY id DESC
      LIMIT 1
    `)
    return rows[0]
  }
  catch (error) {
    console.error("error", error)
  }
}

async function addMessage(message) {
  try {
    await pool.query(`
      INSERT INTO messagess (author, text)
      VALUES ($1, $2)
    `, [message.author, message.text])

    const newMessage = await getLastMessage(message.id)
    return newMessage
  }
  catch (error) {
    console.error("error", error)
  }
}

async function updateMessage(message) {
  try {
    await pool.query(`
      UPDATE messages
      SET author = $2 
        , text = $3
      WHERE id = $1
    `, [message.id, message.author, message.text])

    const newMessage = await getMessage(message.id)
    return newMessage
  }
  catch (error) {
    console.error("error", error)
  }
}

async function deleteMessage(id) {
  try {
    await pool.query(`
      DELETE FROM messages 
      WHERE id = $1
    `, [id])
  }
  catch (error) {
    console.error("error", error)
  }
}

async function deleteAllMessages() {
  try {
    await pool.query(`
      DELETE FROM messages
    `)
  }
  catch (error) {
    console.error("error", error)
  }
}


module.exports = {
  getAllMessages,
  getMessage,
  getLastMessage,
  addMessage,
  updateMessage,
  deleteMessage,
  deleteAllMessages,
}