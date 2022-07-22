import useEthersStore from "src/stores/ethersStore";
import { getWeb3 } from "src/lib/helpers";
import { useRouter } from "next/router";
import { useToastedCallback, useValidatedAddress } from "src/lib/hooks";

const useComponentState = (item) => {
  const isValidated = useValidatedAddress();
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised);
  const mktContract = useEthersStore((state) => state.mktContract);
  const router = useRouter();

  const callback = async () => {
    const web3Error = getWeb3(ethersInitialised);
    if (web3Error) throw new Error(web3Error);

    if (!isValidated)
      throw new Error("Metamask wallet does not match user's wallet");

    await (
      await mktContract.purchaseMarketItem(item.itemId, {
        value: item.marketPriceWei,
      })
    ).wait();

    router.reload();
  };

  const { toastedCallback, loading } = useToastedCallback(
    "Buying NFT",
    callback
  );

  return { toastedCallback, loading };
};

export default useComponentState;
