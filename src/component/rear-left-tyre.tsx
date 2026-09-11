import { tyreHighlightClasses } from '../data/tyre-condition'
import { TyreTooltipText, type TyreTooltipProps } from './tyre-tooltip-text'

export function RearLeftTyre(props: TyreTooltipProps) {
  return (
    <svg width="267" height="320" viewBox="0 0 267 320" fill="none" className="h-full w-full">
      <path d="M139.961 90L140.394 155.65L57.6963 237" stroke="white" />
      <rect x="12.1963" y="0.5" width="254" height="83" fill="#351663" fillOpacity="0.95" stroke="white" />
      <circle cx="139.514" cy="83.5419" r="6.04187" fill="#351764" stroke="white" />
      <path d="M5.19632 238C-2.40368 265.6 2.02966 297.833 5.19632 310.5C13.1963 324.5 48.1963 317 53.6963 316C58.0963 315.2 59.863 300.667 60.1963 293.5V243C60.1963 239.5 56.1963 232.5 52.6963 231C49.1963 229.5 32.6963 228 20.6963 228.5C11.0963 228.9 6.36299 235 5.19632 238Z" className={tyreHighlightClasses[props.condition]} fillOpacity="0.5" strokeWidth="2" />
      <TyreTooltipText {...props} x={12.1963} y={0.5} />
    </svg>
  )
}
