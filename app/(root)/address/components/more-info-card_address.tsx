import { checkIfContract, getContractDeployer } from "@/actions/get-contract"
import { getFirstOrLastTx } from "@/actions/get-first-and-last-tx"
import { Card } from "@/components/ui/card"
import { formatAge, formatTxHash } from "@/lib/formatting"
import { isAddress } from "ethers"
import Link from "next/link"

interface MoreInfoCardAddressProps {
  address: string
}

const MoreInfoCardAddress: React.FC<MoreInfoCardAddressProps> = async ({
  address,
}) => {
  const lastTx = await getFirstOrLastTx(address, "descending")
  const firstTx = await getFirstOrLastTx(address, "ascending")

  return (
    <Card className="p-4 space-y-4 text-sm md:w-1/2">
      <h1 className="text-base font-semibold">More Info</h1>
      {/* Last tx Sent */}
      <div>
        <p className="text-gray-600 dark:text-gray-400">LAST TXN SENT</p>
        {!lastTx ? (
          <div>No Transactions found for this address</div>
        ) : (
          <div className="items-baseline gap-1 sm:flex">
            <Link
              href={`/tx/${lastTx?.hash}`}
              className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600"
            >
              {lastTx && formatTxHash(lastTx.hash)}
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {lastTx && formatAge(lastTx.timeStamp)}
            </p>
          </div>
        )}
      </div>
      {/* First tx Sent */}
      <div>
        <p className="text-gray-600 dark:text-gray-400">FIRST TXN SENT</p>
        {!firstTx ? (
          <div>No Transactions found for this address</div>
        ) : (
          <div className="items-baseline gap-1 sm:flex">
            <Link
              href={`/tx/${firstTx?.hash}`}
              className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600"
            >
              {formatTxHash(firstTx?.hash!)}
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {firstTx && formatAge(firstTx.timeStamp)}
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
export default MoreInfoCardAddress
