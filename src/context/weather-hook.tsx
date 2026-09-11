import { createContext, useContext } from 'react'

type WeatherMetric = { label: string; value: string }

export const WeatherContext = createContext<WeatherMetric[] | null>(null)

export function useWeather() {
  const weatherMetrics = useContext(WeatherContext)

  if (!weatherMetrics) {
    throw new Error('useWeather must be used inside a WeatherProvider')
  }

  return weatherMetrics
}