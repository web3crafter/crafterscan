import { Badge } from "@/components/ui/badge"
import { ContainerInner } from "@/components/ui/container"
import { CopyButton } from "@/components/ui/copy-button"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/ui/status-badge"
import { Title } from "@/components/ui/title"
import { txToolTipText } from "@/constants/tooltips"
import { formatTimeStamp } from "@/lib/formatting"
import {
  Block,
  TransactionReceipt,
  TransactionResponse,
  Utils,
} from "alchemy-sdk"
import { Clock, Hourglass } from "lucide-react"
import Link from "next/link"
import { FaEthereum } from "react-icons/fa"

interface TransactionProps {
  txnReceipt: TransactionReceipt
  block: Block
  transactionFee: number
  valueInUSD: number
  transaction: TransactionResponse
  ethPrice: number
}
const Transaction: React.FC<TransactionProps> = ({
  txnReceipt,
  block,
  transactionFee,
  valueInUSD,
  transaction,
  ethPrice,
}) => {
  return (
    <ContainerInner className="space-y-8 text-sm">
      {/* Transaction Hash */}
      <div className="lg:flex lg:items-center">
        <Title
          title="Transaction Hash"
          description={txToolTipText.transactionHash}
        />
        <div className="flex items-center space-x-2">
          <p className="break-all">{txnReceipt?.transactionHash}</p>
          <CopyButton textToCopy={txnReceipt?.transactionHash} />
        </div>
      </div>
      {/* Status */}
      <div className="flex gap-2 sm:gap-0">
        <Title title="Status" description={txToolTipText.status} />
        <StatusBadge status={txnReceipt?.status} />
      </div>
      {/* Block */}
      <div className="sm:flex">
        <Title title="Block" description={txToolTipText.block} />
        <div className="flex gap-2">
          <div className="flex items-center space-x-1">
            <Hourglass size={15} className="dark:text-gray-200" />
            <Link
              href={`/block/${txnReceipt?.blockNumber}`}
              className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600"
            >
              {txnReceipt?.blockNumber}
            </Link>
          </div>
          <Badge variant={"default"}>
            {txnReceipt?.confirmations} Block Confirmations
          </Badge>
        </div>
      </div>
      {/* Timestamp */}
      <div className="sm:flex">
        <Title title="Timestamp" description={txToolTipText.timestamp} />
        <div className="flex items-center space-x-1">
          <Clock size={15} />
          <p className="">{block && formatTimeStamp(block.timestamp)}</p>
        </div>
      </div>

      <Separator />
      {/* From */}
      <div className="md:flex lg:items-center">
        <Title title="From" description={txToolTipText.from} />
        <div className="flex items-center space-x-2">
          <Link
            href={`/address/${txnReceipt?.from}`}
            className="text-blue-600 break-all hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600"
          >
            {txnReceipt?.from}
          </Link>
          <CopyButton textToCopy={txnReceipt?.from} />
        </div>
      </div>
      {/* To */}
      <div className="md:flex lg:items-center">
        <Title title="To" description={txToolTipText.to} />
        <div className="flex items-center space-x-2">
          <Link
            href={`/address/${txnReceipt?.to}`}
            className="text-blue-600 break-all hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600"
          >
            {txnReceipt?.to}
          </Link>
          <CopyButton textToCopy={txnReceipt?.to} />
        </div>
      </div>

      <Separator />
      {/* Value */}
      <div className="items-center sm:flex">
        <Title title="Value" description={txToolTipText.value} />
        <div className="flex items-center space-x-1">
          <FaEthereum />
          <p className="">{Utils.formatEther(transaction?.value)} ETH</p>
          <Badge>${valueInUSD.toFixed(2)}</Badge>
        </div>
      </div>
      {/* Transaction Fee */}
      <div className="items-center sm:flex">
        <Title
          title="Transaction Fee"
          description={txToolTipText.transactionFee}
        />
        <div className="flex items-center space-x-1">
          <p>{transactionFee} ETH</p>
          <Badge>
            ${transactionFee && (transactionFee * ethPrice).toFixed(2)}
          </Badge>
        </div>
      </div>
      {/* Gas Price */}
      <div className="sm:flex">
        <Title title="Gas Price" description={txToolTipText.gasPrice} />
        <div className="flex space-x-2">
          <p>
            {transaction.gasPrice &&
              Utils.formatUnits(transaction.gasPrice, "gwei")}{" "}
            Gwei
          </p>
          <p className="text-gray-500">
            ({transaction.gasPrice && Utils.formatEther(transaction.gasPrice)}{" "}
            ETH)
          </p>
        </div>
      </div>
    </ContainerInner>
  )
}
export default Transaction
