import { motion } from 'framer-motion'
import { Coffee, Zap, Heart, Mountain, Sparkles, MapPin } from 'lucide-react'

const MOODS = [
  { 
    id: 'all', 
    label: 'All Places', 
    icon: MapPin, 
    gradient: 'from-gray-600 via-gray-700 to-gray-800',
    glow: 'shadow-gray-500/50',
    ring: 'ring-gray-400'
  },
  { 
    id: 'work', 
    label: 'Work', 
    icon: Coffee, 
    gradient: 'from-blue-500 via-blue-600 to-indigo-700',
    glow: 'shadow-blue-500/50',
    ring: 'ring-blue-400'
  },
  { 
    id: 'quick bite', 
    label: 'Quick Bite', 
    icon: Zap, 
    gradient: 'from-orange-500 via-orange-600 to-red-600',
    glow: 'shadow-orange-500/50',
    ring: 'ring-orange-400'
  },
  { 
    id: 'romantic', 
    label: 'Romantic', 
    icon: Heart, 
    gradient: 'from-pink-500 via-rose-600 to-pink-700',
    glow: 'shadow-pink-500/50',
    ring: 'ring-pink-400'
  },
  { 
    id: 'adventure', 
    label: 'Adventure', 
    icon: Mountain, 
    gradient: 'from-green-500 via-emerald-600 to-teal-700',
    glow: 'shadow-green-500/50',
    ring: 'ring-green-400'
  },
  { 
    id: 'relax', 
    label: 'Relax', 
    icon: Sparkles, 
    gradient: 'from-purple-500 via-violet-600 to-purple-700',
    glow: 'shadow-purple-500/50',
    ring: 'ring-purple-400'
  },
]

function MoodSelector({ selectedMood, onMoodChange }) {
  return (
    <div className="mb-10">
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-black text-white mb-2 drop-shadow-2xl bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
          What's your mood?
        </h2>
        <p className="text-base text-white/80 font-medium">Select a mood to discover amazing places in Bangalore</p>
      </motion.div>
      
      <div className="flex flex-wrap gap-4">
        {MOODS.map((mood, index) => {
          const IconComponent = mood.icon
          const isSelected = selectedMood === mood.id
          
          return (
            <motion.button
              key={mood.id}
              onClick={() => onMoodChange(mood.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
              className={`
                group relative flex items-center gap-3 px-7 py-5 rounded-2xl font-black text-lg
                transition-all duration-300 overflow-hidden
                ${isSelected 
                  ? `bg-gradient-to-r ${mood.gradient} text-white shadow-2xl ${mood.glow} scale-110 ring-4 ${mood.ring} ring-offset-4 ring-offset-transparent` 
                  : 'bg-white/10 backdrop-blur-md text-white/90 hover:text-white border-2 border-white/20 hover:border-white/40 hover:bg-white/20 hover:scale-105'
                }
              `}
              whileHover={{ scale: isSelected ? 1.15 : 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated background shimmer */}
              {isSelected && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear"
                  }}
                />
              )}
              
              <IconComponent className={`w-6 h-6 relative z-10 ${isSelected ? 'drop-shadow-lg' : ''}`} />
              <span className="relative z-10">{mood.label}</span>
              
              {/* Glow effect */}
              {isSelected && (
                <motion.div
                  className={`absolute inset-0 rounded-2xl blur-xl ${mood.glow} opacity-75`}
                  animate={{ opacity: [0.5, 0.75, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default MoodSelector
export { MOODS }
