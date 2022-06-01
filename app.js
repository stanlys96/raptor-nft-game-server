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

const myAddress = "0x1c5B16a273f65BfB580087f5250B03D64d83218F";

// const signer = new ethers.Wallet(private, provider);

const InfoContract = new ethers.Contract(contractAddress, ABI, provider);

const Contract = new ethers.Contract(contractAddress, gameABI, wallet)

const MinterContract = new ethers.Contract(minterAddress, minterABI, wallet);

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

const job = new CronJob(
  "*/30 * * * * *",
  () => {
    Contract.getCurrentQueue()
      .then(async (a)  =>  {
        const result = await Test.updateCurrentQueue(a);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      })
  },
  null,
  true,
  "Asia/Jakarta"
);

app.listen(PORT, () => {

  // Contract.raceSelect(1, { gasPrice: 35000000000, gasLimit: 1000000 })
  // .then(async (res) => {
  //   await res.wait(1);
  //   console.log(res);
  //   console.log(res.value.toString());
  // })
  // .catch((err) => {
  //   console.log(err);
  // })

  // Contract.enterRaptorIntoDR(1, { gasPrice: 35000000000, gasLimit: 1000000, value: ethers.utils.parseEther("0.025") })
  //   .then((res) => {
  //       Contract.enterRaptorIntoDR(2, { gasPrice: 35000000000, gasLimit: 1000000, value: ethers.utils.parseEther("0.025") })
  //       .then((res) => {
  //           Contract.enterRaptorIntoDR(3, { gasPrice: 35000000000, gasLimit: 1000000, value: ethers.utils.parseEther("0.025") })
  //           .then((res) => {
  //               Contract.enterRaptorIntoDR(4, { gasPrice: 35000000000, gasLimit: 1000000, value: ethers.utils.parseEther("0.025") })
  //               .then((res) => {
  //                   Contract.enterRaptorIntoDR(5, { gasPrice: 35000000000, gasLimit: 1000000, value: ethers.utils.parseEther("0.025") })
  //                   .then((res) => {
  //                       Contract.enterRaptorIntoDR(6, { gasPrice: 35000000000, gasLimit: 1000000, value: ethers.utils.parseEther("0.025") })
  //                       .then((res) => {
  //                         Contract.enterRaptorIntoDR(8, { gasPrice: 35000000000, gasLimit: 1000000, value: ethers.utils.parseEther("0.025") })
  //                         .then((res) => {
                            // Contract.enterRaptorIntoQuickPlay(8, { gasPrice: 35000000000, gasLimit: 1000000, value: ethers.utils.parseEther("0.001") })
                            // .then((res) => {
                            //   console.log(res);
                            // })
                            // .catch((err) => {
                            //   console.log(err);
                            // })
  //                         })
  //                         .catch((err) => {
  //                           console.log(err);
  //                         })
  //                       })
  //                       .catch((err) => {
  //                         console.log(err);
  //                       })
  //                   })
  //                   .catch((err) => {
  //                     console.log(err);
  //                   })
  //               })
  //               .catch((err) => {
  //                 console.log(err);
  //               })
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           })
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })

  // MinterContract.walletOfOwner(myAddress)
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((res) => {
  //     console.log(res);
  //   })

  // MinterContract.updateGameAddress(contractAddress, { gasPrice: 35000000000, gasLimit: 1000000 })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })

  Contract.on("RaceChosen", async (a) => {
    console.log("RACE CHOSEN");
    console.log(a);
    const b = await Test.updateCurrentRace(a);
    console.log(b);
    const c = await Test.updateInjuredRaptor(0);
    const d = await Test.updateFightWinner(0);
    const e = await Test.updateFighters([0, 0]);
    const f = await Test.updateTop3([0, 0, 0]);
    const g = await Test.updateQPWinner(0);
    const h = await Test.updateCompWinner(0);
    const i = await Test.updateDRWinner(0);
    const j = await Test.updateRipRaptor(0);
  })

  Contract.on("QPRandomRequested", async (a) => {
    console.log("Quick play starts!");
  })

  Contract.on("CompRandomRequested", async (a) => {
    console.log("COMP RANDOM REQUESTED");
  })

  Contract.on("DRRandomRequested", async (a) => {
    console.log("DR RANDOM REQUESTED");
  })

  Contract.on("InjuredRaptor", async (a) => {
    console.log("INJURED RAPTOR");
    console.log(a);
    const result = await Test.updateInjuredRaptor(parseInt(a));
    console.log(result);
    const b = await Test.updateCurrentRace("None");
  })

  Contract.on("FightWinner", async (a) => {
    console.log("FIGHT WINNER");
    console.log(a);
    const result = await Test.updateFightWinner(parseInt(a));
    console.log(result);
  })

  Contract.on("Fighters", async (a) => {
    console.log("FIGHTERS");
    console.log(a);
    const result = await Test.updateFighters(a);
    console.log(result);
  })

  Contract.on("Top3", async (a) => {
    console.log("TOP 3");
    console.log(a);
    const result = await Test.updateTop3(a);
    console.log(result);
  })

  Contract.on("QuickPlayRaceWinner", async (a) => {
    console.log("QUICK PLAY WINNER");
    console.log(a);
    const result = await Test.updateQPWinner(parseInt(a));
    console.log(result);
  })

  Contract.on("CompetitiveRaceWinner", async (a) => {
    console.log("COMPETITIVE WINNER");
    console.log(a);
    const result = await Test.updateCompWinner(parseInt(a));
    console.log(result);
  })

  Contract.on("DeathRaceWinner", async (a) => {
    console.log("DEATH RACE WINNER");
    console.log(a);
    const result = await Test.updateDRWinner(parseInt(a));
    console.log(result);
  })

  Contract.on("RipRaptor", async (a) => {
    console.log("RIP RAPTOR");
    console.log(a);
    const b = await Test.updateCurrentRace("None");
    const result = await Test.updateRipRaptor(parseInt(a));
    console.log(result);
  });

});