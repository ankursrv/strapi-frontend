// "use client"
import CustomImage from "@/components/molecules/customImage"
import Link from "next/link"
// import React, { useEffect, useState } from "react"

async function getGamingExperience () {
  const res = await fetch("http://localhost:1337/api/landing-page?populate[gamingExperience][populate]=*",
    {cache: "no-store"}
  )
  const data = await res.json()
  return data.data.gamingExperience
}

const GamingExperience = async () => {
  const gamingData = await getGamingExperience()
  // const [gamingExperience, setGamingExperience] = useState(null)

  // useEffect(() => {
  //   async function getGamingExperience() {
  //     const res = await fetch(
  //       "http://localhost:1337/api/landing-page?populate[gamingExperience][populate]=*",
  //       { cache: "no-store" }
  //     )
  //     const data = await res.json()
  //     setGamingExperience(data)
  //     console.log("Full Response:", data)
  //     console.log(`"Image1 URL:", http://localhost:1337${data?.data?.gamingExperience?.image1?.url}`)
  //     console.log(`"Image2 URL:", http://localhost:1337${data?.data?.gamingExperience?.image2?.url}`)
  //   }
  //   getGamingExperience();
  // }, [])
  // const gameData = gamingExperience?.data?.gamingExperience

  return (
    <div className="flex flex-col md:flex-row items-center justify-between md:pl-20 py-14 md:py-0 bg-[#E6E9F2] my-16 rounded-xl overflow-hidden">
      {gamingData?.image1?.url && (
        <CustomImage
          src={`http://localhost:1337${gamingData?.image1?.url}`}
          width={1000}
          height={1000}
          className="max-w-56"
        />
      )}

      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl md:text-3xl font-bold max-w-[290px]">{gamingData?.title}</h2>
        <p className="max-w-[343px] font-medium text-gray-800/60 my-3">{gamingData?.description}</p>
        <Link href={gamingData?.href || "#"}>
          <button className="flex items-center justify-center gap-1 px-12 py-2.5 bg-orange-600 rounded text-white">{gamingData?.link?.title}</button>
        </Link>
      </div>
      {gamingData?.image2?.url && (
        <CustomImage
          src={`http://localhost:1337${gamingData?.image2?.url}`}
          width={1000}
          height={1000}
          className="hidden md:block max-w-80"
        />
      )}
    </div>
  )
}

export default GamingExperience
