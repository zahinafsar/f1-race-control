import trackPath from '../assets/race-control/track-path.svg'
import carMarker from '../assets/race-control/car-marker.svg'
import rivalOne from '../assets/race-control/rival-one.svg'
import rivalTwo from '../assets/race-control/rival-two.svg'
import rivalThree from '../assets/race-control/rival-three.svg'
import germanyFlag from '../assets/race-control/germany-flag.png'
import { raceStatistics } from '../data/race-data'

export function CircuitPanel() {
  return (
    <div className="h-80 min-h-0 bg-panel-deep xl:h-full">
      <div className="flex h-full">
        <div className="w-28 shrink-0 overflow-y-auto bg-panel p-4 sm:w-32">
          <div className="mb-4 flex h-9 w-10 items-center justify-center bg-accent text-base font-extrabold">P4</div>
          <div className="space-y-3 font-extrabold">
            {raceStatistics.map((stat) => (
              <div key={stat.label}>
                <div className="text-xs leading-tight">{stat.label}</div>
                <div className="mt-1 text-base leading-none text-accent">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col p-4">
          <div className="mb-3 flex shrink-0 items-center justify-end gap-2 text-xs font-extrabold">
            <span>Hockenheim, DE</span>
            <img src={germanyFlag} width={14} height={9} className="h-2 w-3 shrink-0" alt="Germany" />
          </div>
          <div className="min-h-0 flex-1">
            <svg viewBox="0 0 280 280" className="h-full w-full">
              <image href={trackPath} x={14} y={24} width={251} height={229} transform="rotate(5 140 140)" />
              <image href={carMarker} x={62} y={17} width={10} height={12} />
              <image href={rivalOne} x={155} y={106} width={9} height={11} />
              <image href={rivalTwo} x={193} y={228} width={9} height={11} />
              <image href={rivalThree} x={54} y={89} width={9} height={11} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
