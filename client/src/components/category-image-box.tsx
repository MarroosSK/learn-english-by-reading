import { useState } from "react";

const Skeleton = () => (
  <div className="animate-pulse w-full h-64 bg-gray-200 rounded-lg"></div>
);

const CategoryImageBox = ({ src, title }: { src: string; title: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-auto mx-auto overflow-hidden rounded-lg">
      {!isLoaded && <Skeleton />}
      <img
        src={src}
        className={`w-full h-auto relative z-0 rounded-lg scale-110 transition-all duration-300 hover:scale-100 `}
        style={!isLoaded ? { visibility: "hidden" } : {}}
        alt={`Reading ${title}`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default CategoryImageBox;
