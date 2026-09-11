import telemetryWave from '../assets/race-control/telemetry-wave.svg'

type TelemetryCardProps = {
  id: string
  label: string
  value: string
  unit?: string
  highest: string
  lowest: string
}

export function TelemetryCard({ label, value, unit, highest, lowest }: TelemetryCardProps) {
  return (
    <div className="flex h-28 min-h-24 bg-panel xl:h-auto xl:flex-1 xl:shrink-0">
      <div className="flex min-w-0 flex-1 flex-col justify-between p-3">
        <h3 className="text-base font-black text-accent">{label}</h3>
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
      <div className="w-2/5 shrink-0 overflow-hidden bg-panel-deep">
        <img src={telemetryWave} alt="" width={206} height={110} className="h-full w-full object-cover" />
      </div>
    </div>
  )
}
