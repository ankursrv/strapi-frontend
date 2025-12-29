import CustomImage from "@/components/molecules/customImage"
import Header from "@/components/organisms/header"


async function getBlogs() {
  const res = await fetch(
    "http://localhost:1337/api/blogs?populate=*",
    { cache: "no-store" }
  )

  const data = await res.json()
  return data.data
}

const blogs = await getBlogs()

const Blog = async () => {
  return (
    <div className="">
      <h1 className="text-4xl font-semibold my-10">Blogs</h1>
      {blogs.map((blog, index) => (
        <div
          key={index}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold">
            {blog.title}
          </h2>
          <h5 className="text-gray-500 text-sm mt-2 mb-5">
            {blog.description[0].children[0].text}
          </h5>
          <div className="h-[400px]">
            <CustomImage
              src={`http://localhost:1337${blog.image.url}`}
              width={1000}
              height={1000}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Blog