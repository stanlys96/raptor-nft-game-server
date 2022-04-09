const express = require('express');
const app = express();
const cors = require('cors');
const { ethers } = require("ethers");
const ABI = require('./ABI.json');
const router = require('./routes');
const Test = require('./models/Test');

require("dotenv").config();

const contractAddress = "0x3AcFEF594E443012371822ed507d32B807008dc7";

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
    const newData = await Test.insertTestData({ sender: a, receiver: b, value: c });
    console.log(newData);
  })
});