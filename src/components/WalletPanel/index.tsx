import React from "react";
import { FormattedMessage } from "react-intl";
import { Box, Button, Flex, Skeleton, Text } from "@chakra-ui/react";
import { useWalletStore } from "hooks/useWalletStore";
import { Amount } from "components/Amount";

const { ethereum } = window as any;

export const WalletPanel = React.memo(() => {
  const isLoading = useWalletStore((state) => state.isLoading);
  const isConnected = useWalletStore((state) => state.isConnected);
  const connectWallet = useWalletStore((state) => state.connectWallet);
  const walletAddress = useWalletStore((state) => state.walletAddress);
  const walletBalance = useWalletStore((state) => state.walletBalance);
  const chainId = useWalletStore((state) => state.chainId);
  const onAccountsChanged = useWalletStore((state) => state.onAccountsChanged);
  const onChainChanged = useWalletStore((state) => state.onChainChanged);

  React.useEffect(() => {
    ethereum.on("accountsChanged", onAccountsChanged);
    ethereum.on("chainChanged", onChainChanged);
  }, [onAccountsChanged, onChainChanged]);

  return (
    <Box d="flex" flexDirection="column" borderRadius="md" w="full">
      <Box px={2}>
        <Skeleton isLoaded={!isLoading}>
          <Text fontSize="sm" mb={2}>
            <strong>
              <FormattedMessage id="wallet.address" />:{" "}
            </strong>
            {walletAddress || "-"}
          </Text>
          <Flex justifyContent="space-between" mb={2}>
            <Text fontSize="sm">
              <strong>
                <FormattedMessage id="wallet.chainId" />:{" "}
              </strong>
              {chainId || "-"}
            </Text>
            <Text fontSize="sm">
              <strong>
                <FormattedMessage id="wallet.balance" />:{" "}
              </strong>
              <Amount value={walletBalance} />
            </Text>
          </Flex>
        </Skeleton>
      </Box>
      <Button
        mt={2}
        isLoading={isLoading}
        disabled={isConnected || isLoading}
        onClick={connectWallet}
        colorScheme="red"
      >
        <FormattedMessage id={`wallet.connect${isConnected ? "ed" : ""}`} />
      </Button>
    </Box>
  );
});
