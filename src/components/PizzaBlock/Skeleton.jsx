import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="133" cy="152" r="125" />
    <rect x="0" y="291" rx="16" ry="16" width="280" height="30" />
    <rect x="6" y="331" rx="10" ry="10" width="263" height="83" />
    <rect x="11" y="428" rx="10" ry="10" width="95" height="30" />
    <rect x="130" y="422" rx="20" ry="20" width="143" height="42" />
  </ContentLoader>
);

export default Skeleton;
