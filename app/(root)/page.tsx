import { getBlock, getBlockNumber } from "@/actions/get-block"
import { Card } from "@/components/ui/card"
import { Container, ContainerInner } from "@/components/ui/container"
import { Separator } from "@/components/ui/separator"
import { formatAge, formatTxHash } from "@/lib/formatting"
import { cn } from "@/lib/utils"
import { IEthPrice, IEthPriceInUsdAndBtc } from "@/types/types"
import { Box, FileText, Globe } from "lucide-react"
import Link from "next/link"
import { FaEthereum } from "react-icons/fa"

const getEthPrice = async (): Promise<IEthPriceInUsdAndBtc> => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd%2Cbtc&include_market_cap=true&include_24hr_change=true"
  )

  if (!response.ok) {
    console.log("Failed to fetch ETH Price")
  }
  return response.json()
}

const fetchLastBlock = async () => {
  const blockNumber = await getBlockNumber()
  const block = blockNumber && (await getBlock(blockNumber))
  return block
}

export default async function Home() {
  const ethPriceData = await getEthPrice()
  const block = await fetchLastBlock()

  if (!block) return null

  return (
    <Container>
      <ContainerInner className="rounded-lg">
        <Card className="items-center p-2 space-x-2 sm:mx-4 lg:flex h-fit">
          <div className="space-y-4 basis-1/2">
            <div className="items-center space-x-2 sm:flex">
              <div className="text-gray-600 dark:text-gray-500">
                <FaEthereum size={30} />
              </div>
              <div className="">
                <p className="text-gray-600 dark:text-gray-400">ETHER PRICE</p>
                <div className="space-x-1 sm:flex">
                  <p>${ethPriceData.ethereum.usd.toLocaleString()}</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    @ {ethPriceData.ethereum.btc.toFixed(5)} BTC
                  </p>
                  <p
                    className={cn(
                      ethPriceData.ethereum.btc_24h_change < 0
                        ? "text-red-600"
                        : "text-green-500"
                    )}
                  >
                    ({ethPriceData.ethereum.btc_24h_change.toFixed(2)}%)
                  </p>
                </div>
              </div>
            </div>
            <Separator />
            {/* MarketCap */}
            <div className="flex items-center space-x-2">
              <div className="text-gray-600 dark:text-gray-500">
                <Globe size={30} />
              </div>
              <div className="">
                <p className="text-gray-600 dark:text-gray-400">MARKET CAP</p>
                <p>${ethPriceData.ethereum.usd_market_cap.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <Separator orientation="vertical" className="hidden h-28 lg:block" />
          <Separator className="my-4 lg:hidden" />
          {/* Last block */}
          <div className="space-y-4 basis-1/2">
            <div className="flex items-center space-x-2">
              <div className="text-gray-600 dark:text-gray-500">
                <Box size={30} />
              </div>
              <div className="">
                <p className="text-gray-600 dark:text-gray-400">LAST BLOCK</p>
                <div className="items-baseline space-x-1 sm:flex">
                  <Link
                    href={`/block/${block.number}`}
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600"
                  >
                    {block.number}{" "}
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatAge(block.timestamp)}...
                  </p>
                </div>
              </div>
            </div>
            <Separator />
            {/* Last transaction */}
            <div className="flex items-center space-x-2">
              <div className="text-gray-600 dark:text-gray-500">
                <FileText size={30} />
              </div>
              <div className="">
                <p className="text-gray-600 dark:text-gray-400">
                  LAST TRANSACTION
                </p>
                <div className="items-baseline space-x-1 sm:flex">
                  <Link
                    href={`/tx/${block.transactions[0]}`}
                    className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600"
                  >
                    {formatTxHash(block.transactions[0])}
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatAge(block.timestamp)}...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </ContainerInner>
    </Container>
  )
}
