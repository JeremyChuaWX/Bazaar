import { Flex } from "@chakra-ui/react";
import AddToWatchListButton from "src/components/common/ui/AddToWatchlistButton/AddToWatchlistButton";
import BuyButton from "./BuyButton";

const ActiveListingComponent = ({ item, user }) => {
  return (
    <Flex direction="row" w="100%" gap={3}>
      <BuyButton item={item} width="full" />
      {user && <AddToWatchListButton item={item} variant="ghost" />}
    </Flex>
  );
};

export default ActiveListingComponent;
