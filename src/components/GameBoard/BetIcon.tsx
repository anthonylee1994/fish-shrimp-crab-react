import React from "react";
import { Icon } from "@chakra-ui/react";
import {
  GiFlatfish,
  GiShrimp,
  GiRooster,
  GiCrab,
  GiPerfumeBottle,
} from "react-icons/gi";
import { RiCopperCoinLine } from "react-icons/ri";
import { BetType } from "types/BetType";

interface Props {
  betType: BetType;
  size?: number;
}

export const BetIcon = React.memo<Props>(({ betType, size }) => {
  switch (betType) {
    case BetType.COIN:
      return (
        <Icon
          transform="rotateZ(22.5deg)"
          as={RiCopperCoinLine}
          fontSize={size || 160}
          color="purple.700"
        />
      );
    case BetType.GOURD:
      return (
        <Icon
          transform="rotateZ(135deg)"
          as={GiPerfumeBottle}
          fontSize={size || 160}
          color="purple.700"
        />
      );
    case BetType.CRAB:
      return <Icon as={GiCrab} fontSize={size || 160} color="green.500" />;
    case BetType.FISH:
      return (
        <Icon
          transform="rotateZ(120deg)"
          as={GiFlatfish}
          fontSize={size || 160}
          color="red.500"
        />
      );
    case BetType.ROOSTER:
      return (
        <Icon
          transform="rotateY(-180deg)"
          as={GiRooster}
          fontSize={size || 160}
          color="red.500"
        />
      );
    case BetType.SHRIMP:
      return (
        <Icon
          transform="rotateY(-180deg) rotateZ(-40deg)"
          as={GiShrimp}
          fontSize={size || 160}
          color="green.500"
        />
      );
  }
});
