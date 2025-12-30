import HeroBanner from "@/components/molecules/heroBanner"
import FeaturedProducts from "@/components/organisms/featuredProduct"
import ProductCards from "@/components/organisms/productCard"


const Home = () => {
  return (
    <>
      <HeroBanner />
      <ProductCards />
      <FeaturedProducts />
    </>
  )
}

export default Home