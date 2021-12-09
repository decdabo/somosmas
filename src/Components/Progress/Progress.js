import React, { useRef, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";

export const Progress = () => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.continuousStart();
    setTimeout(() => {
      ref.current.complete();
    }, 2000);
  });

  return (
    <div>
      <LoadingBar color="#dc817e" height="8px" shadow="true" ref={ref} />
    </div>
  );
};
