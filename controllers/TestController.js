const res = require('express/lib/response');
const Test = require('../models/Test');

class TestController {
  static async getTestData() {
    try {
      const data = await Test.getTransferData();
      if (data.rowCount > 0) {
        res.status(200).json(data.rows[0]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async insertTestData(req, res, next) {
    try {
      const newData = await Test.insertTransferData(req.body);
      res.status(200).json({ ...newData.rows[0], message: "Success" });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = TestController;