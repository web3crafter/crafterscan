import Image from "next/image"
import { SiAlchemy, SiTwitter } from "react-icons/si"
import { Container } from "@/components/ui/container"
import { Separator } from "@/components/ui/separator"
import Socials from "@/components/socials"
import PoweredBy from "@/components/powered-by"

const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 right-0">
      <Separator />
      <div className="flex justify-center py-2 space-y-1 bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-between w-full max-w-7xl">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <p className="">
                &copy; <span className="text-sm">2023 Web3Crafter</span>
              </p>
            </div>
            <Socials />
          </div>
          <PoweredBy />
        </div>
      </div>
    </footer>
  )
}
export default Footer
