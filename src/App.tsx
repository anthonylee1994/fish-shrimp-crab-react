import React from "react";
import BetGame from "./artifacts/contracts/bet-game.sol/BetGame.json";
import { ethers } from "ethers";

const { ethereum } = window as any;
export const App = React.memo(() => {
  const fetchGreetings = React.useCallback(async () => {
    let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const provider = new ethers.providers.Web3Provider(ethereum);
    const gasPrice = await provider.getGasPrice();
    console.log("gasPrice", gasPrice);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, BetGame.abi, signer);

    await contract.bet(true, { value: ethers.utils.parseEther("0.1") });
  }, []);

  const connectWallet = React.useCallback(async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      fetchGreetings();
    } catch (error) {
      console.log(error);
    }
  }, [fetchGreetings]);

  React.useEffect(() => {
    connectWallet();
  }, [connectWallet]);

  return <div>111</div>;
});
