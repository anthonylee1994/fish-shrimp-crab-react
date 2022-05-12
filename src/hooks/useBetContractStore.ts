import create from "zustand";
import { BigNumber, ethers } from "ethers";
import { BetType } from "types/BetType";
import BetGameContract from "contracts/BetGameContract.json";
import { useWalletStore } from "./useWalletStore";

interface BetContractStore {
  isLoading: boolean;
  poolLiquidity: BigNumber | null;
  provider: ethers.providers.Web3Provider;
  contract: ethers.Contract;
  lastOpen: [BetType, BetType, BetType] | null;
  betAmountMap: Record<BetType, number>;
  setBetAmount: (betType: BetType, amount: number) => void;
  resetBetAmounts: () => void;
  bet: () => void;
  fetchLiquidity: () => void;
  addLiquidity: (value: BigNumber) => Promise<void>;
  takeLiquidity: () => Promise<void>;
}

const provider = new ethers.providers.Web3Provider((window as any).ethereum);

export const useBetContractStore = create<BetContractStore>((set, get) => ({
  provider,
  isLoading: false,
  poolLiquidity: null,
  lastOpen: null,
  betAmountMap: {
    [BetType.FISH]: 0,
    [BetType.SHRIMP]: 0,
    [BetType.GOURD]: 0,
    [BetType.COIN]: 0,
    [BetType.CRAB]: 0,
    [BetType.ROOSTER]: 0,
  },
  contract: (() => {
    const signer = provider.getSigner();
    return new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS!,
      BetGameContract.abi,
      signer
    );
  })(),
  fetchLiquidity: async () => {
    set({ isLoading: true });
    const { contract } = get();
    const poolLiquidity = await contract.getLiquidity();
    set({ poolLiquidity, isLoading: false });
  },
  addLiquidity: async (value: BigNumber) => {
    try {
      set({ isLoading: true });
      const { contract, fetchLiquidity } = get();
      await (await contract.addLiquidity({ value })).wait();
      const { refreshWalletBalance, walletAddress } = useWalletStore.getState();
      if (walletAddress) {
        await refreshWalletBalance(walletAddress);
      }
      await fetchLiquidity();
      set({ isLoading: false });
    } catch (e) {
      set({ isLoading: false });
    }
  },
  takeLiquidity: async () => {
    try {
      set({ isLoading: true });
      const { contract, fetchLiquidity } = get();
      await (await contract.takeLiquidity()).wait();

      const { refreshWalletBalance, walletAddress } = useWalletStore.getState();
      if (walletAddress) {
        await refreshWalletBalance(walletAddress);
      }
      await fetchLiquidity();
      set({ isLoading: false });
    } catch (e) {
      set({ isLoading: false });
    }
  },
  setBetAmount: (betType: BetType, amount: number) => {
    const { betAmountMap } = get();
    set({ betAmountMap: { ...betAmountMap, [betType]: amount } });
  },
  resetBetAmounts: () => {
    set({
      betAmountMap: {
        [BetType.FISH]: 0,
        [BetType.SHRIMP]: 0,
        [BetType.GOURD]: 0,
        [BetType.COIN]: 0,
        [BetType.CRAB]: 0,
        [BetType.ROOSTER]: 0,
      },
    });
  },
  bet: async () => {
    const { contract, betAmountMap, resetBetAmounts, fetchLiquidity } = get();
    const totalBetAmount = Object.values(betAmountMap).reduce(
      (acc, x) => acc + x,
      0
    );
    const tx = await contract.bet(
      [
        ethers.utils.parseEther(`${betAmountMap[BetType.FISH] || 0}`),
        ethers.utils.parseEther(`${betAmountMap[BetType.SHRIMP] || 0}`),
        ethers.utils.parseEther(`${betAmountMap[BetType.GOURD] || 0}`),
        ethers.utils.parseEther(`${betAmountMap[BetType.COIN] || 0}`),
        ethers.utils.parseEther(`${betAmountMap[BetType.CRAB] || 0}`),
        ethers.utils.parseEther(`${betAmountMap[BetType.ROOSTER] || 0}`),
      ],
      {
        value: ethers.utils.parseEther(`${totalBetAmount}`),
        gasLimit: 9000000,
      }
    );
    await tx.wait();
    const lastOpen = await contract.getLastDrawResult();
    set({
      lastOpen: [
        lastOpen.firstDigit.toNumber(),
        lastOpen.secondDigit.toNumber(),
        lastOpen.thirdDigit.toNumber(),
      ],
    });
    resetBetAmounts();
    const { refreshWalletBalance, walletAddress } = useWalletStore.getState();
    await fetchLiquidity();
    if (walletAddress) {
      await refreshWalletBalance(walletAddress);
    }
  },
}));
