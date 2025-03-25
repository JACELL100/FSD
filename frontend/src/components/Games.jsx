import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loadFull } from "tsparticles";
import { Star, Filter, ArrowUpDown } from "lucide-react";

const gamesData = [
  {
    id: 1,
    title: "Snake Multiplayer",
    description: "A multiplayer snake game built using Pygame",
    ratings: 4.5,
    sdg: "SDG 3: Good Health and Well-being",
    views: 1200,
    createdAt: new Date(2024, 2, 15),
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT1ZrWDH4RlL9gWEah5r401YHw5MEEiuYRIoORMG-zfXod7SGt_9tQODFor7su83yMwDdW7-95eH6GsZFGwZYCVT9h8yjtOwgRLiFvYi-TY",
  },
  {
    id: 2,
    title: "Climate Change Simulator",
    description: "An interactive game exploring environmental challenges",
    ratings: 4.8,
    sdg: "SDG 13: Climate Action",
    views: 2500,
    createdAt: new Date(2024, 3, 1),
    thumbnail:
      "https://uwaterloo.ca/climate-institute/sites/default/files/styles/large/public/uploads/images/illuminate_mitigation_screen.png?itok=68i_tLHY",
  },
  {
    id: 3,
    title: "Space Exploration Adventure",
    description:
      "Educational space exploration game with scientific challenges",
    ratings: 4.2,
    sdg: "SDG 4: Quality Education",
    views: 1800,
    createdAt: new Date(2024, 1, 10),
    thumbnail:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1718870/capsule_616x353.jpg?t=1721124425",
  },
];

const Games = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [particlesLoaded, setParticlesLoaded] = useState(false);
  const [filter, setFilter] = useState({
    sdg: "",
    sortBy: "ratings",
  });

  const particlesInit = async (main) => {
    await loadFull(main);
    setParticlesLoaded(true);
  };

  const filteredAndSortedGames = useMemo(() => {
    let result = [...gamesData];

    // Filter by SDG
    if (filter.sdg) {
      result = result.filter((game) => game.sdg === filter.sdg);
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
          🎮 Games
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
              {[...new Set(gamesData.map((game) => game.sdg))].map((sdg) => (
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

      {/* Games Grid */}
      <motion.div className="grid md:grid-cols-3 gap-8">
        {filteredAndSortedGames.map((game) => (
          <motion.div
            key={game.id}
            variants={cardVariants}
            whileHover="hover"
            className="bg-gray-800/60 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform transition-all relative group"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"></div>

            <motion.img
              src={game.thumbnail}
              alt={game.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />

            <div className="p-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-bold text-white">{game.title}</h3>
                <div className="flex items-center text-yellow-400">
                  <Star size={20} fill="currentColor" className="mr-1" />
                  <span>{game.ratings.toFixed(1)}</span>
                </div>
              </div>

              <p className="text-sm text-gray-300 mb-4">{game.description}</p>

              <div className="flex justify-between items-center">
                <span className="text-xs text-green-500">{game.sdg}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedGame(game)}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-700 transition-colors"
                >
                  View Details
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Game Details Modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedGame(null)}
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
                src={selectedGame.thumbnail}
                alt={selectedGame.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              <h2 className="text-3xl font-bold mb-4 text-white">
                {selectedGame.title}
              </h2>
              <p className="text-lg text-gray-300 mb-4">
                {selectedGame.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center text-yellow-400 mb-2">
                    <Star size={24} fill="currentColor" className="mr-2" />
                    <span className="text-white">
                      {selectedGame.ratings.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">Ratings</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-white text-xl mb-2">
                    {selectedGame.views}
                  </div>
                  <p className="text-xs text-gray-400">Views</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 text-center">
                  <div className="text-white text-xl mb-2">
                    {selectedGame.sdg.split(":")[0]}
                  </div>
                  <p className="text-xs text-gray-400">SDG</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedGame(null)}
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

export default Games;
