import React from "react";
import {
  InputLeftElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

interface Props {
  value: number;
  setValue: (amount: number) => void;
}

export const AmountInput = React.memo<Props>(({ value, setValue }) => {
  return (
    <NumberInput
      mt={2}
      focusBorderColor="red.300"
      min={0}
      onChange={(_, value) => setValue(value || 0)}
      value={value}
      precision={2}
      step={0.01}
    >
      <InputLeftElement
        pointerEvents="none"
        color="gray.600"
        fontSize="1.2em"
        children="ETH"
        fontWeight="bold"
        pl={3}
      />
      <NumberInputField pl={12} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
});
