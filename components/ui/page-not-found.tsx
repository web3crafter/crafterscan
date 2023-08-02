"use client"
import { Container, ContainerInner } from "@/components/ui/container"
import { usePathname } from "next/navigation"

interface PageNotFoundProps {
  url: string
}

const PageNotFound: React.FC<PageNotFoundProps> = ({ url }) => {
  const temp = usePathname()
  return (
    <Container>
      <ContainerInner>{temp}</ContainerInner>
    </Container>
  )
}
export default PageNotFound
