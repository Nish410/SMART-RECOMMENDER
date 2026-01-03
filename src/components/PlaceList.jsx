import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import PlaceCard from './PlaceCard'

function PlaceList({ places, selectedPlaceId, onPlaceSelect }) {
  if (places.length === 0) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center h-full min-h-[500px] bg-white/5 backdrop-blur-xl rounded-3xl border-2 border-dashed border-white/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-20 h-20 text-purple-300 mb-6 drop-shadow-2xl" />
        </motion.div>
        <p className="text-2xl font-black text-white mb-2 drop-shadow-lg">No places found</p>
        <p className="text-base text-white/70 font-bold">Try selecting a different mood</p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6 max-h-[700px] overflow-y-auto pr-3 custom-scrollbar">
      <AnimatePresence mode="popLayout">
        {places.map((place, index) => (
          <PlaceCard
            key={place.id}
            place={place}
            isSelected={selectedPlaceId === place.id}
            onClick={() => onPlaceSelect(place.id)}
            index={index}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default PlaceList
