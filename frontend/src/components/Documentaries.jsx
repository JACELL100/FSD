import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Filter, ArrowUpDown } from "lucide-react";

const documentariesData = [
  {
    id: 1,
    title: "Urban Renewable Energy Revolution",
    description: "Exploring sustainable energy solutions in urban environments",
    author: "Green City Innovators",
    sdg: "SDG 7: Affordable and Clean Energy",
    views: 1750,
    createdAt: new Date(2024, 2, 15),
    ratings: 4.6,
    thumbnail: "https://i0.wp.com/indianinfrastructure.com/wp-content/uploads/2019/10/24-1.jpg?resize=678%2C381&ssl=1",
  },
  {
    id: 2,
    title: "Digital Inclusion Across Generations",
    description: "Bridging the digital divide for elderly populations",
    author: "Tech Equity Project",
    sdg: "SDG 10: Reduced Inequalities",
    views: 2100,
    createdAt: new Date(2024, 1, 20),
    ratings: 4.8,
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtevc09xcISrDaDeR4qhtWp8vkKRuvyCgQrA&s",
  },
  {
    id: 3,
    title: "Water Security in Changing Climates",
    description: "Investigating water resource management challenges",
    author: "Global Water Research Team",
    sdg: "SDG 6: Clean Water and Sanitation",
    views: 1900,
    createdAt: new Date(2024, 3, 1),
    ratings: 4.4,
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMBD3C0fBoTxcjlHJy-6_VgO9_ejKRGzsVCA&s",
  },
];

const Documentaries = () => {
  const [selectedDocumentary, setSelectedDocumentary] = useState(null);
  const [filter, setFilter] = useState({
    sdg: "",
    sortBy: "ratings"
  });

  const filteredAndSortedDocumentaries = useMemo(() => {
    let result = [...documentariesData];

    // Filter by SDG
    if (filter.sdg) {
      result = result.filter((doc) => doc.sdg === filter.sdg);
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
      <h1 className="text-4xl font-lilita text-center text-yellow-400">
        📄 Documentaries
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
              {[...new Set(documentariesData.map((doc) => doc.sdg))].map((sdg) => (
                <option key={sdg} value={sdg}>
                  {sdg}
                </option>
              ))}
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

      {/* Documentaries Grid */}
      <motion.div className="grid md:grid-cols-3 gap-8">
        {filteredAndSortedDocumentaries.map((doc) => (
          <motion.div
            key={doc.id}
            variants={cardVariants}
            whileHover="hover"
            className="bg-gray-800/60 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform transition-all relative group"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-orange-600/20 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"></div>

            <motion.img
              src={doc.thumbnail}
              alt={doc.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />

            <div className="p-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-bold text-white">{doc.title}</h3>
                <div className="flex items-center text-yellow-400">
                  <FileText size={20} className="mr-1" />
                  <span>{doc.ratings.toFixed(1)}</span>
                </div>
              </div>

              <p className="text-sm text-gray-300 mb-4">{doc.description}</p>

              <div className="flex justify-between items-center">
                <span className="text-xs text-green-500">{doc.sdg}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDocumentary(doc)}
                  className="bg-yellow-600 text-white px-3 py-1 rounded-full text-xs hover:bg-yellow-700 transition-colors"
                >
                  View Details
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Documentary Details Modal */}
      <AnimatePresence>
        {selectedDocumentary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedDocumentary(null)}
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
                src={selectedDocumentary.thumbnail}
                alt={selectedDocumentary.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              <h2 className="text-3xl font-bold mb-4 text-white">
                {selectedDocumentary.title}
              </h2>
              <p className="text-lg text-gray-300 mb-4">
                {selectedDocumentary.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center text-yellow-400 mb-2">
                    <FileText size={24} className="mr-2" />
                    <span className="text-white">
                      {selectedDocumentary.ratings.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">Ratings</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-white text-xl mb-2">
                    {selectedDocumentary.views}
                  </div>
                  <p className="text-xs text-gray-400">Views</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-white text-xl mb-2">
                    {selectedDocumentary.sdg.split(":")[0]}
                  </div>
                  <p className="text-xs text-gray-400">SDG</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedDocumentary(null)}
                className="w-full bg-yellow-600 text-white py-3 rounded-full hover:bg-yellow-700 transition-colors"
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

export default Documentaries;