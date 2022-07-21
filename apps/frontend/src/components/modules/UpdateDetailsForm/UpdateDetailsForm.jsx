import { Container, Flex, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { userContext } from "src/contexts/userContext";
import { formatAddress } from "src/lib/helpers";
import useEthersStore from "src/stores/ethersStore";
import AvatarComponent from "./AvatarComponent";
import BackgroundComponent from "./BackgroundComponent";
import EmailComponent from "./EmailComponent";
import NameComponent from "./NameComponent";
import PasswordComponent from "./PasswordComponent";
import WalletComponent from "./WalletComponent";

const UpdateDetailsForm = () => {
  // firestore
  const { uid, firestoreHook } = useContext(userContext);
  const { data } = firestoreHook;
  const currName = data?.name;
  const currEmail = data?.email;
  const currAddress = data ? formatAddress(data.walletAddress) : "";

  // metamask
  const ethersAddress = useEthersStore((state) => state.address);
  const metamaskAddress = ethersAddress ? formatAddress(ethersAddress) : null;

  return (
    <Container mt={20} maxW="container.xl">
      <Flex direction="column" gap="2.5rem" align="center">
        <Heading>Update Details</Heading>
        <Flex wrap="wrap" gap="2rem" w="container.lg" justify="center">
          <NameComponent uid={uid} current={currName} />
          <EmailComponent uid={uid} current={currEmail} />
          <AvatarComponent uid={uid} />
          <BackgroundComponent uid={uid} />
          <WalletComponent
            uid={uid}
            current={currAddress}
            metamask={metamaskAddress}
          />
          <PasswordComponent />
        </Flex>
      </Flex>
    </Container>
  );
};

export default UpdateDetailsForm;
