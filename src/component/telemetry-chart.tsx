import { Area, AreaChart, CartesianGrid, DefaultZIndexes, ResponsiveContainer, Tooltip, XAxis, YAxis, ZIndexLayer, usePlotArea, type TooltipContentProps } from 'recharts'

type TelemetryChartProps = {
  id: string
  series: number[]
  curve: 'linear' | 'natural' | 'monotone'
  unit?: string
}

const windowStartSeconds = 10 * 3600 + 15 * 60 + 23
const windowSeconds = 90

const gutterWidth = 34
const gutterHeight = 20

const tickStyle = { fill: '#ffffff', fillOpacity: 0.75, fontSize: 9, fontWeight: 700 }

function AxisGutters() {
  const plot = usePlotArea()
  if (!plot) {
    return null
  }

  return (
    <ZIndexLayer zIndex={DefaultZIndexes.axis - 1}>
      <rect
        x={plot.x}
        y={plot.y}
        width={gutterWidth}
        height={plot.height - gutterHeight}
        fill="var(--color-panel-deep, #251145)"
        fillOpacity={0.85}
      />
      <rect
        x={plot.x}
        y={plot.y + plot.height - gutterHeight}
        width={plot.width}
        height={gutterHeight}
        fill="var(--color-panel-deep, #251145)"
        fillOpacity={0.85}
      />
    </ZIndexLayer>
  )
}

function clockLabel(seconds: number) {
  const minutes = String(Math.floor(seconds / 60) % 60).padStart(2, '0')
  const remainder = String(Math.round(seconds) % 60).padStart(2, '0')
  return `${minutes}:${remainder}`
}

export function TelemetryChart({ id, series, curve, unit }: TelemetryChartProps) {
  const points = series.map((value, index) => ({ index, value }))
  const lastIndex = points.length - 1
  const lowest = Math.min(...series)
  const highest = Math.max(...series)
  const padding = (highest - lowest) * 0.3
  const valueTicks = [...new Set([Math.round(lowest), Math.round((lowest + highest) / 2), Math.round(highest)])]
  const timeTicks = [0.16, 0.5, 0.84].map((fraction) => Math.round(lastIndex * fraction))

  function renderTooltip({ active, payload }: TooltipContentProps) {
    const point = payload?.[0]?.payload as { value: number } | undefined
    if (!active || !point) {
      return null
    }

    return (
      <div className="bg-panel-deep/95 px-2 py-1 text-xs leading-none font-extrabold text-white outline outline-accent/40">
        {point.value}{unit ? <span className="ml-1 text-[10px] text-white/70">{unit}</span> : null}
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={points} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={`${id}-chart-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent, #b684ff)" stopOpacity={0.4} />
            <stop offset="100%" stopColor="var(--color-accent, #b684ff)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <AxisGutters />
        <CartesianGrid vertical={false} stroke="#ffffff" strokeOpacity={0.12} strokeDasharray="2 4" />
        <YAxis
          mirror
          width={1}
          domain={[lowest - padding, highest + padding]}
          ticks={valueTicks}
          tick={tickStyle}
          tickLine={false}
          axisLine={false}
          tickMargin={4}
        />
        <XAxis
          dataKey="index"
          type="number"
          mirror
          height={1}
          domain={[0, lastIndex]}
          ticks={timeTicks}
          interval="preserveStartEnd"
          minTickGap={28}
          tickFormatter={(index: number) => clockLabel(windowStartSeconds + (index / lastIndex) * windowSeconds)}
          tick={tickStyle}
          tickLine={false}
          axisLine={false}
          tickMargin={6}
        />
        <Tooltip
          content={renderTooltip}
          cursor={{ stroke: 'var(--color-accent, #b684ff)', strokeWidth: 1, strokeOpacity: 0.55 }}
          offset={12}
          isAnimationActive={false}
        />
        <Area
          type={curve}
          dataKey="value"
          stroke="var(--color-accent, #b684ff)"
          strokeWidth={2}
          strokeLinejoin="round"
          fill={`url(#${id}-chart-fill)`}
          isAnimationActive={false}
          activeDot={{ r: 4, fill: 'var(--color-accent, #b684ff)', stroke: 'var(--color-panel-deep, #251145)', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
