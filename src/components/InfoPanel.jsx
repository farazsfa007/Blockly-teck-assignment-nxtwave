function InfoPanel({ routeData, currentIndex }) {
  if (!routeData.length) return <p>Loading data...</p>
  const current = routeData[currentIndex]

  return (
    <div className="space-y-2 text-gray-700">
      <h2 className="text-lg font-semibold mb-2">Current Info</h2>
      <p><strong>Latitude:</strong> {current.latitude.toFixed(6)}</p>
      <p><strong>Longitude:</strong> {current.longitude.toFixed(6)}</p>
      <p><strong>Timestamp:</strong> {new Date(current.timestamp).toLocaleTimeString()}</p>
    </div>
  )
}

export default InfoPanel