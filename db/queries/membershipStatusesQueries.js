const pool = require("../pool")

async function getAllMembershipStatuses() {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM membership_statuses
      ORDER BY id
    `)
    return rows
  }
  catch (error) {
    console.error("error", error)
  }
}

async function getMembershipStatus(id) {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM membership_statuses
      WHERE membership_statuses.id = $1
    `, [id])
    return rows[0]
  }
  catch (error) {
    console.error("error", error)
  }
}


module.exports = {
  getAllMembershipStatuses,
  getMembershipStatus,
}