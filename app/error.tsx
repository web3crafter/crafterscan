"use client" // Error components must be Client Components

import { Button } from "@/components/ui/button"
import { Container, ContainerInner } from "@/components/ui/container"
import Link from "next/link"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <Container>
      <ContainerInner className="flex flex-col items-center justify-center space-y-6">
        <h2 className="break-all">{error.message}</h2>
        <div className="flex space-x-2">
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </Button>
          <Button asChild variant={"secondary"}>
            <Link href={"/"}>Home</Link>
          </Button>
        </div>
      </ContainerInner>
    </Container>
  )
}
