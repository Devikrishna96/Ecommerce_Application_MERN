import React from 'react';

export const About = () => {
  return (
    <div className="p-10 max-w-6xl mx-auto">
      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Section - Text Content */}
        <div className="border-2 border-blue-400 p-6 bg-white dark:bg-gray-800 dark:border-blue-600 rounded-lg">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Story</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Launched in 2015, Exclusive is South Asia’s premier online shopping
            marketplace with an active presence in Bangladesh. Supported by a
            wide range of tailored marketing, data, and service solutions,
            Exclusive has 10,500 sellers and 300 brands and serves 3 million
            customers across the region.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg mt-4">
            Exclusive has more than 1 million products to offer, growing at a
            very fast pace. Exclusive offers a diverse assortment in categories
            ranging from consumer...
          </p>
        </div>

        {/* Right Section - Image */}
        <div>
          <img src="/path-to-your-image/about.JPG" alt="Shopping" className="w-full h-auto rounded-lg" />
        </div>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
        <div className="text-center border p-6 rounded-lg text-lg bg-white dark:bg-gray-800 dark:border-gray-600">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">10.5k</div>
          <div className="text-gray-500 dark:text-gray-400">Sellers active on our site</div>
        </div>
        <div className="text-center bg-red-500 text-white p-6 rounded-lg text-lg">
          <div className="text-3xl font-bold">33k</div>
          <div>Monthly Product Sale</div>
        </div>
        <div className="text-center border p-6 rounded-lg text-lg bg-white dark:bg-gray-800 dark:border-gray-600">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">45.5k</div>
          <div className="text-gray-500 dark:text-gray-400">Customers active on our site</div>
        </div>
        <div className="text-center border p-6 rounded-lg text-lg bg-white dark:bg-gray-800 dark:border-gray-600">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">25k</div>
          <div className="text-gray-500 dark:text-gray-400">Annual gross sale on our site</div>
        </div>
      </div>
    </div>
  );
};