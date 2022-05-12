import { BigNumber } from "ethers";
import React from "react";
import { formatAmount } from "utils/formatAmount";

interface Props {
  value: BigNumber | null;
}

export const Amount = React.memo<Props>(({ value }) => {
  if (value === null || value === undefined) {
    return <React.Fragment>-</React.Fragment>;
  }

  return (
    <React.Fragment>
      {formatAmount(value)} <strong>ETH</strong>
    </React.Fragment>
  );
});
