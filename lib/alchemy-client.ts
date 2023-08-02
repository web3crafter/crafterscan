import { Network, Alchemy } from "alchemy-sdk"

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
}

export const alchemyClient = new Alchemy(settings)
