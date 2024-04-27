import React from "react";

const Image = ({src, className, alt,...rest}) => {
  src =
    src && src.includes("https://")
      ? src
      : "https://rentkey-server.onrender.com/uploads/" + src;
  return <img className={className} src={src} alt={alt} {...rest} />;
};

export default Image;