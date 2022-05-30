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

  static async getInjuredRaptor() {
    try {
      const data = await pool.query("SELECT * FROM injured_raptor;");
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  static async updateInjuredRaptor(res) {
    try {
      const existingData = await pool.query("SELECT * FROM injured_raptor");
      if (existingData.rowCount == 0) {
        const newData = await pool.query("INSERT INTO injured_raptor (raptor) VALUES ($1);", [res]);
        return { ...newData.rows[0], message: "Success!" };
      } else {
        const updatedData = await pool.query("UPDATE injured_raptor SET raptor = $1 WHERE id = 1 RETURNING *;", [res]);
        return { ...updatedData.rows[0], message: "Success!" };
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async getFighters() {
    try {
      const data = await pool.query("SELECT * FROM fighters;");
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  static async updateFighters(res) {
    try {
      let result = '{';
      res.forEach((item, i) => {
        if (i == res.length - 1) {
          result += item + "}";
        } else {
          result += item + ",";
        }
      });
      const data = await pool.query("SELECT * FROM fighters");
      if (data.rowCount == 0) {
        const newData = await pool.query("INSERT INTO fighters (queue) VALUES ('" + result + "') RETURNING *;");
        return { ...newData.rows[0], message: "Success!" };
      } else {
        const updatedData = await pool.query("UPDATE fighters SET raptor_fighters = $1 WHERE id = 1 RETURNING *;", [result]);
        return { ...updatedData.rows[0], message: "Success!" };
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async getFightWinner() {
    try {
      const data = await pool.query("SELECT * FROM fight_winner;");
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  static async updateFightWinner(res) {
    try {
      const existingData = await pool.query("SELECT * FROM fight_winner");
      if (existingData.rowCount == 0) {
        const newData = await pool.query("INSERT INTO fight_winner (raptor_fight_winner) VALUES ($1);", [res]);
        return { ...newData.rows[0], message: "Success!" };
      } else {
        const updatedData = await pool.query("UPDATE fight_winner SET raptor_fight_winner = $1 WHERE id = 1 RETURNING *;", [res]);
        return { ...updatedData.rows[0], message: "Success!" };
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async getTop3() {
    try {
      const data = await pool.query("SELECT * FROM top_3;");
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  static async updateTop3(res) {
    try {
      let result = '{';
      res.forEach((item, i) => {
        if (i == res.length - 1) {
          result += item + "}";
        } else {
          result += item + ",";
        }
      });
      const data = await pool.query("SELECT * FROM top_3");
      if (data.rowCount == 0) {
        const newData = await pool.query("INSERT INTO top_3 (raptor_top_3) VALUES ('" + result + "') RETURNING *;");
        return { ...newData.rows[0], message: "Success!" };
      } else {
        const updatedData = await pool.query("UPDATE top_3 SET raptor_top_3 = $1 WHERE id = 1 RETURNING *;", [result]);
        return { ...updatedData.rows[0], message: "Success!" };
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async getQPWinner() {
    try {
      const data = await pool.query("SELECT * FROM quick_play_winner;");
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  static async updateQPWinner(res) {
    try {
      const existingData = await pool.query("SELECT * FROM quick_play_winner");
      if (existingData.rowCount == 0) {
        const newData = await pool.query("INSERT INTO quick_play_winner (qp_winner) VALUES ($1);", [res]);
        return { ...newData.rows[0], message: "Success!" };
      } else {
        const updatedData = await pool.query("UPDATE quick_play_winner SET qp_winner = $1 WHERE id = 1 RETURNING *;", [res]);
        return { ...updatedData.rows[0], message: "Success!" };
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async getCompWinner() {
    try {
      const data = await pool.query("SELECT * FROM competitive_winner;");
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  static async updateCompWinner(res) {
    try {
      const existingData = await pool.query("SELECT * FROM competitive_winner");
      if (existingData.rowCount == 0) {
        const newData = await pool.query("INSERT INTO competitive_winner (comp_winner) VALUES ($1);", [res]);
        return { ...newData.rows[0], message: "Success!" };
      } else {
        const updatedData = await pool.query("UPDATE competitive_winner SET comp_winner = $1 WHERE id = 1 RETURNING *;", [res]);
        return { ...updatedData.rows[0], message: "Success!" };
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async getDRWinner() {
    try {
      const data = await pool.query("SELECT * FROM death_race_winner;");
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  static async updateDRWinner(res) {
    try {
      const existingData = await pool.query("SELECT * FROM death_race_winner");
      if (existingData.rowCount == 0) {
        const newData = await pool.query("INSERT INTO death_race_winner (dr_winner) VALUES ($1);", [res]);
        return { ...newData.rows[0], message: "Success!" };
      } else {
        const updatedData = await pool.query("UPDATE death_race_winner SET dr_winner = $1 WHERE id = 1 RETURNING *;", [res]);
        return { ...updatedData.rows[0], message: "Success!" };
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async getRipRaptor() {
    try {
      const data = await pool.query("SELECT * FROM rip_raptor;");
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  static async updateRipRaptor(res) {
    try {
      const existingData = await pool.query("SELECT * FROM rip_raptor");
      if (existingData.rowCount == 0) {
        const newData = await pool.query("INSERT INTO rip_raptor (raptor_gone) VALUES ($1);", [res]);
        return { ...newData.rows[0], message: "Success!" };
      } else {
        const updatedData = await pool.query("UPDATE rip_raptor SET raptor_gone = $1 WHERE id = 1 RETURNING *;", [res]);
        return { ...updatedData.rows[0], message: "Success!" };
      }
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Test;