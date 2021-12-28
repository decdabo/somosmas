import React from "react";
import Header from "../../Components/Header/Header";
import "./LayoutBackoffice.scss";

const LayoutBackoffice = ({ children }) => {
  return (
    <div className="layoutBackoffice__container">
      <Header />
      <main className="layoutBackoffice__main">{children}</main>
    </div>
  );
};

export default LayoutBackoffice;
