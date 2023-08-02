"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAddress } from "ethers"
import { SearchIcon, RotateCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

const SearchField = () => {
  const [userInput, setUserInput] = useState("")
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  const { toast } = useToast()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="relative flex max-w-3xl mx-2 mt-4 border border-gray-400 rounded-md dark:border-gray-500">
          <Skeleton className="h-12 text-base" />
        </div>
      </div>
    )
  }

  const onFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select()
  }

  const onEnterDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      onSubmit()
    }
  }

  const onSubmit = async () => {
    if (!userInput) {
      toast({
        title: "Need valid Transaction Hash, Block Number or an Address",
        variant: "destructive",
      })
    }

    try {
      if (userInput.length <= 8) {
        router.push(`/block/${userInput}`)
      } else if (userInput.length === 66) {
        router.push(`/tx/${userInput}`)
      } else if (userInput.length === 42) {
        if (isAddress(userInput)) {
          router.push(`/address/${userInput}`)
        } else {
          toast({
            title: "Non valid address",
            description: "Please provide a valid address",
            variant: "destructive",
          })
        }
      } else {
        toast({
          title: "Non valid Address, Transaction hash or Block Number",
          description:
            "Please provide a valid Address, Transaction hash or Block Number",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.log("error:", error)
    } finally {
      setUserInput("")
    }
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="relative flex max-w-3xl mx-2 mt-4 border border-gray-400 rounded-md dark:border-gray-500">
        <Input
          className="h-12 text-base"
          value={userInput}
          placeholder="Block Number / Tx Hash / Address"
          onChange={(e) => setUserInput(e.target.value)}
          onFocus={onFocusHandler}
          onKeyDown={onEnterDownHandler}
        />
        <Button
          size={"icon"}
          className="absolute top-0 right-0 h-12 rounded-l-none"
          onClick={onSubmit}
        >
          <SearchIcon size={25} className="" />
        </Button>
      </div>
    </div>
  )
}
export default SearchField
