"use client"

import NotValidAddress from "@/app/(root)/address/components/not-valid-address"
import BlockNotFound from "@/app/(root)/block/components/block-not-found"
import NotValidTransaction from "@/app/(root)/tx/components/not-valid-transaction"
import { usePathname } from "next/navigation"

export default function NotFound() {
  const pathname = usePathname()
  console.log("pathname:", pathname)
  if (pathname.startsWith("/address")) {
    return <NotValidAddress address="test" />
  }
  if (pathname.startsWith("/block")) {
    return <BlockNotFound failedBlockNumber="test" />
  }
  if (pathname.startsWith("/tx")) {
    return <NotValidTransaction txHash="test" />
  }
}
