import React from "react"
import Image from "next/image"
import CustomImage from "@/components/molecules/customImage"
import Link from "next/link"

async function getHeaders() {
  const res = await fetch(
    "http://localhost:1337/api/global?populate[topnav][populate][logolink][populate]=*&populate[topnav][populate][cta]=*&populate[topnav][populate][link]=*",
    { cache: "no-store" }
  )

  const data = await res.json()
  return data
}
const headerData = await getHeaders()

// const navItems = [
//   { label: headerData.home, href : "/" },
//   { label: headerData.about, href: "/about" },
//   { label: headerData.contactUs, href: "/contact-us" },
//   { label: headerData.blog, href: "/blog" },
// ]

const Header = () => {
  console.log("Full Data", headerData)
  return (
    <header className="shadow-lg sticky top-0 bg-white">
      <div className="flex items-center justify-between py-8 container">
        <div className="flex items-center gap-2">
          {/* logo */}
          <div className="size-10">
            <CustomImage
              src={`http://localhost:1337${headerData?.data?.topnav?.logolink?.logo?.url}`}
              width={1000}
              height={1000}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-2xl font-semibold">{headerData?.data?.topnav?.logolink?.title}</span>
        </div>
        <nav>
          <ul className="flex items-center justify-center gap-8 *:font-semibold *:text-lg">
            {headerData?.data?.topnav?.link?.map((item, index) => (
              <li key={index}>
                <Link href={item.href}>{item.text}</Link>
              </li>
            ))}
            {/* <span>{headerData?.data?.topnav?.link?.text}</span> */}
          </ul>
        </nav>
        <div className="flex items-center gap-5">
          {/* <button className="border px-5 h-[38px] rounded-md flex items-center font-semibold cursor-pointer">{headerData.login}</button> */}
          <Link href={headerData?.data?.topnav?.cta?.href}>
            <button className="border px-5 h-[38px] rounded-md flex items-center font-semibold cursor-pointer hover:bg-orange-400 hover:border-orange-400 duration-300">{headerData?.data?.topnav?.cta?.text}</button>
          </Link>
        </div>
      </div>
    </header>

  )
}

export default Header
