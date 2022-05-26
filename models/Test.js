const pool = require('../database/db');

class Test {
  static async getCurrentQueue() {
    try {
      const data = await pool.query("SELECT * FROM current_queue;");
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  static async updateCurrentQueue(res) {
    try {
      let result = '{';
      res.forEach((item, i) => {
        if (i == res.length - 1) {
          result += item + "}";
        } else {
          result += item + ",";
        }
      });
      const data = await pool.query("SELECT * FROM current_queue");
      if (data.rowCount == 0) {
        const newData = await pool.query("INSERT INTO current_queue (queue) VALUES ('" + result + "') RETURNING *;");
        return { ...newData.rows[0], message: "Success!" };
      } else {
        const updatedData = await pool.query("UPDATE current_queue SET queue = $1 WHERE id = 1 RETURNING *;", [result]);
        return { ...updatedData.rows[0], message: "Success!" };
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async getTransferData() {
    try {
      const data = await pool.query("SELECT * FROM test;");
      return data;
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
      } else {
        const updatedData = await pool.query("UPDATE test SET sender = $1, receiver = $2, value = $3 WHERE id = 1 RETURNING *;", [sender, receiver, value]);
        return { ...updatedData.rows[0], message: "Success!" };
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async getCurrentRace() {
    try {
      const data = await pool.query("SELECT * FROM current_race;");
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  static async updateCurrentRace(res) {
    try {
      const existingData = await pool.query("SELECT * FROM current_race");
      if (existingData.rowCount == 0) {
        const newData = await pool.query("INSERT INTO current_race (race_name) VALUES ($1);", [res]);
        return { ...newData.rows[0], message: "Success!" };
      } else {
        const updatedData = await pool.query("UPDATE current_race SET race_name = $1 WHERE id = 1 RETURNING *;", [res]);
        return { ...updatedData.rows[0], message: "Success!" };
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Test;