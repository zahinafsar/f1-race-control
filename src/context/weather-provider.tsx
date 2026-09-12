import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { WeatherContext, type WeatherMetric } from './weather-hook'
import { random } from '../lib/utils'

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [weather, setWeather] = useState({ airTempC: 23.4, cloudCoverPercent: 13, humidityPercent: 75, pressureMb: 1012, windSpeedKmh: 7 })

  useEffect(() => {
    const timer = setInterval(() => {
      setWeather({
        airTempC: random(21, 5),
        cloudCoverPercent: random(8, 20),
        humidityPercent: random(68, 14),
        pressureMb: random(1008, 8),
        windSpeedKmh: random(4, 6),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const value = useMemo((): WeatherMetric[] => [
    { id: 'airTemp', label: 'Air Temp', value: `${weather.airTempC.toFixed(1)} c` },
    { id: 'cloud', label: 'Cloud', value: `${Math.round(weather.cloudCoverPercent)}%` },
    { id: 'humidity', label: 'Humidity', value: `${Math.round(weather.humidityPercent)}%` },
    { id: 'pressure', label: 'Pressure', value: `${Math.round(weather.pressureMb)} mb` },
    { id: 'wind', label: 'Wind', value: `${weather.windSpeedKmh.toFixed(2)} km/h` },
  ], [weather])

  return <WeatherContext value={value}>{children}</WeatherContext>
}
