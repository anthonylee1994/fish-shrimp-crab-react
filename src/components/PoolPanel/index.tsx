import React from "react";
import { Box, Button, Flex, Skeleton, Text } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import { useBetContractStore } from "hooks/useBetContractStore";
import { Amount } from "components/Amount";
import { ethers } from "ethers";
import { useWalletStore } from "hooks/useWalletStore";
import { AddLiquidityModal } from "./AddLiquidityModal";

export const PoolPanel = React.memo(() => {
  const isLoading = useBetContractStore((state) => state.isLoading);
  const poolLiquidity = useBetContractStore((state) => state.poolLiquidity);
  const fetchLiquidity = useBetContractStore((state) => state.fetchLiquidity);
  const addLiquidity = useBetContractStore((state) => state.addLiquidity);
  const takeLiquidity = useBetContractStore((state) => state.takeLiquidity);
  const isConnected = useWalletStore((state) => state.isConnected);
  const isBookmaker = useWalletStore((state) => state.isBookmaker);
  const [isAddLiquidityModalVisible, setAddLiquidityModalVisible] =
    React.useState(false);

  React.useEffect(() => {
    fetchLiquidity();
  }, [fetchLiquidity]);

  const openAddLiquidityModal = React.useCallback(() => {
    setAddLiquidityModalVisible(true);
  }, []);

  const closeAddLiquidityModal = React.useCallback(() => {
    setAddLiquidityModalVisible(false);
  }, []);

  const onAddLiquidity = React.useCallback(
    (amount: number) => {
      addLiquidity(ethers.utils.parseEther(String(amount)));
      closeAddLiquidityModal();
    },
    [addLiquidity, closeAddLiquidityModal]
  );

  return (
    <React.Fragment>
      <Box d="flex" flexDirection="column" borderRadius="md" w="full" mb={2}>
        <Skeleton borderRadius="md" isLoaded={!isLoading}>
          <Text fontSize="sm" mb={2}>
            <strong>
              <FormattedMessage id="pool.amount" />:{" "}
            </strong>
            <Amount value={poolLiquidity} />
          </Text>
        </Skeleton>
        <Flex gap={2}>
          <Button
            mt={2}
            w="full"
            disabled={!isConnected || isLoading}
            colorScheme="red"
            variant="outline"
            onClick={openAddLiquidityModal}
          >
            <FormattedMessage id="pool.add.liquidity" />
          </Button>
          {isBookmaker && (
            <Button
              mt={2}
              w="full"
              disabled={
                isLoading ||
                !isConnected ||
                (poolLiquidity
                  ? Number(ethers.utils.formatEther(poolLiquidity)) === 0
                  : false)
              }
              colorScheme="green"
              onClick={takeLiquidity}
            >
              <FormattedMessage id="pool.take.liquidity" />
            </Button>
          )}
        </Flex>
      </Box>
      <AddLiquidityModal
        isOpen={isAddLiquidityModalVisible}
        onClose={closeAddLiquidityModal}
        onSubmit={onAddLiquidity}
      />
    </React.Fragment>
  );
});
