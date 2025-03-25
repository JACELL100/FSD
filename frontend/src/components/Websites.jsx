import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Filter, ArrowUpDown, Star } from "lucide-react";

const websitesData = [
  {
    id: 1,
    title: "Community Health Tracker",
    description: "A web platform for tracking local health initiatives",
    author: "HealthTech Innovators",
    sdg: "SDG 3: Good Health and Well-being",
    views: 1500,
    createdAt: new Date(2024, 2, 15),
    ratings: 4.5,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQybg9t16UiNiIas-dOsV8ci8UOMEPb1uAaA&s",
  },
  {
    id: 2,
    title: "Urban Green Spaces Mapper",
    description:
      "Interactive map of urban green spaces and environmental resources",
    author: "Urban Sustainability Team",
    sdg: "SDG 11: Sustainable Cities and Communities",
    views: 2200,
    createdAt: new Date(2024, 1, 20),
    ratings: 4.7,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYUWTtlUCnJlj5-sLhMmNzpS63mLakdC_I3A&s",
  },
  {
    id: 3,
    title: "Education Resource Portal",
    description: "Platform connecting students with learning resources",
    author: "EdTech Collective",
    sdg: "SDG 4: Quality Education",
    views: 1800,
    createdAt: new Date(2024, 3, 1),
    ratings: 4.3,
    thumbnail:
      "https://i.pinimg.com/736x/76/0c/84/760c84b81b3cf4e4bcb4579e15275c76.jpg",
  },
];

const Websites = () => {
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [filter, setFilter] = useState({
    sdg: "",
    sortBy: "ratings",
  });

  const filteredAndSortedWebsites = useMemo(() => {
    let result = [...websitesData];

    // Filter by SDG
    if (filter.sdg) {
      result = result.filter((website) => website.sdg === filter.sdg);
    }

    // Sort by different criteria
    switch (filter.sortBy) {
      case "ratings":
        result.sort((a, b) => b.ratings - a.ratings);
        break;
      case "newest":
        result.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "mostViewed":
        result.sort((a, b) => b.views - a.views);
        break;
    }

    return result;
  }, [filter]);

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-8 overflow-hidden"
    >
      <h1 className="text-4xl font-lilita text-center text-blue-400">
        🌐 Websites
      </h1>

      {/* Filters */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select
              value={filter.sdg}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, sdg: e.target.value }))
              }
              className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-white/10 appearance-none pr-8"
            >
              <option value="">All SDGs</option>
              {[...new Set(websitesData.map((website) => website.sdg))].map(
                (sdg) => (
                  <option key={sdg} value={sdg}>
                    {sdg}
                  </option>
                )
              )}
            </select>
            <Filter
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50"
              size={20}
            />
          </div>

          <div className="relative">
            <select
              value={filter.sortBy}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, sortBy: e.target.value }))
              }
              className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-white/10 appearance-none pr-8"
            >
              <option value="ratings">Top Rated</option>
              <option value="newest">Newest</option>
              <option value="mostViewed">Most Viewed</option>
            </select>
            <ArrowUpDown
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50"
              size={20}
            />
          </div>
        </div>
      </div>

      {/* Websites Grid */}
      <motion.div className="grid md:grid-cols-3 gap-8">
        {filteredAndSortedWebsites.map((website) => (
          <motion.div
            key={website.id}
            variants={cardVariants}
            whileHover="hover"
            className="bg-gray-800/60 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform transition-all relative group"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"></div>

            <motion.img
              src={website.thumbnail}
              alt={website.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />

            <div className="p-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-bold text-white">
                  {website.title}
                </h3>
                <div className="flex items-center text-blue-400">
                  <Star size={20} className="mr-1" />
                  <span>{website.ratings.toFixed(1)}</span>
                </div>
              </div>

              <p className="text-sm text-gray-300 mb-4">
                {website.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xs text-green-500">{website.sdg}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedWebsite(website)}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-700 transition-colors"
                >
                  View Details
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Website Details Modal */}
      <AnimatePresence>
        {selectedWebsite && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedWebsite(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl max-w-2xl w-full p-8 relative border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={selectedWebsite.thumbnail}
                alt={selectedWebsite.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              <h2 className="text-3xl font-bold mb-4 text-white">
                {selectedWebsite.title}
              </h2>
              <p className="text-lg text-gray-300 mb-4">
                {selectedWebsite.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center text-blue-400 mb-2">
                    <Star size={24} className="mr-2" />
                    <span className="text-white">
                      {selectedWebsite.ratings.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">Ratings</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-white text-xl mb-2">
                    {selectedWebsite.views}
                  </div>
                  <p className="text-xs text-gray-400">Views</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-white text-xl mb-2">
                    {selectedWebsite.sdg.split(":")[0]}
                  </div>
                  <p className="text-xs text-gray-400">SDG</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedWebsite(null)}
                className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Websites;
