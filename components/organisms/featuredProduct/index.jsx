// "use client"
import CustomImage from "@/components/molecules/customImage"
import Link from "next/link"
// import React, { useEffect, useState } from "react"

async function getFeaturedProduct () {
  const res = await fetch("http://localhost:1337/api/landing-page?populate[featuredCard][populate]=*",
    {cache:"no-store"}
  )
  const data = await res.json()
  return data.data.featuredCard
}

const FeaturedProducts = async () => {
  const featuredData = await getFeaturedProduct()
  // const [featuredProductData, setFeaturedProductData] = useState(null)
  // useEffect(() => {
  //   async function getFeaturedProduct() {
  //     const res = await fetch(
  //       "http://localhost:1337/api/landing-page?populate[featuredCard][populate]=*",
  //       { cache: "no-store" }
  //     )
  //     const data = await res.json()
  //     setFeaturedProductData(data)
  //   }
  //   getFeaturedProduct()
  // }, [])
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-3xl font-medium">Featured Products</h2>
        {/* heading bottom Line  */}
        <div className="w-28 h-0.5 bg-orange-600 mt-2" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mb-20 mt-12 gap-8 lg:gap-14 px-14">
        {featuredData?.map((item, index) => (
          <div key={index} className="relative group">
            <div className="relative">
              {/* overlay  */}
              <div className="absolute w-full h-full group-hover:bg-black/30 transition duration-200" />
              <CustomImage
                src={`http://localhost:1337${item.image.url}`}
                width={1000}
                height={1000}
                className="responsive-image-cover"
              />
            </div>
            <div className="absolute bottom-0 pl-8 pb-8 group-hover:pb-12 group-hover:transition-all duration-200">
              <p className="font-medium text-xl lg:text-2xl text-white mb-2">{item.title}</p>
              <p className="text-sm lg:text-base leading-5 max-w-60 text-white">{item.description}</p>
              <Link href={item.href || "#"}>
                <button className="flex items-center justify-center gap-1.5 bg-orange-600 px-4 py-2 rounded text-white mt-3">
                  {item.link?.title}
                  <CustomImage
                    src="/images/icon/redirect_icon.svg"
                    width={500}
                    height={500}
                    className="size-3"
                  />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default FeaturedProducts
