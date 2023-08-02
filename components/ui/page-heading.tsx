import { Container } from "@/components/ui/container"
import { CopyButton } from "@/components/ui/copy-button"
import Link from "next/link"

interface PageHeadingProps {
  page: "Block" | "Transaction" | "Address" | "Transactions"
  value: string
}

const PageHeading: React.FC<PageHeadingProps> = ({ page, value }) => {
  return (
    <div className="flex items-baseline mb-2 space-x-1">
      <h1 className="text-xl font-semibold ">{page}</h1>
      {page === "Block" && <p className="break-all">#{value}</p>}
      {page === "Transactions" && (
        <div className="flex space-x-1">
          <p>for Block</p>
          <Link
            href={`/block/${value}`}
            className="text-blue-600 break-all hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600"
          >
            {value}
          </Link>
        </div>
      )}
      {page === "Transaction" && <p className="break-all">{value}</p>}
      {page === "Address" && (
        <div className="flex items-center">
          <p className="break-all">{value}</p>
          <CopyButton textToCopy={value} />
        </div>
      )}
    </div>
  )
}
export default PageHeading
