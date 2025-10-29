import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet"
import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import vehicleIconImg from "../assets/vehicle-icon.png"

const vehicleIcon = new L.Icon({
  iconUrl: vehicleIconImg,
  iconSize: [40, 40],
})

const lerp = (start, end, t) => start + (end - start) * t

function MapUpdater({ routeData, interpolatedPosition }) {
  const map = useMap()

  useEffect(() => {
    if (routeData.length > 0 && interpolatedPosition) {
      const { latitude, longitude } = interpolatedPosition
      map.setView([latitude, longitude], map.getZoom(), { animate: true })
    }
  }, [interpolatedPosition, routeData, map])

  return null
}

function MapView({ isPlaying, currentIndex, setCurrentIndex, routeData, setRouteData }) {
  const [positions, setPositions] = useState([])
  const [interpolatedPosition, setInterpolatedPosition] = useState(null)
  const animationRef = useRef(null)

  useEffect(() => {
    fetch("/dummy-route.json")
      .then(res => res.json())
      .then(data => {
        setRouteData(data)
        setPositions([data[0]])
        setInterpolatedPosition(data[0])
      })
  }, [setRouteData])

  useEffect(() => {
    if (!isPlaying || routeData.length === 0) return

    const duration = 2000
    let startTime = null

    function animate(time) {
      if (!startTime) startTime = time
      const elapsed = time - startTime
      const t = Math.min(elapsed / duration, 1)

      const current = routeData[currentIndex]
      const next = routeData[currentIndex + 1]

      if (next) {
        const lat = lerp(current.latitude, next.latitude, t)
        const lon = lerp(current.longitude, next.longitude, t)
        setInterpolatedPosition({ latitude: lat, longitude: lon })

        if (t < 1) {
          animationRef.current = requestAnimationFrame(animate)
        } else {
          setPositions(p => [...p, next])
          setCurrentIndex(prev => {
            if (prev < routeData.length - 2) {
              startTime = null
              animationRef.current = requestAnimationFrame(animate)
              return prev + 1
            } else {
              cancelAnimationFrame(animationRef.current)
              return prev
            }
          })
        }
      }
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationRef.current)
  }, [isPlaying, routeData, currentIndex, setCurrentIndex])

  if (routeData.length === 0) return <p className="p-4">Loading map...</p>

  const currentPosition =
    interpolatedPosition || routeData[currentIndex] || routeData[0]

  return (
    <MapContainer
      center={[routeData[0].latitude, routeData[0].longitude]}
      zoom={17}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      <MapUpdater
        routeData={routeData}
        currentIndex={currentIndex}
        interpolatedPosition={interpolatedPosition}
      />

      <Polyline
        positions={positions.map(p => [p.latitude, p.longitude])}
        color="blue"
      />

      <Marker
        position={[currentPosition.latitude, currentPosition.longitude]}
        icon={vehicleIcon}
      >
        <Popup>Vehicle Position</Popup>
      </Marker>
    </MapContainer>
  )
}

export default MapView
