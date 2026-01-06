"use client"
import CustomImage from "@/components/molecules/customImage"
import Link from "next/link"
import React, { useEffect, useState } from "react"

const ProductCards = () => {
  const [productCard, setProductCard] = useState(null)
  const [wishlist, setWishlist] = useState([])
  const [seeMoreButton, setSeeMoreButton] = useState(null)

  // WISHLIST TOGGLE FUNCTION
  const toggleWishlist = (itemId) => {
    setWishlist((prev) => {
      if (prev.includes(itemId)) {
        // Agar already wishlist mein hai to remove karo
        return prev.filter((id) => id !== itemId)
      } else {
        // Nahi hai to add karo
        return [...prev, itemId]
      }
    })
  }
  // CHECK if item is in wishlist
  const isInWishlist = (itemId) => {
    return wishlist.includes(itemId)
  }

  useEffect(() => {
    async function getProductCard() {
      const res = await fetch(
        "http://localhost:1337/api/landing-page?populate[productCards][populate]=*&populate=seeMoreButton",
        { cache: "no-store" }
      )
      const data = await res.json()
      setProductCard(data)
      setSeeMoreButton(data?.data?.seeMoreButton)
      // console.log("product-cards-data", data)
    }
    getProductCard()
  }, [])


  return (
    <div className="mb-14 mt-10">
      <h2 className="text-2xl font-medium">Popular products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 mb-14">
        {productCard?.data?.productCards?.map((item, index) => (
          <Link key={index} href={`/products/${item.product?.slug}`}>
            <div className="max-w-[200px]">
              {item.image &&
                <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
                  <CustomImage
                    src={`http://localhost:1337${item.image.url}`}
                    width={1000}
                    height={1000}
                    className="responsive-image-contain"
                  />
                  {/* wishlist  */}
                  <div
                    onClick={(e) => {
                      e.preventDefault() 
                      toggleWishlist(item.id)
                    }}
                    className="size-8 absolute top-2 right-2 bg-white p-2 rounded-full shadow-md flex items-center justify-center">
                    <CustomImage
                      src={isInWishlist(item.id) ? "/images/icon/wishlist-fill.svg" : "/images/icon/wishlist.svg"}
                      width={1000}
                      height={1000}
                      className="responsive-image-cover"
                    />
                  </div>
                </div>
              }
              <h4 className="md:text-base font-medium pt-2 w-full truncate">{item.title}</h4>
              <p className="w-full text-xs text-gray-500/70 truncate mt-1">{item.description}</p>
              <span className="block text-xs mt-2">{item.rating}</span>
              {/* price  */}
              <div className="flex items-center justify-between mt-2">
                <p className="text-base font-bold text-[#374151]">{item.currencySymbol}{item.price}</p>
                {/* <Link href={item.button?.href || "#"} className="px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">
                  {item.button?.text}
                </Link> */}
                <button>{item.button?.text}</button>
              </div>
            </div>
          </Link>
          
        ))}
      </div>
      {seeMoreButton && 
        <div className="text-center">
          <Link href={seeMoreButton.href || "#"}>
            <button className="px-12 py-2.5 border border-gray-500/50 rounded text-gray-500/70 hover:bg-slate-50/90 transition">
              {seeMoreButton.text}
            </button>
          </Link>
        </div>
      }
    </div>
  )
}

export default ProductCards
