import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Filter, ArrowUpDown } from "lucide-react";

const digitalArtData = [
  {
    id: 1,
    title: "Climate Change Visualization",
    description:
      "Digital art piece depicting global environmental transformation",
    author: "Eco Visual Artists",
    sdg: "SDG 13: Climate Action",
    views: 1600,
    createdAt: new Date(2024, 2, 10),
    ratings: 4.5,
    thumbnail: "https://www.noaa.gov/sites/default/files/styles/landscape_width_1275/public/2022-03/PHOTO-Climate-Collage-Diagonal-Design-NOAA-Communications-NO-NOAA-Logo.jpg",
  },
  {
    id: 2,
    title: "Interconnected Communities",
    description: "Artistic representation of global social connectivity",
    author: "Global Unity Creators",
    sdg: "SDG 17: Partnerships for the Goals",
    views: 1900,
    createdAt: new Date(2024, 1, 25),
    ratings: 4.7,
    thumbnail: "https://www.liverpool.ac.uk/media/livacuk/centre-for-innovation-in-education/staff-guides/learning-communities/people-interconnected-by-lines-banner.jpg",
  },
  {
    id: 3,
    title: "Future of Education",
    description: "Innovative visual narrative of learning technologies",
    author: "EdTech Visionaries",
    sdg: "SDG 4: Quality Education",
    views: 1750,
    createdAt: new Date(2024, 3, 5),
    ratings: 4.3,
    thumbnail: "https://rahuleducation.org/wp-content/uploads/2022/02/future-education-scaled.jpg",
  },
];

const DigitalArt = () => {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [filter, setFilter] = useState({
    sdg: "",
    sortBy: "ratings",
  });

  const filteredAndSortedArtworks = useMemo(() => {
    let result = [...digitalArtData];

    // Filter by SDG
    if (filter.sdg) {
      result = result.filter((art) => art.sdg === filter.sdg);
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
      <h1 className="text-4xl font-lilita text-center text-purple-400">
        🎨 Digital Art
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
              {[...new Set(digitalArtData.map((art) => art.sdg))].map((sdg) => (
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

      {/* Digital Art Grid */}
      <motion.div className="grid md:grid-cols-3 gap-8">
        {filteredAndSortedArtworks.map((art) => (
          <motion.div
            key={art.id}
            variants={cardVariants}
            whileHover="hover"
            className="bg-gray-800/60 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform transition-all relative group"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"></div>

            <motion.img
              src={art.thumbnail}
              alt={art.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />

            <div className="p-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-bold text-white">{art.title}</h3>
                <div className="flex items-center text-purple-400">
                  <Palette size={20} className="mr-1" />
                  <span>{art.ratings.toFixed(1)}</span>
                </div>
              </div>

              <p className="text-sm text-gray-300 mb-4">{art.description}</p>

              <div className="flex justify-between items-center">
                <span className="text-xs text-green-500">{art.sdg}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedArtwork(art)}
                  className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs hover:bg-purple-700 transition-colors"
                >
                  View Details
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Artwork Details Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedArtwork(null)}
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
                src={selectedArtwork.thumbnail}
                alt={selectedArtwork.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              <h2 className="text-3xl font-bold mb-4 text-white">
                {selectedArtwork.title}
              </h2>
              <p className="text-lg text-gray-300 mb-4">
                {selectedArtwork.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center text-purple-400 mb-2">
                    <Palette size={24} className="mr-2" />
                    <span className="text-white">
                      {selectedArtwork.ratings.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">Ratings</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-white text-xl mb-2">
                    {selectedArtwork.views}
                  </div>
                  <p className="text-xs text-gray-400">Views</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-white text-xl mb-2">
                    {selectedArtwork.sdg.split(":")[0]}
                  </div>
                  <p className="text-xs text-gray-400">SDG</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedArtwork(null)}
                className="w-full bg-purple-600 text-white py-3 rounded-full hover:bg-purple-700 transition-colors"
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

export default DigitalArt;
