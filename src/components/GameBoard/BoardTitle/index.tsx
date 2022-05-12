import React from "react";
import { Title } from "./Title";
import {
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  theme,
} from "@chakra-ui/react";
import { WalletPanel } from "components/WalletPanel";
import { PoolPanel } from "components/PoolPanel";
import { Dish } from "components/Dish";
import { FormattedMessage } from "react-intl";

export const BoardTitle = React.memo(() => {
  return (
    <GridItem
      d="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      border={`solid 1px ${theme.colors.red[300]}`}
      colSpan={2}
      p={2}
      px={4}
    >
      <Title />
      <Dish />

      <Tabs w="full" colorScheme="red">
        <TabList>
          <Tab>
            <FormattedMessage id="metamask.wallet" />
          </Tab>
          <Tab>
            <FormattedMessage id="pool" />
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <WalletPanel />
          </TabPanel>
          <TabPanel>
            <PoolPanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </GridItem>
  );
});
