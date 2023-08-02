import { alchemyClient } from "@/lib/alchemy-client"

export const checkIfContract = async (address: string) => {
  try {
    const result = await alchemyClient.core.isContractAddress(address)
    return result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`ADDRESS: CHECK_IF_CONTRACT: ${error.message}`)
    }
  }
}

export const getContractDeployer = async (address: string) => {
  try {
    const result = await alchemyClient.core.findContractDeployer(address)
    return result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`ADDRESS: GET_CONTRACT_DEPLOYER: ${error.message}`)
    }
  }
}

export const getContractCode = async (address: string) => {
  try {
    const result = await alchemyClient.core.getCode(address)
    return result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`ADDRESS: GET_CONTRACT_CODE: ${error.message}`)
    }
  }
}
