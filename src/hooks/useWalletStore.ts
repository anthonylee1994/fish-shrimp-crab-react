import create from "zustand";
import { BigNumber, ethers } from "ethers";
import { MetaMaskInpageProvider } from "@metamask/providers";

interface WalletStore {
  isLoading: boolean;
  isBookmaker: boolean;
  isConnected: boolean;
  chainId: string | null;
  walletAddress: string | null;
  walletBalance: BigNumber | null;
  provider: ethers.providers.Web3Provider;
  refreshWalletBalance: (walletAddress: string) => Promise<void>;
  connectWallet: () => Promise<void>;
  onChainChanged: () => void;
  onAccountsChanged: (accounts: string[]) => Promise<void>;
}

export const useWalletStore = create<WalletStore>((set, get) => ({
  isLoading: false,
  isConnected: false,
  isBookmaker: false,
  chainId: null,
  walletAddress: null,
  walletBalance: null,
  provider: new ethers.providers.Web3Provider((window as any).ethereum),
  refreshWalletBalance: async (walletAddress: string) => {
    if (!walletAddress) {
      return;
    }
    const { provider } = get();
    const walletBalance = await provider.getBalance(walletAddress);
    set({ walletBalance });
  },
  connectWallet: async () => {
    set({ isLoading: true });
    const ethereum = (window as any).ethereum as MetaMaskInpageProvider;
    const accounts = await (
      (window as any).ethereum as MetaMaskInpageProvider
    ).request<string[]>({
      method: "eth_requestAccounts",
    });

    const walletAddress = accounts?.[0];
    const { refreshWalletBalance } = get();

    if (walletAddress) {
      set({
        walletAddress,
        chainId: ethereum.chainId,
        isConnected: true,
        isBookmaker: process.env.REACT_APP_BOOKMAKER_ADDRESS === walletAddress,
      });
      await refreshWalletBalance(walletAddress);
    }

    set({ isLoading: false });
  },
  onAccountsChanged: async (accounts: string[]) => {
    set({ isLoading: true });
    const walletAddress = accounts?.[0];
    if (walletAddress) {
      set({
        walletAddress,
        chainId: (window as any).ethereum.chainId,
        isBookmaker: process.env.REACT_APP_BOOKMAKER_ADDRESS === walletAddress,
      });
      const { refreshWalletBalance } = get();
      await refreshWalletBalance(walletAddress);
    } else {
      set({
        walletAddress: null,
        chainId: null,
        walletBalance: null,
        isConnected: false,
        isBookmaker: false,
      });
    }
    set({ isLoading: false });
  },
  onChainChanged: () => {
    window.location.reload();
  },
}));
