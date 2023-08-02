import SearchField from "@/components/search-field"
import TopNav from "@/components/navbar/top-nav"
import { Container } from "@/components/ui/container"
import { Separator } from "@/components/ui/separator"
import { IEthPrice } from "@/types/types"

const getEthPrice = async (): Promise<IEthPrice> => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true",
    {
      next: { revalidate: 60 * 15 },
    }
  )
  if (!response.ok) {
    console.log("Failed to fetch ETH Price")
  }
  return response.json()
}

const Navbar = async () => {
  const fetchedEthPrice = await getEthPrice()
  const ethPrice = fetchedEthPrice.ethereum.usd
  const ethPriceChanges = fetchedEthPrice.ethereum.usd_24h_change
  return (
    <div className="mb-10">
      <TopNav />
      <Separator />
      <Container className="flex mt-2 space-x-1 text-sm">
        <p className="text-gray-500">ETH Price: </p>
        <p>${ethPrice}</p>
        <p
          className={
            ethPriceChanges.toString().startsWith("-")
              ? "text-red-600"
              : "text-green-500"
          }
        >
          ({ethPriceChanges.toFixed(2)}%)
        </p>
      </Container>
      <SearchField />
    </div>
  )
}
export default Navbar
