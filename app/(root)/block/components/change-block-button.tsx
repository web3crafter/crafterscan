"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface ChangeBlockButtonProps {
  blockNumber: string
}
const ChangeBlockButton: React.FC<ChangeBlockButtonProps> = ({
  blockNumber,
}) => {
  const router = useRouter()
  const handleChangeBlock = (blockNumber: string, direction: string) => {
    if (direction === "left") {
      router.push(`/block/${Number(blockNumber) - 1}`)
    }

    if (direction === "right") {
      router.push(`/block/${Number(blockNumber) + 1}`)
    }
  }

  return (
    <div className="flex items-center space-x-1">
      <ChevronLeft
        className="w-5 h-5 rounded bg-primary-dark-900 text-gray-50 hover:cursor-pointer"
        onClick={() => handleChangeBlock(blockNumber, "left")}
      />
      <ChevronRight
        className="w-5 h-5 rounded bg-primary-dark-900 text-gray-50 hover:cursor-pointer"
        onClick={() => handleChangeBlock(blockNumber, "right")}
      />
    </div>
  )
}
export default ChangeBlockButton
