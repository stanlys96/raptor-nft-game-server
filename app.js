const express = require('express');
const app = express();
const cors = require('cors');
const { ethers } = require("ethers");
const ABI = require('./ABI.json');
const router = require('./routes');
const Test = require('./models/Test');
const minterABI = require("./minterABI.json");
const gameABI = require("./gameABI.json");
const CronJob = require("cron").CronJob;

require("dotenv").config();

const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA);

let private = process.env.PRIVATE

let wallet = new ethers.Wallet(private, provider)

const contractAddress = "0x84b9C760b375699044fe9C3A602e9FB7a522849A";

const minterAddress = "0x0bEB509f56429D1794f206913A94eB4A2318B56f";

// const signer = new ethers.Wallet(private, provider);

const InfoContract = new ethers.Contract(contractAddress, ABI, provider);

const Contract = new ethers.Contract(contractAddress, gameABI, wallet)

const MinterContract = new ethers.Contract(minterAddress, minterABI, wallet);

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

// const job = new CronJob(
//   "*/30 * * * * *",
//   () => {
//     console.log("A");
//   },
//   null,
//   true,
//   "Asia/Jakarta"
// );

app.listen(PORT, () => {
  Contract.enterRaptorIntoComp(10, { gasPrice: 35000000000, gasLimit: 1000000, value: ethers.utils.parseEther("0.005") })
    .then((res) => {
      console.log(res);
      Contract.getCurrentQueue()
        .then(async (resasd)  =>  {
          const ajsdlkajsdk = await Test.updateCurrentQueue(resasd);
          console.log(ajsdlkajsdk);
        })
        .catch((err) => {
          console.log(err);
        })
    })
    .catch((err) => {
      console.log(err);
    })

  // Contract.raceSelect(1, { gasPrice: 35000000000, gasLimit: 1000000 })
  //   .then(async (res) => {
  //     await res.wait(1);
  //     console.log(res);
  //     console.log(res.value.toString());
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })

  // MinterContract.updateGameAddress(contractAddress, { gasPrice: 35000000000, gasLimit: 1000000 })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })

  Contract.on("RaceChosen", async (a) => {
    console.log(a);
    const asd = await Test.updateCurrentRace(a);
    console.log(asd);
  })

  Contract.on("QPRandomRequested", async (a) => {
    console.log("Quick play starts!");
  })

});