const express = require('express');
const app = express();
const cors = require('cors');
const { ethers } = require("ethers");
const ABI = require('./ABI.json');
const router = require('./routes');
const Test = require('./models/Test');
const minterABI = require("./minterABI.json")
const gameABI = require("./gameABI.json")

require("dotenv").config();

let private = process.env.PRIVATE

let wallet = new ethers.Wallet(private, provider)

// 0x61d804C9567e498d929f942d60a7Db3362834E29
const contractAddress = "0x428f2cc41C2b70E7325D78dc911669f93Ad92729";

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA);

const signer = new ethers.Wallet(private, provider);

const InfoContract = new ethers.Contract(contractAddress, ABI, signer);

const Contract = new new ethers.Contract(contractAddress, gameABI, wallet)

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

app.listen(PORT, () => {
  Contract.getCurrentQueue()
    .then((res) => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    })
});