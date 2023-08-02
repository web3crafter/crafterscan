import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("px-2 mx-auto max-w-7xl ", className)}>{children}</div>
  )
}

export const ContainerInner: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "w-full px-4 py-10 rounded-md shadow bg-gray-100 dark:bg-gray-900",
        className
      )}
    >
      {children}
    </div>
  )
}
