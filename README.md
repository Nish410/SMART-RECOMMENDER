# 🗺️ Smart Recommender

A modern, interactive location recommendation app that helps you find the perfect place based on your current mood. Built with React, Leaflet maps, and smart distance calculations.

![Smart Recommender](https://img.shields.io/badge/React-19.2.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4.1.18-38bdf8) ![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-green)

##  Features

- **Mood-Based Filtering**: Find places that match your current mood (Work, Quick Bite, Romantic, Adventure, Relax)
- **Interactive Map**: Real-time map with markers that update based on your selection
- **Smart Distance Calculation**: Uses the Haversine formula to calculate accurate distances
- **Beautiful UI**: Modern gradient design with smooth animations using Framer Motion
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Click to Focus**: Click any place in the list to focus it on the map

##  Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | React 19.2.0 | Core UI framework |
| Styling | Tailwind CSS v4 | Utility-first CSS |
| Maps | Leaflet.js + react-leaflet | Interactive maps |
| Icons | Lucide React | Beautiful vector icons |
| Animations | Framer Motion | Smooth transitions |
| Build Tool | Vite | Fast development server |

##  Installation

1. **Clone or navigate to the project**
   ```bash
   cd smart-recommender
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - The terminal will show a local URL (usually `http://localhost:5173`)
   - Open that URL in your browser

##  Usage

1. **Select Your Mood**: Click on any mood button (Work, Quick Bite, Romantic, Adventure, Relax, or All Places)
2. **View Results**: The map and list will automatically filter to show matching places
3. **Explore**: Click on any place in the list to focus it on the map
4. **Check Distance**: See how far each place is from your location

## 📁 Project Structure

```
smart-recommender/
├── src/
│   ├── components/
│   │   └── MapView.jsx          # Leaflet map component
│   ├── data/
│   │   └── places.json          # Location data (12 sample places)
│   ├── utils/
│   │   └── distance.js          # Haversine distance calculation
│   ├── App.jsx                  # Main application component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Tailwind CSS directives
├── index.html                   # HTML entry point
├── package.json                 # Dependencies and scripts
└── tailwind.config.js          # Tailwind configuration
```

##  Distance Calculation

The app uses the **Haversine Formula** to calculate the great-circle distance between two points on Earth:

```
d = 2r × arcsin(√(sin²(Δφ/2) + cos(φ₁) × cos(φ₂) × sin²(Δλ/2)))
```

Where:
- `r` = Earth's radius (6,371 km)
- `φ₁, φ₂` = latitudes of the two points
- `λ₁, λ₂` = longitudes of the two points

##  Available Moods

- **☕ Work**: Coffee shops and co-working spaces
- **⚡ Quick Bite**: Fast food and quick meal options
- **❤️ Date**: Fine dining and intimate restaurants
- **⛰️ Adventure**: Parks, beaches, and outdoor activities
- **✨ Relax**: Spas and tranquil spaces

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

##  Future Enhancements (Phase 4)

- Real user geolocation
- Open hours checking
- Route directions
- Advanced filtering (price, rating thresholds)
- User reviews and ratings
- Favorite places

##  License

This project is open source and available for personal and educational use.

##  Credits

- **Leaflet**: Open-source mapping library
- **OpenStreetMap**: Free map tiles
- **Lucide**: Beautiful icon library
- **Framer Motion**: Animation library

---

Built with ❤️ using React and modern web technologies.
