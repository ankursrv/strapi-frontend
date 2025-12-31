import HeroBanner from "@/components/molecules/heroBanner"
import FeaturedProducts from "@/components/organisms/featuredProduct"
import GamingExperience from "@/components/organisms/gamingExperience"
import ProductCards from "@/components/organisms/productCard"


const Home = () => {
  return (
    <>
      <HeroBanner />
      <ProductCards />
      <FeaturedProducts />
      <GamingExperience />
    </>
  )
}

export default Home