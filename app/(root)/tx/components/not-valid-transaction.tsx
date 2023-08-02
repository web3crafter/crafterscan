import { Container, ContainerInner } from "@/components/ui/container"
import { Separator } from "@/components/ui/separator"
import { FileX } from "lucide-react"

interface NotValidTransactionProps {
  txHash: string
}

const NotValidTransaction: React.FC<NotValidTransactionProps> = ({
  txHash,
}) => {
  return (
    <Container>
      <ContainerInner>
        <div className="flex flex-col items-center">
          <FileX className="w-16 h-16 p-2 text-orange-600 border-2 border-orange-600 rounded-full bg-orange-600/30" />
          <h1 className="mt-4 text-xl font-semibold">
            We are unable to locate this txn Hash
          </h1>
          <p>{txHash}</p>
        </div>
        <Separator className="my-8" />
        <ol className="ml-4 list-decimal">
          <li>
            If you have just submitted a transaction please wait for at least 30
            seconds before refreshing this page.
          </li>
          <li>
            It could still be in the TX Pool of a different node, waiting to be
            broadcasted.
          </li>
          <li>
            When the network is busy it can take a while for your transaction to
            propagate through the network and for us to index it.
          </li>
          <li>
            If it still does not show up after 1 hour, please check with your
            sender/exchange/wallet/transaction provider for additional
            information.
          </li>
        </ol>
      </ContainerInner>
    </Container>
  )
}
export default NotValidTransaction
