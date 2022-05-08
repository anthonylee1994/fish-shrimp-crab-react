import React from "react";
const { ethereum } = window as any;

export const App = React.memo(() => {
  const connectWallet = React.useCallback(async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <div onClick={connectWallet}>111</div>;
});
