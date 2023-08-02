import { getTransfers } from "@/actions/get-transfers"
import { IAddressTransaction } from "@/types/types"
import { isAddress } from "ethers"
import { Suspense } from "react"

import { checkIfContract, getContractDeployer } from "@/actions/get-contract"

import { Container, ContainerInner } from "@/components/ui/container"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import PageHeading from "@/components/ui/page-heading"
import { columns } from "../components/columns"
import OverviewCard from "../components/overview-card"
import NotValidAddress from "../components/not-valid-address"
import MoreInfoCardAddress from "../components/more-info-card_address"
import MoreInfoCardContract from "../components/more-info-card-contract"

const typeOfAddress = async (address: string) => {
  if (isAddress(address)) {
    const contract = await checkIfContract(address)
    if (contract) {
      const deployedContract = await getContractDeployer(address)
      console.log("deployedContract:", deployedContract)
      return deployedContract
    }
    return null
  }
}

async function getTransactions(address: string) {
  const data = await getTransfers(address)
  if (!data) {
    throw new Error("Failed to fetch data")
  }

  const transactions: IAddressTransaction[] = data.transfers.map(
    (transaction) => ({
      hash: transaction.hash,
      blockNumber: Number(transaction.blockNum),
      age: transaction.metadata.blockTimestamp,
      from: transaction.from,
      to: transaction.to === null ? "null" : transaction.to,
      value: transaction.value === null ? "0" : transaction.value.toFixed(8),
      symbol: transaction.asset === null ? "0" : transaction.asset,
      category: transaction.category,
    })
  )

  return JSON.stringify(transactions)
  // return data
}

const AddressPage = async ({ params }: { params: { address: string } }) => {
  if (!isAddress(params.address)) {
    return <NotValidAddress address={params.address} />
  }

  const contract = await typeOfAddress(params.address)
  const address = params.address

  const data = await getTransactions(params.address)
  const transactions: IAddressTransaction[] = JSON.parse(data)

  return (
    <Container>
      <PageHeading page="Address" value={address} />
      <ContainerInner>
        <div className="justify-center mx-auto space-y-2 md:flex md:space-y-0 md:space-x-8">
          {contract ? (
            <>
              <Suspense fallback={<p>test</p>}>
                <OverviewCard address={address} />
              </Suspense>
              <Suspense fallback={<p>test</p>}>
                <MoreInfoCardContract contract={contract} />
              </Suspense>
            </>
          ) : (
            <>
              <Suspense fallback={<p>test</p>}>
                <OverviewCard address={address} />
              </Suspense>
              <Suspense fallback={<p>test</p>}>
                <MoreInfoCardAddress address={address} />
              </Suspense>
            </>
          )}
        </div>
        <Separator className="my-4" />
        <DataTable columns={columns} data={transactions} />
      </ContainerInner>
    </Container>
  )
}
export default AddressPage
