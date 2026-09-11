import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { WeatherContext } from './weather-hook'
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

  const value = useMemo(() => [
    { label: 'Air Temp', value: `${weather.airTempC.toFixed(1)} c` },
    { label: 'Cloud', value: `${Math.round(weather.cloudCoverPercent)}%` },
    { label: 'Humidity', value: `${Math.round(weather.humidityPercent)}%` },
    { label: 'Pressure', value: `${Math.round(weather.pressureMb)} mb` },
    { label: 'Wind', value: `${weather.windSpeedKmh.toFixed(2)} km/h` },
  ], [weather])

  return <WeatherContext value={value}>{children}</WeatherContext>
}
