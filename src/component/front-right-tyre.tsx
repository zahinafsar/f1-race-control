import { tyreHighlightClasses } from '../data/tyre-condition'
import { TyreTooltipText, type TyreTooltipProps } from './tyre-tooltip-text'

export function FrontRightTyre(props: TyreTooltipProps) {
  return (
    <svg width="271" height="276" viewBox="0 0 271 276" fill="none" className="h-full w-full">
      <path d="M128 185.5V132.603L220 67.5" stroke="white" />
      <rect x="0.5" y="192" width="254" height="83" fill="#351663" fillOpacity="0.95" stroke="white" />
      <circle cx="127.818" cy="191.342" r="6.04187" fill="#351764" stroke="white" />
      <path d="M218.5 8.5C216.1 11.7 215.5 16.5 215.5 18.5C221 15.5 220.5 34 220.5 54C220.5 70 217.167 73.6667 215.5 73.5C217 83.5 221 85.5 224 88.5C227 91.5 253 91 259 88.5C263.8 86.5 266.333 79.6667 267 76.5C271.5 34 268 18.5 267 10.5C266.2 4.1 258.333 1.5 254.5 1H233.5C226 1 221.5 4.5 218.5 8.5Z" className={tyreHighlightClasses[props.condition]} fillOpacity="0.5" strokeWidth="2" />
      <TyreTooltipText {...props} x={0.5} y={192} />
    </svg>
  )
}
