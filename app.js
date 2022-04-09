const express = require('express');
const app = express();
const cors = require('cors');
const { ethers } = require("ethers");
const ABI = require('./ABI.json');
const router = require('./routes');
const Test = require('./models/Test');

require("dotenv").config();

// 0x61d804C9567e498d929f942d60a7Db3362834E29
const contractAddress = "0x61d804C9567e498d929f942d60a7Db3362834E29";

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA);

const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const Contract = new ethers.Contract(contractAddress, ABI, signer);

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

app.listen(PORT, () => {
  Contract.on("Transfer", async (a, b, c) => {
    const newData = await Test.insertTransferData({ sender: a, receiver: b, value: c.toString() });
    console.log(newData);
  })
});