import { tyreHighlightClasses } from '../data/tyre-condition'
import { TyreTooltipText, type TyreTooltipProps } from './tyre-tooltip-text'

export function FrontLeftTyre(props: TyreTooltipProps) {
  return (
    <svg width="270" height="277" viewBox="0 0 270 277" fill="none" className="h-full w-full">
      <path d="M142.468 186.872V133.719L54.9704 68.3002" stroke="white" />
      <path d="M46.7931 5.33471C29.13 -2.51554 13.8112 2.06377 8.35961 5.33471C3.12611 7.49375 1.27258 18.2277 1 23.3249V56.0342C1 61.7584 1.81773 67.4825 3.4532 78.113C4.76158 86.6175 12.7209 90.379 16.5369 91.1968L46.7931 90.379C52.0266 87.1081 54.4253 80.8388 54.9704 78.113V55.2165H51.6995V20.8717H54.9704C54.9704 12.3672 49.5189 6.97018 46.7931 5.33471Z" className={tyreHighlightClasses[props.condition]} fillOpacity="0.5" strokeWidth="2" />
      <rect x="15.1502" y="193.253" width="254" height="83" fill="#351663" fillOpacity="0.95" stroke="white" />
      <circle cx="142.468" cy="192.596" r="6.04187" fill="#351764" stroke="white" />
      <TyreTooltipText {...props} x={15.1502} y={193.253} />
    </svg>
  )
}
