import { Card } from "@/components/ui/card"
import { Container, ContainerInner } from "@/components/ui/container"
import { CopyButton } from "@/components/ui/copy-button"
import { Separator } from "@/components/ui/separator"
import { FaEthereum } from "react-icons/fa"

interface NotValidAddressProps {
  address: string
}
const NotValidAddress: React.FC<NotValidAddressProps> = ({ address }) => {
  return (
    <Container className="">
      <ContainerInner>
        <div className="hidden md:block">
          <div className="flex items-center space-x-1">
            <p className="font-semibold ">Address</p>
            <p>{address}</p>
            <CopyButton textToCopy={address} />
          </div>
          <Separator className="mt-2 mb-8" />
        </div>
        <div className="justify-center mx-auto space-y-2 md:flex md:space-y-0 md:space-x-8">
          <Card className="p-4 space-y-4 text-sm md:w-1/2">
            <h1 className="text-base font-semibold">Overview</h1>
            {/* ETH Balance */}
            <div>
              <p className="text-gray-600 dark:text-gray-400">ETH BALANCE</p>
              <div className="flex items-center">
                <FaEthereum />
                <p className="">0 ETH</p>
              </div>
            </div>
            {/* ETH Value */}
            <div>
              <p className="text-gray-600 dark:text-gray-400">ETH VALUE</p>
              <div className="flex">
                <p className="">$0.00</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 space-y-4 text-sm md:w-1/2">
            <h1 className="text-base font-semibold">More Info</h1>
            <p>NO TXNS SENT FROM THIS ADDRESS</p>
          </Card>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-col items-center w-full">
          <h1 className="text-base">{address}</h1>
          <p className="text-xl">is not a valid address</p>
        </div>
      </ContainerInner>
    </Container>
  )
}
export default NotValidAddress
