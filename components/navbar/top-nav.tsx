import { Container } from "@/components/ui/container"
import { ModeToggle } from "@/components/ui/mode-toggle"
import Image from "next/image"
import Link from "next/link"

const TopNav = () => {
  return (
    <div className="w-full py-2 bg-gray-100 dark:bg-gray-900">
      <Container className="flex">
        <Link href={"/"} className="flex items-center gap-2">
          <div className="relative w-10 h-10 overflow-hidden rounded-full">
            <Image
              src={"/web3crafter1.png"}
              fill
              alt="Logo"
              className="object-cover"
            />
          </div>
          <div className="text-2xl font-semibold text-primary-dark-950 dark:text-primary-dark-700">
            CrafterScan
          </div>
        </Link>
        <div className="ml-auto">
          <ModeToggle />
        </div>
      </Container>
    </div>
  )
}
export default TopNav
