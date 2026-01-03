import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

function Header({ resultCount, selectedMood, selectedPlaceId, onClearSelection, city = "Bangalore" }) {
  return (
    <header className="relative bg-gradient-to-r from-black/40 via-purple-900/40 to-pink-900/40 backdrop-blur-2xl border-b-2 border-white/20 sticky top-0 z-50 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
      
      <div className="relative container mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-2 bg-gradient-to-r from-white via-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent drop-shadow-2xl">
              Smart Recommender
            </h1>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-300 animate-pulse" />
              <p className="text-sm sm:text-base text-white/90 font-semibold">
                Discover amazing places in <span className="text-purple-300 font-black">{city}</span>
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {selectedPlaceId && (
              <motion.button
                onClick={onClearSelection}
                className="text-xs sm:text-sm text-white/90 hover:text-white font-bold px-4 py-2 rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear
              </motion.button>
            )}
            <motion.div 
              className="text-right bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-blue-500/30 backdrop-blur-xl px-5 py-4 rounded-2xl border-2 border-white/30 shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="text-4xl sm:text-5xl font-black text-white drop-shadow-2xl bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                {resultCount}
              </div>
              <div className="text-sm text-white font-black mt-1">
                {resultCount === 1 ? 'place' : 'places'}
                {selectedMood !== 'all' && (
                  <span className="ml-2 capitalize text-yellow-300 drop-shadow-lg">• {selectedMood}</span>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </header>
  )
}

export default Header
