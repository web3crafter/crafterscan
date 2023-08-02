import { alchemyClient } from "@/lib/alchemy-client"
import { AssetTransfersCategory, SortingOrder } from "alchemy-sdk"

export const getTransfers = async (address: string) => {
  if (address.length !== 42) {
    console.log("getFirstAndLastTx: Not a valid address")
  }

  try {
    const fetchedTransfers = await alchemyClient.core.getAssetTransfers({
      fromAddress: address,
      category: [
        AssetTransfersCategory.ERC1155,
        AssetTransfersCategory.ERC20,
        AssetTransfersCategory.ERC721,
        AssetTransfersCategory.EXTERNAL,
        AssetTransfersCategory.INTERNAL,
        AssetTransfersCategory.SPECIALNFT,
      ],
      order: SortingOrder.DESCENDING,
      withMetadata: true,
    })

    return fetchedTransfers
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`TRANSACTIONS: GET_ASSET_TRANSFERS: ${error.message}`)
    }
  }
}
