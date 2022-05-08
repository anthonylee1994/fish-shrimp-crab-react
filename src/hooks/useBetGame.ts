import { ethers } from "ethers";
import React from "react";
import BetGame from "../artifacts/contracts/bet-game.sol/BetGame.json";

const { ethereum } = window as any;

export const useBetGame = () => {
  const fetchGreetings = React.useCallback(async () => {
    let contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
    const provider = new ethers.providers.Web3Provider(ethereum);
    const gasPrice = await provider.getGasPrice();
    console.log("gasPrice", gasPrice);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, BetGame.abi, signer);

    await (
      await contract.addLiquidity({
        value: ethers.utils.parseEther("100"),
      })
    ).wait();

    await (
      await contract.bet(
        [
          ethers.utils.parseEther("1"),
          ethers.utils.parseEther("1"),
          0,
          0,
          0,
          0,
        ],
        {
          value: ethers.utils.parseEther("2"),
        }
      )
    ).wait();

    const lastOpen = await contract.getLastDrawResult();

    console.log("lastOpen", lastOpen);
  }, []);
};
