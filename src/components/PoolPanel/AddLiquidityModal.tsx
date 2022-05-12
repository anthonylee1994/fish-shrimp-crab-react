import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import { AmountInput } from "components/AmountInput";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number) => void;
}

export const AddLiquidityModal = React.memo<Props>(
  ({ isOpen, onClose, onSubmit }) => {
    const [amount, setAmount] = React.useState(0);

    React.useEffect(() => {
      if (isOpen) {
        setAmount(0);
      }
    }, [isOpen]);

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <FormattedMessage id="pool.add.liquidity" />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AmountInput value={amount} setValue={setAmount} />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} variant="ghost" onClick={onClose}>
              <FormattedMessage id="action.cancel" />
            </Button>
            <Button
              disabled={amount === 0}
              colorScheme="red"
              onClick={() => onSubmit(amount)}
            >
              <FormattedMessage id="action.confirm" />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
);
