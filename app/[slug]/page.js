import ProductDetail from "@/components/organisms/productDetail"

export default async function Page({ params }) {
  
  const { slug } = await params

  return <ProductDetail slug={slug} />
}
// ```

// ## Key Changes:

// 1. ✅ `product.attributes` → `product` (Strapi v5 structure)
// 2. ✅ `p.image?.data?.attributes?.url` → `product.image?.url`
// 3. ✅ `await params` added (Next.js 15 requirement)
// 4. ✅ Better populate query added


// ```
// http://localhost:3000/apple-air-pods-pro-2nd-gen