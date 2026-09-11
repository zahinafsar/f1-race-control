import type { TyreCondition } from '../data/tyre-condition'

export type TyreTooltipProps = {
  label: string
  temperature: string
  pressure: string
  condition: TyreCondition
}

type TyreTooltipTextProps = TyreTooltipProps & {
  x: number
  y: number
}

export function TyreTooltipText({ label, temperature, pressure, condition, x, y }: TyreTooltipTextProps) {
  return (
    <g transform={`translate(${x} ${y})`} className="text-xs font-black">
      <text x={14} y={24} fill="white">{label}</text>
      <text x={240} y={24} fill="white" textAnchor="end" className="uppercase">{condition}</text>
      <g fill="#B684FF">
        <text x={14} y={54}>Temperature</text>
        <text x={14} y={69}>Pressure</text>
        <text x={240} y={54} textAnchor="end">{temperature}°C</text>
        <text x={240} y={69} textAnchor="end">{pressure} bar</text>
      </g>
    </g>
  )
}
