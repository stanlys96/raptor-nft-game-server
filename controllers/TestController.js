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

  static async getInjuredRaptor(req, res, next) {
    try {
      const data = await Test.getInjuredRaptor();
      res.status(200).json(data.rows[0]);
    } catch (err) {
      console.log(err);
    }
  }

  static async getFighters(req, res, next) {
    try {
      const data = await Test.getFighters();
      res.status(200).json(data.rows[0]);
    } catch (err) {
      console.log(err);
    }
  }

  static async getFightWinner(req, res, next) {
    try {
      const data = await Test.getFightWinner();
      res.status(200).json(data.rows[0]);
    } catch (err) {
      console.log(err);
    }
  }

  static async getTop3(req, res, next) {
    try {
      const data = await Test.getTop3();
      res.status(200).json(data.rows[0]);
    } catch (err) {
      console.log(err);
    }
  }

  static async getQPWinner(req, res, next) {
    try {
      const data = await Test.getQPWinner();
      res.status(200).json(data.rows[0]);
    } catch (err) {
      console.log(err);
    }
  }

  static async getCompWinner(req, res, next) {
    try {
      const data = await Test.getCompWinner();
      res.status(200).json(data.rows[0]);
    } catch (err) {
      console.log(err);
    }
  }

  static async getDRWinner(req, res, next) {
    try {
      const data = await Test.getDRWinner();
      res.status(200).json(data.rows[0]);
    } catch (err) {
      console.log(err);
    }
  }

  static async getRipRaptor(req, res, next) {
    try {
      const data = await Test.getRipRaptor();
      res.status(200).json(data.rows[0]);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = TestController;