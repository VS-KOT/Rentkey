import React from "react";

const Image = ({src, className, alt,...rest}) => {
  src =
    src && src.includes("https://")
      ? src
      : "https://localhost:3000/uploads/" + src;
  return <img className={className} src={src} alt={alt} {...rest} />;
};

export default Image;