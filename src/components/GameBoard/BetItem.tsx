import React from "react";
import { GridItem, theme } from "@chakra-ui/react";
import { BetIcon } from "./BetIcon";
import { BetType } from "types/BetType";
import { AmountInput } from "components/AmountInput";

interface Props {
  betType: BetType;
  value: number;
  setValue: (value: number) => void;
}

export const BetItem = React.memo<Props>(({ betType, value, setValue }) => {
  return (
    <GridItem
      p={4}
      d="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      border={`solid 1px ${theme.colors.red[300]}`}
    >
      <BetIcon betType={betType} />
      <AmountInput value={value} setValue={setValue} />
    </GridItem>
  );
});
