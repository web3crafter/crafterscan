import { TokenMetadataResponse } from "alchemy-sdk"

export interface IEthPrice {
  ethereum: {
    usd: number
    usd_24h_change: number
  }
}

export interface IEthPriceInUsdAndBtc {
  ethereum: {
    usd: number
    usd_market_cap: number
    usd_24h_change: number
    btc: number
    btc_market_cap: number
    btc_24h_change: number
  }
}

export interface IAddressTransaction {
  hash: string
  blockNumber: number | undefined
  age: string | undefined
  from: string
  to: string | undefined
  value: string | number
  symbol?: string
}

export interface ITransactionInBlock {
  hash: string
  blockNumber: number | undefined
  age: string | undefined
  from: string
  to: string | undefined
  value: string | number
  // symbol?: string
}

export interface ITransfer {
  hash: string
  timeStamp: number
}

export interface ITransferData {
  from: string
  to: string
  metadata: TokenMetadataResponse
  contractAddress: string
  amount: string
}

//TODO: Not used?
export interface IMetaData {
  name: string | null
  contractAddress: string
  symbol: string | null
  balance: string
  logo: string | null
}
