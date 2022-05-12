import { Box } from "@chakra-ui/react";
import { BetIcon } from "components/GameBoard/BetIcon";
import React from "react";
import { BetType } from "types/BetType";

interface Props {
  betType: BetType;
}

export const Dice = React.memo<Props>(({ betType }) => {
  return (
    <Box
      d="flex"
      justifyContent="center"
      alignItems="center"
      w="64px"
      h="64px"
      borderRadius="lg"
      border="solid 3px"
      borderColor="red.300"
      m={2}
    >
      <BetIcon betType={betType} size={48} />
    </Box>
  );
});
