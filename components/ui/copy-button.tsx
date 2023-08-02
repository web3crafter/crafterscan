"use client"

import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface CopyButtonProps {
  textToCopy: string
  className?: string
}
export const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  className,
}) => {
  const [isMounted, setIsMounted] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleCopy = (textToCopy: string) => {
    try {
      navigator.clipboard.writeText(textToCopy)
      toast({
        description: `Copied to Clipboard`,
      })
    } catch (error) {
      toast({
        description: "Failed to copy text",
        variant: "destructive",
      })
    }
  }

  if (!isMounted) return null

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className={cn(
              "hover:bg-transparent dark:hover:bg-transparent",
              className
            )}
            onClick={() => handleCopy(textToCopy)}
          >
            <Copy
              size={15}
              className="text-primary-dark-600 hover:text-primary-dark-500 dark:text-primary-dark-500 dark:hover:text-primary-dark-600"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="">
          <p>Copy to Clipboard</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
