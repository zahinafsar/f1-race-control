import { carLimits, useCar, type CarMetricId } from '../context/car-hook'

const metricDetails: Record<CarMetricId, { label: string; unit: string; color: string }> = {
  rpm: { label: 'RPM', unit: '', color: 'bg-linear-to-r from-green-700 to-yellow-300' },
  engine: { label: 'ENGINE TEMP', unit: ' C', color: 'bg-linear-to-r from-green-700 via-yellow-300 to-red-500' },
  fuel: { label: 'FUEL', unit: '%', color: 'bg-green-700' },
  brakes: { label: 'BRAKE TEMP', unit: ' C', color: 'bg-linear-to-r from-green-700 to-yellow-300' },
}

export function EngineTelemetry() {
  const { metrics } = useCar()

  return (
    <div className="flex h-36 flex-col justify-between bg-panel p-4">
      {(Object.keys(metricDetails) as CarMetricId[]).map((id) => {
        const details = metricDetails[id]
        const fill = metrics[id]

        return (
          <div key={id}>
            <div className="mb-1 flex justify-between text-xs leading-none font-black text-accent">
              <span>{details.label}</span>
              <span>{Math.round((fill / 100) * carLimits[id])}{details.unit}</span>
            </div>
            <div className="h-1 bg-accent/30">
              <div className={`h-full rounded-r-full transition-[width] duration-1000 ease-linear ${details.color}`} style={{ width: `${fill}%` }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
