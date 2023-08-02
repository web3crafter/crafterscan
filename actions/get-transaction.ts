import { getTokens } from "@/actions/get-tokens"
import { alchemyClient } from "@/lib/alchemy-client"
import { IMetaData, ITransferData } from "@/types/types"
import {
  TokenMetadataResponse,
  TransactionReceipt,
  TransactionResponse,
} from "alchemy-sdk"
import { id, getAddress, formatUnits } from "ethers"

export const getTxReceipt = async (txHash: string) => {
  try {
    const txReceipt = await alchemyClient.core.getTransactionReceipt(txHash)
    return txReceipt
  } catch (error) {
    console.log("TRANSACTION: GET_TRANSACTION_RECEIPT:", error)
  }
}

export const getTxn = async (txHash: string) => {
  try {
    const fetchedTransaction = await alchemyClient.core.getTransaction(txHash)
    return fetchedTransaction
  } catch (error) {
    console.log("TRANSACTION: GET_TRANSACTION:", error)
  }
}

export const getErcTransaction = async (txReceipt: TransactionReceipt) => {
  try {
    const transactionEvents = txReceipt.logs.filter(
      (log) => log.topics[0] === id("Transfer(address,address,uint256)")
    )

    const transactions = await Promise.all(
      transactionEvents.map(async (event) => {
        const metadata = await alchemyClient.core.getTokenMetadata(
          event.address
        )

        return {
          from: getAddress(`0x${event.topics[1].slice(26)}`),
          to: getAddress(`0x${event.topics[2].slice(26)}`),
          metadata,
          contractAddress: event.address,
          amount: metadata.decimals
            ? formatUnits(event.data, metadata.decimals)
            : "0",
        } as ITransferData
      })
    )

    if (!transactions) {
      throw new Error(
        `Failed to fetch ERC-20 transaction for tx hash: ${txReceipt.transactionHash}`
      )
    }
    return transactions
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error(`TRANSACTION: GET_ERC_TRANSACTION: ${error}`)
  }
}
