const pool = require('../database/db');

class Test {
  static async getTransferData() {
    try {
      const data = await pool.query("SELECT * FROM test;");
      return data.rows;
    } catch (e) {
      console.log(e);
    }
  }

  static async insertTransferData(data) {
    try {
      let { sender, receiver, value } = data;
      const existingData = await pool.query("SELECT * FROM test;");
      if (existingData.rowCount == 0) {
        const newData = await pool.query("INSERT INTO test (sender, receiver, value) VALUES ($1, $2, $3) RETURNING *;", [sender, receiver, value]);
        return { ...newData.rows[0], message: "Success!" };
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Test;