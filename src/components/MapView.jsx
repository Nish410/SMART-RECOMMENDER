import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Icon } from 'leaflet'
import { useEffect } from 'react'

// Fix for default marker icons in react-leaflet
delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Component to handle map center updates
function MapUpdater({ center, zoom }) {
  const map = useMap()
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom || map.getZoom())
    }
  }, [center, zoom, map])
  
  return null
}

function MapView({ places, selectedMood, selectedPlaceId = null }) {
  // Filter places based on selected mood
  const filteredPlaces = selectedMood === 'all' 
    ? places 
    : places.filter(place => place.mood === selectedMood)

  // Calculate center of map based on filtered places
  const getCenter = () => {
    if (filteredPlaces.length === 0) {
      return [12.9716, 77.5946] // Default to Bangalore city center
    }
    
    // If a specific place is selected, center on it
    if (selectedPlaceId) {
      const selectedPlace = filteredPlaces.find(p => p.id === selectedPlaceId)
      if (selectedPlace) {
        return selectedPlace.coordinates
      }
    }
    
    // Otherwise, center on average of all filtered places
    const avgLat = filteredPlaces.reduce((sum, p) => sum + p.coordinates[0], 0) / filteredPlaces.length
    const avgLng = filteredPlaces.reduce((sum, p) => sum + p.coordinates[1], 0) / filteredPlaces.length
    return [avgLat, avgLng]
  }

  const center = getCenter()

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={center}
        zoom={filteredPlaces.length === 1 ? 15 : 13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        key={`${selectedMood}-${selectedPlaceId}`} // Force re-render on mood change
        className="rounded-2xl"
      >
        <MapUpdater center={center} zoom={filteredPlaces.length === 1 ? 15 : 13} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredPlaces.map((place) => (
          <Marker 
            key={place.id} 
            position={place.coordinates}
            opacity={selectedPlaceId && selectedPlaceId !== place.id ? 0.5 : 1}
          >
            <Popup className="custom-popup">
              <div className="text-sm p-1">
                <h3 className="font-bold text-gray-900 mb-1.5 text-base">{place.name}</h3>
                <p className="text-gray-600 text-xs mb-3 leading-relaxed">{place.description}</p>
                <div className="flex items-center gap-3 pt-2 border-t border-gray-200">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-gray-800 font-semibold">{place.rating}</span>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full capitalize font-medium">
                    {place.mood}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapView

