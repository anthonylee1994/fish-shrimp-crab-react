import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import { useBetContractStore } from "hooks/useBetContractStore";
import { useWalletStore } from "hooks/useWalletStore";
import { ethers } from "ethers";
import { Dice } from "./Dice";

export const Dish = React.memo(() => {
  const isConnected = useWalletStore((state) => state.isConnected);
  const betAmountMap = useBetContractStore((state) => state.betAmountMap);
  const poolLiquidity = useBetContractStore((state) => state.poolLiquidity);
  const bet = useBetContractStore((state) => state.bet);
  const lastOpen = useBetContractStore((state) => state.lastOpen);
  const hasPoolLiquidity = poolLiquidity
    ? Number(ethers.utils.formatEther(poolLiquidity)) !== 0
    : false;

  const hasBetAmount = !Object.values(betAmountMap).every(
    (amount) => amount === 0
  );

  const disabled = !isConnected || !hasPoolLiquidity || !hasBetAmount;

  if (lastOpen) {
    return (
      <Flex
        p={2}
        mb={2}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        w="full"
        bg="gray.100"
        borderRadius="lg"
      >
        <Text mt={1} fontSize="lg" textAlign="center" fontWeight="bold">
          <FormattedMessage id="bet.result" />
        </Text>
        <Flex>
          {lastOpen.map((betType, key) => (
            <Dice key={key} betType={betType} />
          ))}
        </Flex>
        <Button
          m={2}
          colorScheme="red"
          onClick={() => useBetContractStore.setState({ lastOpen: null })}
        >
          <FormattedMessage id="bet.again" />
        </Button>
      </Flex>
    );
  }

  return (
    <Box
      userSelect="none"
      opacity={disabled ? 0.5 : 1}
      cursor={disabled ? "not-allowed" : "pointer"}
      mb={2}
      height="100px"
      overflow="hidden"
      onClick={disabled ? undefined : bet}
      _active={
        disabled ? undefined : { transform: "rotate(180deg)", opacity: 0.5 }
      }
      transition="200ms ease-in-out"
    >
      <Box
        d="flex"
        justifyContent="center"
        w="200px"
        height="200px"
        bg="red.100"
        borderTopLeftRadius="full"
        borderTopRightRadius="full"
        border="solid 3px"
        borderColor="red.500"
      >
        <Text
          fontFamily="cwTeXKai, serif"
          color="red.500"
          mt="5px"
          fontSize="7xl"
          fontWeight="bold"
        >
          <FormattedMessage id="bet.open" />
        </Text>
      </Box>
    </Box>
  );
});
