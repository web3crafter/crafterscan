import Link from "next/link"
import { Utils } from "alchemy-sdk"
import { FaEthereum } from "react-icons/fa"
import { ChevronRight, Clock, Hourglass, ImageOff } from "lucide-react"

import { getBlock } from "@/actions/get-block"
import {
  getErcTransaction,
  getTxReceipt,
  getTxn,
} from "@/actions/get-transaction"
import { IEthPrice, ITransferData } from "@/types/types"
import { formatAddress, formatTimeStamp } from "@/lib/formatting"

import { Badge } from "@/components/ui/badge"
import { Container, ContainerInner } from "@/components/ui/container"
import { CopyButton } from "@/components/ui/copy-button"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/ui/status-badge"
import { Title } from "@/components/ui/title"
import { txToolTipText } from "@/constants/tooltips"
import PageHeading from "@/components/ui/page-heading"
import NotValidTransaction from "../components/not-valid-transaction"
import Image from "next/image"

export const revalidate = 60 * 15

const getEthPrice = async (): Promise<IEthPrice> => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true",
    {
      next: { revalidate: 60 },
    }
  )
  if (!response.ok) {
    console.log("Failed to fetch ETH Price")
  }
  return response.json()
}

const fetchTransactionReceipt = async (txHash: string) => {
  const txnReceipt = await getTxReceipt(txHash)
  return txnReceipt
}

const fetchTransaction = async (txHash: string) => {
  const transaction = await getTxn(txHash)
  return transaction
}

const fetchBlock = async (blockNumber: number) => {
  const block = await getBlock(blockNumber)
  return block
}

const TransactionPage = async ({ params }: { params: { txHash: string } }) => {
  const [txnReceipt, transaction] = await Promise.all([
    fetchTransactionReceipt(params.txHash),
    fetchTransaction(params.txHash),
  ])

  if (!transaction || !txnReceipt) {
    return <NotValidTransaction txHash={params.txHash} />
  }

  let ercTransaction: ITransferData[] = []
  if (transaction.data !== "0x") {
    ercTransaction = await getErcTransaction(txnReceipt)
  }

  const block = await fetchBlock(txnReceipt.blockNumber)

  const fetchedEthPrice = await getEthPrice()
  const ethPrice = fetchedEthPrice.ethereum.usd

  const value = Utils.formatEther(transaction.value)
  const valueInUSD = ethPrice * Number(value)

  const transactionFee =
    transaction.gasPrice &&
    Number(Utils.formatUnits(transaction.gasPrice, "gwei")) *
      Number(Utils.formatUnits(txnReceipt.gasUsed, "gwei"))

  return (
    <Container>
      <PageHeading page="Transaction" value={transaction.hash} />
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
          {ercTransaction.length > 0 ? (
            <Title
              title="Interacted With (To)"
              description={txToolTipText.to}
            />
          ) : (
            <Title title="To" description={txToolTipText.to} />
          )}
          <div>
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
        </div>
        {/* ercTransfer */}
        {ercTransaction.length > 0 && (
          <>
            <Separator />
            <div className="sm:flex lg:items-center">
              <div className="flex items-center space-x-1 basis-1/4">
                <Title
                  title="ERC-20 Tokens Transferred"
                  description={txToolTipText.to}
                />
                <Badge>{ercTransaction.length}</Badge>
              </div>
              <div className="space-y-2">
                {ercTransaction.map((transfer, i) => (
                  <div className="items-center space-x-2 lg:flex" key={i}>
                    <ChevronRight className="w-4 h-4" />
                    <div className="flex space-x-1">
                      <p>From</p>
                      <Link
                        href={`/address/${transfer.from}`}
                        className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600"
                      >
                        {formatAddress(transfer.from)}
                      </Link>
                    </div>
                    <div className="flex space-x-1">
                      <p>To</p>
                      <Link
                        href={`/address/${transfer.to}`}
                        className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600"
                      >
                        {formatAddress(transfer.to)}
                      </Link>
                    </div>
                    <div className="flex space-x-1">
                      <p>For</p>
                      <p>{Number(transfer.amount).toLocaleString()} ETH</p>
                    </div>
                    <div className="flex space-x-1">
                      {transfer.metadata.logo ? (
                        <div className="relative w-4 h-4 rounded-full">
                          <Image src={transfer.metadata.logo} alt="logo" fill />
                        </div>
                      ) : (
                        <ImageOff className="w-4 h-4 rounded-full" />
                      )}
                      <Link
                        href={`/address/${transfer.contractAddress}`}
                        className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600"
                      >
                        {transfer.metadata.name}
                      </Link>
                      <p className="text-gray-600 dark:text-gray-400">
                        ({transfer.metadata.symbol})
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

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
      {/* <Transaction
        block={block}
        ethPrice={ethPrice}
        transaction={transaction}
        transactionFee={transactionFee}
        txnReceipt={txnReceipt}
        valueInUSD={valueInUSD}
      /> */}
    </Container>
  )
}
export default TransactionPage
