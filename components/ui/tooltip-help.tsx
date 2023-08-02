"use client"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface ITooltipButtonProps {
  description: string
}

const TooltipHelp: React.FC<ITooltipButtonProps> = ({ description }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <HelpCircle className="w-4 h-4 text-gray-500 sm:w-5 sm:h-5" />
        </TooltipTrigger>
        <TooltipContent className="w-44">{description}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default TooltipHelp
