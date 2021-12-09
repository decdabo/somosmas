import React from "react";

const Image = ({url, description}) => {
  return <img src={url} alt={description} className="width-50"/>
}

export default Image
