const res = require('express/lib/response');
const Test = require('../models/Test');

class TestController {
  static async getCurrentQueue(req, res, next) {
    try {
      const data = await Test.getCurrentQueue();
      res.status(200).json(data.rows[0]);
    } catch (err) {
      console.log(err);
    }
  }

  static async getCurrentRace(req, res, next) {
    try {
      const data = await Test.getCurrentRace();
      res.status(200).json(data.rows[0]);
    } catch (err) {
      console.log(err);
    }
  }

  static async updateCurrentQueue(req, res, next) {
    try {
      const data = await Test.updateCurrentQueue(res.body);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  }

  static async updateCurrentRace(req, res, next) {
    try {
      const data = await Test.updateCurrentRace(res.body);
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  }

  static async getTestData(req, res, next) {
    try {
      const data = await Test.getTransferData();
      res.status(200).json(data.rows[0]);
    } catch (err) {
      console.log(err);
    }
  }

  static async insertTestData(req, res, next) {
    try {
      const newData = await Test.insertTransferData(req.body);
      res.status(200).json({ ...newData, message: "Success" });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = TestController;