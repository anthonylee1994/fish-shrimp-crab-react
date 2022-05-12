import { BigNumber, ethers } from "ethers";

export const formatAmount = (amount: BigNumber): string => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
  }).format(Number(ethers.utils.formatEther(amount)));
};
