import { format, formatDistanceToNow } from "date-fns"

export const formatTxHash = (txHash: string) => {
  return `${txHash.slice(0, 13)}...`
}

export const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(address.length - 5)}`
}

export const formatTimeStamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000)

  const formattedDate = format(date, "PPpppp")
  const formattedDistance = formatDistanceToNow(date, {
    addSuffix: true,
  })

  return `${formattedDistance} (${formattedDate})`
}

export const formatAge = (timestamp: number | string) => {
  if (typeof timestamp === "number") {
    return formatDistanceToNow(new Date(timestamp * 1000), {
      addSuffix: true,
    })
  }
  if (typeof timestamp === "string") {
    const parsedTimestamp = Date.parse(timestamp)
    return formatDistanceToNow(new Date(parsedTimestamp), {
      addSuffix: true,
    })
  }
}
