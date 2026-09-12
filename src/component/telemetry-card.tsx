import type { LucideIcon } from 'lucide-react'
import { TelemetryChart } from './telemetry-chart'

type TelemetryCardProps = {
  id: string
  label: string
  value: string
  unit?: string
  icon: LucideIcon
  highest: string
  lowest: string
  series: number[]
  curve: 'linear' | 'natural' | 'monotone'
}

export function TelemetryCard({ id, label, value, unit, icon: CardIcon, highest, lowest, series, curve }: TelemetryCardProps) {
  return (
    <div className="flex min-h-28 bg-panel xl:h-auto xl:flex-1 xl:shrink-0">
      <div className="flex min-w-0 flex-1 flex-col justify-between p-4">
        <h3 className="flex items-center gap-2 text-sm font-black text-accent xl:text-base">
          <CardIcon className="size-4 shrink-0 xl:size-5" strokeWidth={2.5} />
          {label}
        </h3>
        <div className="flex flex-wrap items-end justify-between gap-1">
          <div className="text-2xl leading-none font-black">
            {value}{unit ? <span className="ml-1 text-xs">{unit}</span> : null}
          </div>
          <div className="text-xs text-right leading-tight text-white/60">
            <div>Highest <span className="text-white/80">{highest}</span></div>
            <div>Lowest <span className="text-white/80">{lowest}</span></div>
          </div>
        </div>
      </div>
      <div className="w-1/2 shrink-0 overflow-hidden bg-panel-deep xl:w-3/5">
        <TelemetryChart id={id} series={series} curve={curve} unit={unit} />
      </div>
    </div>
  )
}
