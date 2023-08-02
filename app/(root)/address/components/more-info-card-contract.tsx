import Link from "next/link"
import { DeployResult } from "alchemy-sdk"

import { formatAddress } from "@/lib/formatting"
import { Card } from "@/components/ui/card"
import { CopyButton } from "@/components/ui/copy-button"

interface MoreInfoCardContractProps {
  contract: DeployResult
}

const MoreInfoCardContract: React.FC<MoreInfoCardContractProps> = async ({
  contract,
}) => {
  const deployer = contract.deployerAddress
  const blockNumber = contract.blockNumber
  return (
    <Card className="p-4 space-y-4 text-sm md:w-1/2">
      <h1 className="text-base font-semibold">More Info</h1>
      <div className="flex flex-col">
        <p className="text-gray-600 dark:text-gray-400">CONTRACT CREATOR</p>
        <div className="items-baseline gap-1 sm:flex">
          <div className="flex items-center ">
            <Link
              href={`/address/${deployer}`}
              className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600"
            >
              {deployer && formatAddress(deployer)}
            </Link>
            {deployer && (
              <CopyButton textToCopy={deployer} className="w-6 h-6" />
            )}
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">at block</p>
          <Link
            href={`/block/${blockNumber}`}
            className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600"
          >
            {blockNumber}
          </Link>
        </div>
      </div>
    </Card>
  )
}
export default MoreInfoCardContract
