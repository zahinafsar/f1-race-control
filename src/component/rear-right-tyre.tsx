import { tyreHighlightClasses } from '../data/tyre-condition'
import { TyreTooltipText, type TyreTooltipProps } from './tyre-tooltip-text'

export function RearRightTyre(props: TyreTooltipProps) {
  return (
    <svg width="267" height="320" viewBox="0 0 267 320" fill="none" className="h-full w-full">
      <path d="M128.264 90L128.698 155.65L210.487 235.913" stroke="white" />
      <rect x="0.5" y="0.5" width="254" height="83" fill="#351663" fillOpacity="0.95" stroke="white" />
      <circle cx="127.818" cy="83.5419" r="6.04187" fill="#351764" stroke="white" />
      <path d="M214 314.5C210 312.1 209 304.167 209 300.5V243.5C209 241.667 209.6 236.8 212 232C215 226 246.5 226 256.5 230.5C266.5 235 264.5 260 265 282C265.4 299.6 262.167 310 260.5 313C245.5 321.5 219 317.5 214 314.5Z" className={tyreHighlightClasses[props.condition]} fillOpacity="0.5" strokeWidth="2" />
      <TyreTooltipText {...props} x={0.5} y={0.5} />
    </svg>
  )
}
