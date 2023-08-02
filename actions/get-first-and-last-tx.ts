import { getBlock } from "@/actions/get-block"
import { alchemyClient } from "@/lib/alchemy-client"
import { ITransfer } from "@/types/types"
import { AssetTransfersCategory, SortingOrder } from "alchemy-sdk"

export const getFirstOrLastTx = async (address: string, order: string) => {
  try {
    const fetchedTransfer = await alchemyClient.core.getAssetTransfers({
      fromAddress: address,
      maxCount: 1,
      category: [
        AssetTransfersCategory.ERC1155,
        AssetTransfersCategory.ERC20,
        AssetTransfersCategory.ERC721,
        AssetTransfersCategory.EXTERNAL,
        AssetTransfersCategory.INTERNAL,
        AssetTransfersCategory.SPECIALNFT,
      ],
      order:
        order === "descending"
          ? SortingOrder.DESCENDING
          : SortingOrder.ASCENDING,
    })

    if (fetchedTransfer.transfers[0].blockNum) {
      const block = await getBlock(
        Number(fetchedTransfer.transfers[0].blockNum)
      )

      if (block) {
        const transfer: ITransfer = {
          hash: fetchedTransfer.transfers[0].hash,
          timeStamp: block.timestamp,
        }
        return transfer
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`GET_FIRST_AND_LAST_TX: ${error.message}`)
    }
  }
}
