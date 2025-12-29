"use client"
import CustomImage from "@/components/molecules/customImage";
import { useEffect, useState } from "react"


// async function getHeroBanner() {
//   const res = await fetch("http://localhost:1337/api/landing-page?populate[heroBanner][populate]=*",
//     { cache: "no-store" }
//   )
//   const data = await res.json()
//   return data
// }


const Home = () => {
  const [bannerData, setBannerData] = useState(null)
  useEffect (()=>{
    async function getHeroBanner() {
      const res = await fetch("http://localhost:1337/api/landing-page?populate[heroBanner][populate]=*",
        { cache: "no-store" }
      )
      const data = await res.json()
      setBannerData(data)
      console.log("Banner", data)
    }
    getHeroBanner();
  },[]);

  return (
    <div className="">
      Home
      {/* ✅ Safe rendering */}
      <span>
        {bannerData?.data?.heroBanner?.[0]?.smallText}
      </span>
      <span>
       <CustomImage 
       src={bannerData?.data?.heroBanner?.[0]?.image?.url}
       width={1000}
       height={1000}
       />
       
      </span>
    </div>
  )
}

export default Home