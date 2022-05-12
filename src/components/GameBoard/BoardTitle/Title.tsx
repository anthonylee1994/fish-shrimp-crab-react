import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";

export const Title = React.memo(() => {
  return (
    <Box
      d="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mb={2}
    >
      <Text
        color="red.500"
        fontFamily="cwTeXKai, serif"
        fontSize="8xl"
        fontWeight="bold"
        lineHeight={1.2}
      >
        <FormattedMessage id="board.title" />
      </Text>
      <Text
        color="red.500"
        fontFamily="cwTeXKai, serif"
        fontSize="6xl"
        fontWeight="bold"
        lineHeight={1.2}
      >
        <FormattedMessage id="board.subtitle" />
      </Text>
    </Box>
  );
});
