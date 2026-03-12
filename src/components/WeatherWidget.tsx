
import { useEffect, useState } from 'react'

interface WeatherData {
  temp: number
  condition: string
  humidity: number
  windSpeed: number
  location: string
  icon: string
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY
        const lat = process.env.NEXT_PUBLIC_WEATHER_LAT || '40.7128'
        const lon = process.env.NEXT_PUBLIC_WEATHER_LON || '-74.0060'
        const location = process.env.NEXT_PUBLIC_WEATHER_LOCATION || 'New York'

        if (!apiKey) {
          // Mock data if no API key
          setWeather({
            temp: 72,
            condition: 'Partly Cloudy',
            humidity: 65,
            windSpeed: 12,
            location: location,
            icon: '⛅',
          })
          setLoading(false)
          return
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
        )
        const data = await response.json()

        setWeather({
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed),
          location: location,
          icon: getWeatherIcon(data.weather[0].main),
        })
      } catch (error) {
        console.error('Weather fetch error:', error)
        // Fallback to mock data
        setWeather({
          temp: 72,
          condition: 'Partly Cloudy',
          humidity: 65,
          windSpeed: 12,
          location: 'New York',
          icon: '⛅',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
    // Refresh every 10 minutes
    const interval = setInterval(fetchWeather, 600000)
    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = (condition: string): string => {
    const icons: { [key: string]: string } = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
    }
    return icons[condition] || '⛅'
  }

  if (loading || !weather) {
    return (
      <div className="bg-secondary-light rounded-lg p-6 animate-pulse">
        <div className="h-4 bg-secondary rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-secondary rounded w-3/4"></div>
      </div>
    )
  }

  return (
    <div className="bg-secondary-light rounded-lg p-6 shadow-lg-custom">
      <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4 font-display">Weather</h3>

      <div className="text-center mb-6">
        <div className="text-5xl mb-2">{weather.icon}</div>
        <p className="text-gray-400 text-sm mb-2">{weather.location}</p>
        <div className="text-4xl font-bold text-white">
          {weather.temp}°<span className="text-2xl">F</span>
        </div>
        <p className="text-gray-300 text-sm mt-2">{weather.condition}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-secondary">
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-wider">Humidity</p>
          <p className="text-white font-bold text-lg">{weather.humidity}%</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-wider">Wind</p>
          <p className="text-white font-bold text-lg">{weather.windSpeed} mph</p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-primary bg-opacity-20 border border-primary rounded text-sm text-gray-300">
        <p>Check back for hourly updates and extended forecast.</p>
      </div>
    </div>
  )
}
