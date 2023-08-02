import Link from "next/link"
import { Utils } from "alchemy-sdk"
import { Clock } from "lucide-react"

import { getBlock } from "@/actions/get-block"
import { formatTimeStamp } from "@/lib/formatting"

import { Container, ContainerInner } from "@/components/ui/container"
import { CopyButton } from "@/components/ui/copy-button"
import { Separator } from "@/components/ui/separator"
import { Title } from "@/components/ui/title"
import { blockToolTipText } from "@/constants/tooltips"
import BlockNotFound from "@/app/(root)/block/components/block-not-found"
import PageHeading from "@/components/ui/page-heading"
import ChangeBlockButton from "@/app/(root)/block/components/change-block-button"

const BlockPage = async ({ params }: { params: { blockNumber: string } }) => {
  const block = await getBlock(Number(params.blockNumber))

  // if (!block?.baseFeePerGas) {
  //   return <BlockNotFound failedBlockNumber={params.blockNumber} />
  // }

  if (!block) {
    return <BlockNotFound failedBlockNumber={params.blockNumber} />
  }

  return (
    <Container>
      <PageHeading page="Block" value={block.number.toString()} />
      <ContainerInner className="space-y-8 text-sm">
        {/* Block Height */}
        <div className="lg:flex lg:items-center">
          <Title
            title="Block Height"
            description={blockToolTipText.blockHeight}
          />
          <div className="flex items-center space-x-2">
            <p className="break-all">{block.number}</p>
            <ChangeBlockButton blockNumber={params.blockNumber} />
          </div>
        </div>
        {/* Timestamp */}
        <div className="sm:flex">
          <Title title="Timestamp" description={blockToolTipText.timestamp} />
          <div className="flex items-center space-x-1">
            <Clock size={15} />
            <p className="">{formatTimeStamp(block.timestamp)}</p>
          </div>
        </div>

        <Separator />
        {/* Transactions */}
        <div className="md:flex lg:items-center">
          <Title
            title="Transactions"
            description={blockToolTipText.transaction}
          />
          <div className="flex items-center space-x-2">
            <Link
              href={`/block/transactions/${block.number}`}
              className="text-blue-600 break-all hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600"
            >
              {block.transactions.length} transactions
            </Link>
            <p> in this block</p>
          </div>
        </div>
        {/* Fee Recipient */}
        <div className="md:flex lg:items-center">
          <Title
            title="Fee Recipient"
            description={blockToolTipText.feeRecipient}
          />
          <div className="flex items-center space-x-2">
            <Link
              href={`/address/${block.miner}`}
              className="text-blue-600 break-all hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600"
            >
              {block.miner}
            </Link>
            <CopyButton textToCopy={block.miner} />
          </div>
        </div>
        <Separator />
        {/* Gas Used */}
        <div className="sm:flex">
          <Title title="Gas Used" description={blockToolTipText.gasUsed} />
          <div className="flex items-center space-x-1">
            <p className="">
              {Number(Utils.formatUnits(block.gasUsed, "wei")).toLocaleString()}
            </p>
            <p className="text-gray-500">
              (
              {(
                (Number(Utils.formatUnits(block.gasUsed, "wei")) /
                  Number(Utils.formatUnits(block.gasLimit, "wei"))) *
                100
              ).toFixed(2)}
              % )
            </p>
          </div>
        </div>
        {/* Gas Limit */}
        <div className="sm:flex">
          <Title title="Gas Limit" description={blockToolTipText.gasLimit} />
          <div className="flex items-center space-x-1">
            <p className="">
              {Number(
                Utils.formatUnits(block.gasLimit, "wei")
              ).toLocaleString()}
            </p>
          </div>
        </div>
        {/* Base Fee Per Gas */}
        {block.baseFeePerGas && (
          <>
            <div className="sm:flex">
              <Title
                title="Base Fee Per Gas"
                description={blockToolTipText.baseFeePerGas}
              />
              <div className="flex items-center space-x-1">
                <p>{Utils.formatEther(block.baseFeePerGas!)} ETH</p>
                <p className="text-gray-500">
                  (
                  {Number(
                    Utils.formatUnits(block.baseFeePerGas!, "wei")
                  ).toLocaleString()}{" "}
                  Gwei)
                </p>
              </div>
            </div>
            {/* Burnt Fees */}

            <div className="sm:flex">
              <Title
                title="Burnt Fees"
                description={blockToolTipText.burntFees}
              />
              <div className="flex items-center space-x-1">
                <div>🔥</div>
                <p>
                  {Number(Utils.formatEther(block.baseFeePerGas!)) *
                    Number(Utils.formatUnits(block.gasUsed, "wei"))}{" "}
                  ETH
                </p>
              </div>
            </div>
          </>
        )}
        <Separator />
        {/* Hash */}
        <div className="lg:flex lg:items-center">
          <Title title="Hash" description={blockToolTipText.blockHash} />
          <div className="flex items-center space-x-2">
            <p className="break-all">{block.hash}</p>
            <CopyButton textToCopy={block.hash} />
          </div>
        </div>
        {/* Parent Hash */}
        <div className="lg:flex lg:items-center">
          <Title
            title="Parent Hash"
            description={blockToolTipText.parentHash}
          />
          <div className="flex items-center space-x-2">
            <p className="break-all">{block.parentHash}</p>
            <CopyButton textToCopy={block.parentHash} />
          </div>
        </div>
      </ContainerInner>
    </Container>
  )
}
export default BlockPage
