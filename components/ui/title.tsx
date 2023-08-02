import TooltipHelp from "@/components/ui/tooltip-help"
import { cn } from "@/lib/utils"

interface TitleProps {
  title: string
  description: string
  className?: string
}

export const Title: React.FC<TitleProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div className={cn("flex gap-1 items-center basis-1/4", className)}>
      <TooltipHelp description={description} />
      <h1 className="text-gray-500">{title}:</h1>
    </div>
  )
}
