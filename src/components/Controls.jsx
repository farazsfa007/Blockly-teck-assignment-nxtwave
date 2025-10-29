function Controls({ isPlaying, setIsPlaying }) {
    return (
        <div className="mt-6 flex justify-center gap-4">
        <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
            {isPlaying ? "Pause" : "Play"}
        </button>
        <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
            Reset
        </button>
        </div>
    )
}

export default Controls