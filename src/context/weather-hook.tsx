import { createContext, useContext } from 'react'

export type WeatherMetricId = 'airTemp' | 'cloud' | 'humidity' | 'pressure' | 'wind'

export type WeatherMetric = { id: WeatherMetricId; label: string; value: string }

export const WeatherContext = createContext<WeatherMetric[] | null>(null)

export function useWeather() {
  const weatherMetrics = useContext(WeatherContext)

  if (!weatherMetrics) {
    throw new Error('useWeather must be used inside a WeatherProvider')
  }

  return weatherMetrics
}