import React from "react";
import { CgSpinner } from "react-icons/cg";
import "./LoadingSpinner.scss";

const LoadingSpinner = () => {
  return (
    <div className="spinner" aria-busy="true">
      <CgSpinner className="spinner__circle" />
    </div>
  );
};

export default LoadingSpinner;
