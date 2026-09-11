import { carMetrics } from '../data/race-data'

export function EngineTelemetry() {
  return (
    <div className="flex h-36 flex-col justify-between bg-panel p-4">
      {carMetrics.map((metric) => (
        <div key={metric.id}>
          <div className="mb-1 flex justify-between text-xs leading-none font-black text-accent">
            <span>{metric.label}</span>
            <span>{metric.display}</span>
          </div>
          <div className="h-1 bg-accent/30">
            <div className={`h-full rounded-r-full ${metric.color}`} style={{ width: metric.fill }} />
          </div>
        </div>
      ))}
    </div>
  )
}
