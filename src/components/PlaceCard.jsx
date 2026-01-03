import { motion } from 'framer-motion'
import { Star, MapPin, Sparkles, TrendingUp, Award } from 'lucide-react'
import { formatDistance } from '../utils/distance'
import { MOODS } from './MoodSelector'

function PlaceCard({ place, isSelected, onClick, index = 0 }) {
  const moodConfig = MOODS.find(m => m.id === place.mood) || MOODS[0]
  const MoodIcon = moodConfig.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -20, scale: 0.9 }}
      transition={{ 
        delay: index * 0.05, 
        duration: 0.4,
        type: "spring",
        stiffness: 100
      }}
      onClick={onClick}
      className={`
        group relative overflow-hidden rounded-3xl cursor-pointer
        transition-all duration-500
        ${isSelected 
          ? 'ring-4 ring-yellow-400 ring-offset-4 ring-offset-transparent scale-[1.02] shadow-2xl shadow-yellow-400/30' 
          : 'shadow-xl hover:shadow-2xl'
        }
      `}
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image Background with Better Aspect Ratio */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.6 }}
        />
        {/* Gradient Overlay - More Vibrant */}
        <div className={`absolute inset-0 bg-gradient-to-br ${moodConfig.gradient} ${isSelected ? 'opacity-90' : 'opacity-75 group-hover:opacity-85'} transition-opacity duration-300`} />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>
      
      {/* Glassmorphism Content - Better Layout */}
      <div className="relative bg-white/5 backdrop-blur-xl border-2 border-white/40 p-6 h-full min-h-[320px] flex flex-col">
        {/* Selection Glow - More Prominent */}
        {isSelected && (
          <>
            <motion.div
              className={`absolute -inset-2 bg-gradient-to-r ${moodConfig.gradient} rounded-3xl blur-2xl ${moodConfig.glow} opacity-80`}
              animate={{ opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-4 left-4 z-30"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-2xl shadow-2xl border-2 border-yellow-300/50">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-white" />
                  <span className="text-xs font-black text-white drop-shadow-lg tracking-wide">SELECTED</span>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {/* Top Section - Name and Icon */}
        <div className="flex items-start justify-between mb-5 relative z-10">
          <div className="flex-1 min-w-0 pr-4">
            <h3 className="text-3xl sm:text-4xl font-black text-white mb-3 drop-shadow-2xl leading-tight">
              {place.name}
            </h3>
            <p className="text-base sm:text-lg text-white/95 leading-relaxed line-clamp-2 font-bold drop-shadow-lg">
              {place.description}
            </p>
          </div>
          <motion.div 
            className={`
              p-4 rounded-2xl flex-shrink-0
              ${isSelected ? 'bg-yellow-400/40 shadow-2xl shadow-yellow-400/50 border-2 border-yellow-300/50' : 'bg-white/25 group-hover:bg-white/35 border-2 border-white/30'}
              transition-all duration-300
            `}
            whileHover={{ rotate: [0, -15, 15, -15, 0], scale: 1.2 }}
            transition={{ duration: 0.6 }}
          >
            <MoodIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-2xl" />
          </motion.div>
        </div>
        
        {/* Bottom Section - Stats - MORE PROMINENT */}
        <div className="mt-auto pt-5 border-t-2 border-white/40 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Left Side - Rating and Mood */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* Rating - EXTRA PROMINENT */}
              <motion.div 
                className="flex items-center gap-2.5 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-sm border-2 border-yellow-300/60"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Star className="w-6 h-6 text-white fill-white drop-shadow-lg" />
                <span className="text-2xl font-black text-white drop-shadow-2xl">{place.rating}</span>
                <TrendingUp className="w-5 h-5 text-white drop-shadow-lg" />
              </motion.div>
              
              {/* Mood Badge - More Prominent */}
              <span className="text-sm sm:text-base px-4 py-2.5 bg-white/35 backdrop-blur-md rounded-2xl font-black text-white capitalize border-2 border-white/50 shadow-xl">
                {place.mood}
              </span>
            </div>
            
            {/* Right Side - Distance - EXTRA PROMINENT */}
            <motion.div 
              className="flex items-center gap-2.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-500 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-sm border-2 border-blue-300/60"
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <MapPin className="w-6 h-6 text-white drop-shadow-lg" />
              <span className="text-2xl font-black text-white drop-shadow-2xl">{formatDistance(place.distance)}</span>
            </motion.div>
          </div>
        </div>

        {/* Hover Sparkle Effect - More Visible */}
        {!isSelected && (
          <motion.div
            className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity z-20"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
          >
            <Sparkles className="w-8 h-8 text-yellow-300 drop-shadow-2xl" />
          </motion.div>
        )}

        {/* Top Right Corner Badge - Rating Preview */}
        <div className="absolute top-4 right-4 z-20 opacity-80 group-hover:opacity-100 transition-opacity">
          <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span className="text-sm font-black text-white">{place.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PlaceCard
