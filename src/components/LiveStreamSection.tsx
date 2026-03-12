
export default function LiveStreamSection() {
  const liveStreamUrl = process.env.NEXT_PUBLIC_LIVE_STREAM_URL || 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  const provider = process.env.NEXT_PUBLIC_LIVE_STREAM_PROVIDER || 'youtube'

  return (
    <div className="bg-secondary-light rounded-lg overflow-hidden shadow-lg-custom">
      <div className="bg-gradient-primary p-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse-custom"></div>
          <h3 className="text-white font-bold uppercase tracking-wider text-sm">Watch Live</h3>
        </div>
      </div>

      <div className="aspect-video bg-black relative">
        {provider === 'youtube' && (
          <iframe
            className="w-full h-full"
            src={liveStreamUrl}
            title="Live Stream"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
        {provider === 'mux' && (
          <iframe
            className="w-full h-full"
            src={liveStreamUrl}
            title="Live Stream"
            allow="autoplay"
            allowFullScreen
          ></iframe>
        )}
      </div>

      <div className="p-4 border-t border-secondary">
        <p className="text-gray-300 text-sm">
          <strong>Currently Broadcasting:</strong> Live News Coverage
        </p>
        <p className="text-gray-400 text-xs mt-2">
          Tune in for breaking news and live updates throughout the day.
        </p>
      </div>
    </div>
  )
}
