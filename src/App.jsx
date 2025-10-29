import { useState } from "react"
import MapView from "./components/MapView"
import Controls from "./components/Controls"
import InfoPanel from "./components/InfoPanel"

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [routeData, setRouteData] = useState([])

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="p-4 bg-blue-600 text-white text-center font-bold text-xl">
        Vehicle Movement Simulator 🚗
      </header>

      <main className="flex-1 flex flex-col md:flex-row">
        <div className="flex-1">
          <MapView
            isPlaying={isPlaying}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            routeData={routeData}
            setRouteData={setRouteData}
          />
        </div>

        <aside className="w-full md:w-80 p-4 bg-white border-t md:border-t-0 md:border-l border-gray-300">
          <InfoPanel routeData={routeData} currentIndex={currentIndex} />
          <Controls isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        </aside>
      </main>
    </div>
  )
}
