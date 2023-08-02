import { getBlockWithTransactions } from "@/actions/get-block"
import { Container, ContainerInner } from "@/components/ui/container"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "../components/columns"
import { Utils } from "alchemy-sdk"
import { ITransactionInBlock } from "@/types/types"
import { formatAge } from "@/lib/formatting"
import PageHeading from "@/components/ui/page-heading"

async function getTransactions(blockNumber: number) {
  const data = await getBlockWithTransactions(blockNumber)

  if (!data) {
    throw new Error("Failed to fetch data")
  }

  const transactions: ITransactionInBlock[] = data.transactions.map(
    (transaction) => ({
      hash: transaction.hash,
      blockNumber: transaction.blockNumber,
      age: formatAge(data.timestamp),
      from: transaction.from,
      to: transaction.to,
      value: Utils.formatEther(transaction.value),
    })
  )

  return JSON.stringify(transactions.reverse())
}

const TransactionsPage = async ({
  params,
}: {
  params: { blockNumber: string }
}) => {
  const data = await getTransactions(Number(params.blockNumber))
  const transactions: ITransactionInBlock[] = JSON.parse(data)

  if (!data) {
    return null
  }
  return (
    <Container className="">
      <PageHeading page="Transactions" value={params.blockNumber} />
      <ContainerInner>
        <DataTable columns={columns} data={transactions} />
      </ContainerInner>
    </Container>
  )
}
export default TransactionsPage
