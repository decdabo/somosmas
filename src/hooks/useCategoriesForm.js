import { useState, useEffect, useRef } from "react";
import getBase64FromUrl from "../helpers/imageToBase64";

const useCategoriesForm = (categoryParam) => {
  //FOR IMAGE PREVIEW
  //AND SENDING TO API
  //See FILE API from html5
  const fileReader = new FileReader();
  fileReader.onload = (e) => {
    setImagePreview(e.target.result);
  };

  const imageInputRef = useRef();
  //   FOR SENDING THE IMAGE IN BASE64 and also previewing it on the frontend
  const [imagePreview, setImagePreview] = useState("");
  // API INTERACTION STATUS
  const [status, setStatus] = useState("");

  //TRY TO SAVE THE IMAGE OF THE CATEGORY OBJECT WHICH COMES FROM COMPONENT PARAMS
  useEffect(() => {
    if (categoryParam !== undefined)
      getBase64FromUrl(categoryParam.image)
        .then((res) => setImagePreview(res))
        .catch((err) => console.log(err));
  }, [categoryParam]);

  //HIDE THE MESSAGE IN 4 SECONDS
  // CLEANUP TO PREVENT ERROR DISMOUNTING COMPONENT
  useEffect(() => {
    const timeout = setTimeout(() => {
      setStatus("");
    }, 4000);
    return () => {
      clearTimeout(timeout);
    };
  }, [status]);

  return {
    imageInputRef,
    imagePreview,
    setImagePreview,
    status,
    setStatus,
    fileReader,
  };
};

export default useCategoriesForm;
