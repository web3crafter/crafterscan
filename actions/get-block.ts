import { alchemyClient } from "@/lib/alchemy-client"

export const getBlock = async (blockNumber: number) => {
  try {
    const block = await alchemyClient.core.getBlock(blockNumber)
    if (!block) {
      throw new Error(`Failed to fetch block: ${blockNumber}`)
    }
    return block
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`BLOCK: GET_BLOCK: ${error.message}`)
    }
  }
}

export const getBlockWithTransactions = async (blockNumber: number) => {
  try {
    const block = await alchemyClient.core.getBlockWithTransactions(blockNumber)
    if (!block) {
      throw new Error(`Failed to fetch block: ${blockNumber}`)
    }
    return block
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`BLOCK: GET_BLOCK_WITH_TRANSACTIONS: ${error.message}`)
    }
  }
}

export const getBlockNumber = async () => {
  try {
    const blockNumber = await alchemyClient.core.getBlockNumber()
    if (!blockNumber) {
      throw new Error(`Failed to fetch block number`)
    }
    return blockNumber
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`BLOCK: GET_BLOCK_NUMBER: ${error.message}`)
    }
  }
}
