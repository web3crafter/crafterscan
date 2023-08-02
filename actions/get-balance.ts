import { alchemyClient } from "@/lib/alchemy-client"

export const getBalance = async (address: string) => {
  try {
    const balance = await alchemyClient.core.getBalance(address)
    return balance
  } catch (error) {
    console.log("ADDRESS: GET_BALANCE:", error)
  }
}
