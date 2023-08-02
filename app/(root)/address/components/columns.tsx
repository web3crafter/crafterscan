"use client"
import { Button } from "@/components/ui/button"
import { formatAddress, formatAge, formatTxHash } from "@/lib/formatting"
import { IAddressTransaction } from "@/types/types"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"

export const columns: ColumnDef<IAddressTransaction>[] = [
  {
    accessorKey: "hash",
    header: "Txn Hash",
    cell: ({ row }) => {
      return (
        <Link
          href={`/tx/${row.getValue("hash")}`}
          className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600"
        >
          {formatTxHash(row.getValue("hash"))}
        </Link>
      )
    },
  },
  {
    accessorKey: "blockNumber",
    header: "Block",
    cell: ({ row }) => {
      return (
        <Link
          href={`/block/${row.getValue("blockNumber")}`}
          className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600"
        >
          {row.getValue("blockNumber")}
        </Link>
      )
    },
  },
  {
    accessorKey: "age",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Age
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div>{formatAge(row.getValue("age"))}</div>
    },
  },
  {
    accessorKey: "from",
    header: "From",
    cell: ({ row }) => {
      return (
        <Link
          href={`/address/${row.getValue("from")}`}
          className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600"
        >
          {formatAddress(row.getValue("from"))}
        </Link>
      )
    },
  },
  {
    accessorKey: "to",
    header: "To",
    cell: ({ row }) => {
      return (
        <Link
          href={`/address/${row.getValue("to")}`}
          className="text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600"
        >
          {formatAddress(row.getValue("to"))}
        </Link>
      )
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Value
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("value")} {row.original.symbol}
        </div>
      )
    },
  },
]
