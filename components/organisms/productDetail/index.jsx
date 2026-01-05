import CustomImage from "@/components/molecules/customImage"
import Image from "next/image"

async function getProduct(slug) {
  try {
    const res = await fetch(
      `http://localhost:1337/api/products?filters[slug][$eq]=${slug}&populate=*`,
      { cache: "no-store" }
    )

    const data = await res.json()
    console.log("Product found:", data.data[0]?.title)

    if (!data.data || data.data.length === 0) {
      return null
    }

    return data.data[0]
  } catch (error) {
    console.error("Fetch error:", error)
    return null
  }
}

export default async function ProductDetail({ slug }) {
  const product = await getProduct(slug)

  if (!product) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>Product not found</h1>
        <p>Slug: {slug}</p>
      </div>
    )
  }

  const imageUrl = product.image?.url

  return (
    <div style={{ padding: "40px" }}>
      <h1>{product.title}</h1>
      <p>{product.description}</p>

      {/* Temporary: Normal img tag */}
      {imageUrl ? (
        <CustomImage
          src={`http://localhost:1337${imageUrl}`}
          width={400}
          height={400}
          alt={product.title || "Product"}
          style={{ objectFit: "contain" }}
        />
      ) : (
        <p>No image available</p>
      )}

      {product.category && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
          <h3>Specifications:</h3>
          <p><strong>Brand:</strong> {product.category.brand}</p>
          <p><strong>Color:</strong> {product.category.color}</p>
          <p><strong>Category:</strong> {product.category.category}</p>
        </div>
      )}
    </div>
  )
}