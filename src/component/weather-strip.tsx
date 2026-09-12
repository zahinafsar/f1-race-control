import { Cloud, Droplets, Gauge, Thermometer, Wind, type LucideIcon } from 'lucide-react'
import { useWeather, type WeatherMetricId } from '../context/weather-hook'

const metricIcons: Record<WeatherMetricId, LucideIcon> = {
  airTemp: Thermometer,
  cloud: Cloud,
  humidity: Droplets,
  pressure: Gauge,
  wind: Wind,
}

export function WeatherStrip() {
  const weatherMetrics = useWeather()

  return (
    <div className="mt-4 shrink-0 bg-panel-deep p-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {weatherMetrics.map((metric) => {
          const MetricIcon = metricIcons[metric.id]

          return (
            <div
              key={metric.id}
              className="flex min-h-12 min-w-0 items-center gap-2.5 bg-accent/20 px-3 py-2"
            >
              <div className="min-w-0">
                <div className="text-xs leading-tight font-black text-white/60">
                  {metric.label}
                </div>
                <div className="text-base leading-tight font-black">
                  {metric.value}
                </div>
              </div>
              <MetricIcon className="ml-auto size-5 shrink-0 text-white/50" strokeWidth={2.5} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
