import React from "react";
import ContentLoader from "react-content-loader";

/**
 * Custom Activity skeleton
 * @function
 * @param {"list" | "info"} variant can be "list" or "info" variants
 * @returns {JSX.Element}
 */

const ActivitySkeleton = ({ props, variant = "list" }) => {
  return (
    <div className={variant === "info" ? "detail" : ""}>
      <ContentLoader
        speed={1}
        backgroundColor="#e4e4e4"
        foregroundColor="#a9a9a9"
        height={variant === "list" ? 650 : 600}
        width={767}
        style={{ maxWidth: "100%", marginBottom: "20px" }}
        {...props}
      >
        <rect x="0" y="0" rx="2" ry="2" width="100%" height="400" />
        <rect x="0" y="410" rx="2" ry="2" width="100%" height="40" />
        <rect x="0" y="460" rx="2" ry="2" width="100%" height="24" />
        <rect x="0" y="494" rx="2" ry="2" width="100%" height="96" />
        {variant === "list" && (
          <rect x="0" y="600" rx="2" ry="2" width="100" height="50" />
        )}
      </ContentLoader>
    </div>
  );
};

export default ActivitySkeleton;
