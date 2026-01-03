import { useState, useMemo } from 'react'
import Header from './components/Header'
import MoodSelector from './components/MoodSelector'
import MapView from './components/MapView'
import PlaceList from './components/PlaceList'
import placesData from './data/places.json'
import { calculateDistance } from './utils/distance'

// User's current location - Bangalore (Koramangala area)
const USER_LOCATION = [12.9352, 77.6245] // Bangalore, Karnataka

function App() {
  const [selectedMood, setSelectedMood] = useState('all')
  const [selectedPlaceId, setSelectedPlaceId] = useState(null)

  // Filter places based on selected mood
  const filteredPlaces = useMemo(() => {
    if (selectedMood === 'all') {
      return placesData
    }
    return placesData.filter(place => place.mood === selectedMood)
  }, [selectedMood])

  // Calculate distances for filtered places
  const placesWithDistance = useMemo(() => {
    return filteredPlaces.map(place => ({
      ...place,
      distance: calculateDistance(
        USER_LOCATION[0],
        USER_LOCATION[1],
        place.coordinates[0],
        place.coordinates[1]
      )
    })).sort((a, b) => a.distance - b.distance)
  }, [filteredPlaces])

  const handleMoodChange = (moodId) => {
    setSelectedMood(moodId)
    setSelectedPlaceId(null) // Clear selection when mood changes
  }

  const handlePlaceSelect = (placeId) => {
    setSelectedPlaceId(placeId === selectedPlaceId ? null : placeId)
  }

  const handleClearSelection = () => {
    setSelectedPlaceId(null)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background - Enhanced */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 animate-gradient-xy"></div>
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <Header 
          resultCount={filteredPlaces.length}
          selectedMood={selectedMood}
          selectedPlaceId={selectedPlaceId}
          onClearSelection={handleClearSelection}
          city="Bangalore"
        />

        <main className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
          {/* Mood Selector Section */}
          <MoodSelector 
            selectedMood={selectedMood}
            onMoodChange={handleMoodChange}
          />

          {/* Main Content Grid - Better Spacing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Map View - More Prominent */}
            <div className="order-2 lg:order-1">
              <div className="sticky top-24 h-[550px] sm:h-[650px] lg:h-[750px]">
                <div className="h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30 bg-white/10 backdrop-blur-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 pointer-events-none z-10"></div>
                  <MapView 
                    places={placesData} 
                    selectedMood={selectedMood} 
                    selectedPlaceId={selectedPlaceId}
                  />
                </div>
              </div>
            </div>

            {/* Places List - Better Spacing */}
            <div className="order-1 lg:order-2">
              <div className="mb-8">
                <h3 className="text-4xl sm:text-5xl font-black text-white mb-4 drop-shadow-2xl bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Nearby Places
                </h3>
                <p className="text-lg text-white/90 font-bold drop-shadow-lg flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  <span>Sorted by distance from you</span>
                </p>
              </div>
              <PlaceList 
                places={placesWithDistance}
                selectedPlaceId={selectedPlaceId}
                onPlaceSelect={handlePlaceSelect}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
