import { Button } from "@chakra-ui/react";
import useEthersStore from "src/stores/ethersStore";
import useSuccessToast from "src/lib/hooks/useSuccessToast";
import { formatAddress } from "src/lib/helpers";
import { useToastedCallback } from "src/lib/hooks";

const WalletHandlerButton = (props) => {
  const address = useEthersStore((state) => state.address);
  const connectEthers = useEthersStore((state) => state.connectEthers);
  const disconnectEthers = useEthersStore((state) => state.disconnectEthers);
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);
  const successToast = useSuccessToast("Handle wallet");

  const callBack = async () => {
    if (ethersInitialised) {
      await disconnectEthers();
      successToast({
        description: "Wallet disconnected successfully",
      });
    } else {
      await connectEthers();
      successToast({
        description: "Wallet connected successfully",
      });
    }
  };

  const { toastedCallback, loading } = useToastedCallback(
    "Handle wallet",
    callBack,
    false
  );

  return (
    <Button onClick={toastedCallback} isLoading={loading} {...props}>
      {address ? formatAddress(address) : "Connect Wallet"}
    </Button>
  );
};

export default WalletHandlerButton;
