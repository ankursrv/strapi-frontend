import Image from "next/image"
import React from "react"

const CustomImage = ({
  src,
  width,
  height,
  alt="not found",
  className,
  ...props
}) => {
  return (
    <>
      <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={className}
      unoptimized
      loading="eager"
      {...props}
      />
    </>
  )
}

export default CustomImage
