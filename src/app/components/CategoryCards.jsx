import React from "react";
import { FaBolt, FaFire, FaTint, FaWifi } from "react-icons/fa";

const CategoryCards = () => {
  const categories = [
    {
      name: "Electricity",
      icon: <FaBolt />,
      color: "from-primary to-secondary",
    },
    {
      name: "Gas",
      icon: <FaFire />,
      color: "from-secondary to-error",
    },
    {
      name: "Water",
      icon: <FaTint />,
      color: "from-info to-primary",
    },
    {
      name: "Internet",
      icon: <FaWifi />,
      color: "from-accent to-secondary",
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary">
        Our Utility Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl bg-base-100 border border-base-300 dark:border-base-200 cursor-pointer transition-all duration-300 hover:scale-105"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-90 group-hover:opacity-100 transition-all duration-300`}
            ></div>

            <div className="absolute inset-0 bg-white/10 dark:bg-black/20 backdrop-blur-sm"></div>

            <div className="relative z-10 flex flex-col items-center justify-center py-10 text-white dark:text-gray-100">
              <div className="text-5xl mb-3 drop-shadow-lg">{cat.icon}</div>
              <h3 className="text-xl font-semibold tracking-wide">
                {cat.name}
              </h3>
            </div>

            <div
              className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-70 blur-xl transition-all duration-500`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;