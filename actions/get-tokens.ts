import { alchemyClient } from "@/lib/alchemy-client"

export const getTokens = async (address: string) => {
  try {
    const tokensForOwner = await alchemyClient.core.getTokensForOwner(address)

    const weirdNames = /^[!@$()]/
    const filteredTokens = tokensForOwner.tokens.filter((token) => {
      return !weirdNames.test(token.name!) && !weirdNames.test(token.symbol!)
    })

    const tokens = filteredTokens.map((token) => {
      const balance = (
        Number(token.rawBalance) / Math.pow(10, token.decimals!)
      ).toFixed(3)
      return {
        name: token.name,
        contractAddress: token.contractAddress,
        symbol: token.symbol,
        balance,
        logo: token.logo,
      }
    })

    return tokens
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`ADDRESS: GET_META_DATA:: ${error.message}`)
    }
  }
}

// export const getMetadata = async (address: string) => {
//   try {
//     const balances = await alchemyClient.core.getTokenBalances(address)

//     const nonZeroTokenBalances = await Promise.all(
//       balances.tokenBalances
//         .filter((token) => {
//           return token.tokenBalance !== "0"
//         })
//         .map(async (token) => {
//           return Promise.all([
//             token,
//             alchemyClient.core.getTokenMetadata(token.contractAddress),
//           ])
//         })
//     )

//     const weirdNames = /^[!@$()]/
//     const filteredTokens = nonZeroTokenBalances.filter(([, metadata]) => {
//       return (
//         metadata?.name !== null &&
//         metadata?.symbol !== null &&
//         !weirdNames.test(metadata.name) &&
//         !weirdNames.test(metadata.symbol)
//       )
//     })

//     const tokenBalances = filteredTokens.map(
//       ([{ tokenBalance, contractAddress }, metadata]) => {
//         const balance = (
//           Number(tokenBalance) / Math.pow(10, metadata.decimals!)
//         ).toFixed(2)
//         return {
//           name: metadata.name,
//           contractAddress: contractAddress,
//           symbol: metadata.symbol,
//           balance,
//           logo: metadata.logo,
//         }
//       }
//     )
//     return tokenBalances
//   } catch (error) {
//     console.log("getMetadata:", error)
//   }
// }
