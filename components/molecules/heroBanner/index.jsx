import CustomImage from "@/components/molecules/customImage"
import CustomSlider from "@/components/organisms/customSlider"
import { cn } from "@/lib/utils"
import Link from "next/link"

async function getHeroBanner() {
  const res = await fetch(
    "http://localhost:1337/api/landing-page?populate[heroBanner][populate]=*",
    { cache: "no-store" }
  )

  const data = await res.json()
  return data.data.heroBanner
}

const HeroBanner = async () => {
  const heroBannerData = await getHeroBanner()

  return (
    <div className="hero-banner-pagination pagination-style1">
      <CustomSlider swiperContainer="mt-10" autoplay>
        {heroBannerData?.map((item, index) => (
          <div
            key={index}
            className="bg-[#e6e9f2] rounded-xl flex items-center py-8 px-[72px]"
          >
            <div className="pl-5">
              <span className="block text-[#ea580c] font-semibold mb-2">
                {item.smallText}
              </span>

              <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-bold">
                {item.title}
              </h1>

              {/* Buttons */}
              <div className="mt-10 flex items-center gap-5">
                {item.heroButton?.map((btn, index) => (
                  <Link
                    key={index}
                    href={btn.href || "/"}
                    className={cn(
                      "px-10 py-3 rounded-full font-semibold border transition-all duration-300",
                      index === 0
                        ? "bg-[#ea580c] border-[#ea580c] text-white hover:bg-transparent hover:text-[#ea580c]"
                        : "hover:bg-[#ea580c] hover:text-white border-[#ea580c]"
                    )}
                  >
                    {btn.text}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mx-auto">
              <div className="w-[288px] h-[329px]">
                <CustomImage
                  src={`http://localhost:1337${item.image.url}`}
                  width={1000}
                  height={1000}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </CustomSlider>
    </div>
  )
}

export default HeroBanner
