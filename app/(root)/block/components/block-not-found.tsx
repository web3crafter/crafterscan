import { getBlock, getBlockNumber } from "@/actions/get-block"
import { Container, ContainerInner } from "@/components/ui/container"
import { Separator } from "@/components/ui/separator"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface BlockNotFoundProps {
  failedBlockNumber: string
}

const BlockNotFound: React.FC<BlockNotFoundProps> = async ({
  failedBlockNumber,
}) => {
  const currentBlockNumber = await getBlockNumber()

  return (
    <Container>
      <ContainerInner>
        <div className="flex flex-col items-center ">
          <h1 className="text-lg">Block {failedBlockNumber} not found</h1>
          <Separator className="my-8" />
          <div className="text-xl font-semibold ">
            <p>
              {currentBlockNumber! >= Number(failedBlockNumber) &&
                `Something went wrong`}
            </p>
            {Number(failedBlockNumber) > currentBlockNumber! && (
              <div>
                <p>Block {failedBlockNumber} not produced yet!</p>
                <p>Current Block: {currentBlockNumber}</p>
              </div>
            )}
          </div>
        </div>
      </ContainerInner>
    </Container>
  )
}
export default BlockNotFound
