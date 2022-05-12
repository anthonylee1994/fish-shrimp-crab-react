import React from "react";
import { Box, ChakraProvider, Container } from "@chakra-ui/react";
import { GameBoard } from "components/GameBoard";
import { IntlProvider } from "react-intl";
import zhHK from "locales/zh-HK";
// const { ethereum } = window as any;

export const App = React.memo(() => {
  return (
    <IntlProvider locale="zh-HK" messages={zhHK}>
      <ChakraProvider>
        <Box w="100vw" h="100vh" d="flex" alignItems="center">
          <Container minW="6xl" maxW="6xl">
            <GameBoard />
          </Container>
        </Box>
      </ChakraProvider>
    </IntlProvider>
  );
});
