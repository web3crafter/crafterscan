import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: number | undefined
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <>
      {status === 1 ? (
        <Badge variant={"success"}>Success</Badge>
      ) : (
        <Badge variant={"destructive"}>Failed</Badge>
      )}
    </>
  )
}
