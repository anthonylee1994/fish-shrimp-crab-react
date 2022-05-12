import React from "react";
import { Grid, theme } from "@chakra-ui/react";
import { BetItem } from "./BetItem";
import { BoardTitle } from "./BoardTitle";
import { BetType } from "types/BetType";
import { useBetContractStore } from "hooks/useBetContractStore";

export const GameBoard = React.memo(() => {
  const betAmountMap = useBetContractStore((state) => state.betAmountMap);
  const setBetAmount = useBetContractStore((state) => state.setBetAmount);

  return (
    <Grid
      boxSizing="border-box"
      border={`double 5px ${theme.colors.red[300]}`}
      templateRows="2fr 1fr"
      templateColumns="repeat(4, 1fr)"
    >
      <BetItem
        value={betAmountMap[BetType.COIN]}
        setValue={(amount) => setBetAmount(BetType.COIN, amount)}
        betType={BetType.COIN}
      />
      <BoardTitle />
      <BetItem
        value={betAmountMap[BetType.GOURD]}
        setValue={(amount) => setBetAmount(BetType.GOURD, amount)}
        betType={BetType.GOURD}
      />
      <BetItem
        value={betAmountMap[BetType.CRAB]}
        setValue={(amount) => setBetAmount(BetType.CRAB, amount)}
        betType={BetType.CRAB}
      />
      <BetItem
        value={betAmountMap[BetType.FISH]}
        setValue={(amount) => setBetAmount(BetType.FISH, amount)}
        betType={BetType.FISH}
      />
      <BetItem
        value={betAmountMap[BetType.ROOSTER]}
        setValue={(amount) => setBetAmount(BetType.ROOSTER, amount)}
        betType={BetType.ROOSTER}
      />
      <BetItem
        value={betAmountMap[BetType.SHRIMP]}
        setValue={(amount) => setBetAmount(BetType.SHRIMP, amount)}
        betType={BetType.SHRIMP}
      />
    </Grid>
  );
});
