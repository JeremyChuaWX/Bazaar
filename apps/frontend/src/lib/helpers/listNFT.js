import useEthersStore from "src/stores/ethersStore";
import { NFTContractData } from "src/contracts";
import { toWei } from "src/lib/helpers";

export default async function listNFT(tokenId, price) {
  const mktContract = useEthersStore.getState().mktContract;

  await (
    await mktContract.createMarketItem(
      NFTContractData.address,
      tokenId,
      toWei(price)
    )
  ).wait();
}
