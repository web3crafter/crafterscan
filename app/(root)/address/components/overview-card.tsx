import { Utils } from "alchemy-sdk"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ImageOff } from "lucide-react"
import { FaEthereum } from "react-icons/fa"

import { getBalance } from "@/actions/get-balance"
import { getTokens } from "@/actions/get-tokens"
import { IEthPrice } from "@/types/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Suspense } from "react"

export const revalidate = 60

const getEthPrice = async (): Promise<IEthPrice> => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true",
    {
      next: { revalidate: 60 * 15 },
    }
  )
  if (!response.ok) {
    console.log("Failed to fetch ETH Price")
  }
  return response.json()
}

const fetchBalance = async (address: string) => {
  const balance = await getBalance(address)
  return balance
}

interface OverviewCardProps {
  address: string
}

const OverviewCard: React.FC<OverviewCardProps> = async ({ address }) => {
  const balance = await fetchBalance(address)
  const fetchedEthPrice = await getEthPrice()
  const ethPrice = fetchedEthPrice.ethereum.usd

  const tokens = await getTokens(address)
  if (!balance || !tokens) {
    return null
  }

  return (
    <Card className="p-4 space-y-4 text-sm md:w-1/2">
      <h1 className="text-base font-semibold">Overview</h1>
      {/* ETH Balance */}
      <div>
        <p className="text-gray-600 dark:text-gray-400">ETH BALANCE</p>
        <div className="flex items-center">
          <FaEthereum />
          {/* <Suspense fallback={<p>Loading Balance</p>}> */}
          <p className="">{Utils.formatEther(balance)} ETH</p>
          {/* </Suspense> */}
        </div>
      </div>
      {/* ETH Value */}
      <div>
        <p className="text-gray-600 dark:text-gray-400">ETH VALUE</p>
        <div className="flex">
          <p className="">
            {(Number(Utils.formatEther(balance)) * ethPrice).toLocaleString()}{" "}
            (@ ${ethPrice.toLocaleString()}/ETH)
          </p>
        </div>
      </div>
      {/* Token Holdings */}
      {tokens.length !== 0 && (
        <div>
          <p className="text-gray-600 dark:text-gray-400">TOKEN HOLDINGS</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-full">
                <div className="flex items-center justify-between w-full">
                  <p>{tokens?.length} Tokens</p>
                  <ChevronDown />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <ScrollArea className="px-2 h-80 sm:w-80">
                {tokens &&
                  tokens.map((token) => (
                    <Link
                      href={`/address/${token.contractAddress}`}
                      key={token.contractAddress}
                    >
                      <div className="py-1 text-sm border-b">
                        <div>
                          <div className="flex items-center w-full">
                            <div className="flex items-center space-x-1">
                              {token.logo ? (
                                <div className="relative w-4 h-4 rounded-full">
                                  <Image
                                    src={token.logo}
                                    alt="logo"
                                    fill
                                    className="object-contain rounded-full"
                                  />
                                </div>
                              ) : (
                                <ImageOff className="w-4 h-4 rounded-full " />
                              )}
                              <p>{token.name}</p>
                              <p>{token.symbol}</p>
                            </div>
                            {/* <p className="text-orange-600">$value</p> */}
                          </div>

                          <div className="flex items-center w-full">
                            <div className="flex items-center space-x-1">
                              <p className="">{token.balance}</p>
                              <p>{token.symbol}</p>
                            </div>
                            {/* <p className="text-orange-600">@$value</p> */}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </Card>
  )
}
export default OverviewCard
