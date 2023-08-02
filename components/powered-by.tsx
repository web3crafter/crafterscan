import Image from "next/image"
import Link from "next/link"

const PoweredBy = () => {
  return (
    <div className="flex items-center space-x-2">
      <p className="text-gray-500">Powered by:</p>
      <div className="flex justify-center space-x-2">
        <Link
          href={"https://www.coingecko.com/"}
          target="_blank"
          className="relative w-8 h-8"
        >
          <Image
            src={"/coingecko_logo.png"}
            alt="coingecko"
            fill
            className="absolute object-contain dark:opacity-80"
          />
        </Link>
        <Link
          href={"https://www.alchemy.com/"}
          target="_blank"
          className="relative w-8 h-8"
        >
          <Image
            src={"/alchemy.png"}
            alt="alchemy"
            fill
            className="absolute object-contain dark:opacity-80"
          />
        </Link>
      </div>
    </div>
  )
}
export default PoweredBy
