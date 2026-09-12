import { useState } from 'react'
import raceCarGlow from '../assets/race-control/race-car-glow.png'
import { useCar, type TyreReading } from '../context/car-hook'
import { FrontLeftTyre } from './front-left-tyre'
import { FrontRightTyre } from './front-right-tyre'
import { RearLeftTyre } from './rear-left-tyre'
import { RearRightTyre } from './rear-right-tyre'

const tyreOverlays = {
  fl: {
    component: FrontLeftTyre,
    hitbox: { left: '1.0417%', top: '14.5455%', width: '19.4444%', height: '13.9394%' },
    art: { left: '1.0417%', top: '14.5455%', width: '93.75%', height: '41.9697%' },
  },
  fr: {
    component: FrontRightTyre,
    hitbox: { left: '80.9028%', top: '14.5455%', width: '19.4444%', height: '13.9394%' },
    art: { left: '6.25%', top: '14.5455%', width: '94.0972%', height: '41.8182%' },
  },
  rl: {
    component: RearLeftTyre,
    hitbox: { left: '2.0833%', top: '78.3333%', width: '21.1806%', height: '13.9394%' },
    art: { left: '2.0833%', top: '43.7879%', width: '92.7083%', height: '48.4848%' },
  },
  rr: {
    component: RearRightTyre,
    hitbox: { left: '78.125%', top: '78.3333%', width: '20.1389%', height: '13.9394%' },
    art: { left: '5.9028%', top: '43.7879%', width: '92.7083%', height: '48.4848%' },
  },
}

type TyreId = TyreReading['id']

type TyreHotspotProps = {
  tyre: TyreReading
  active: boolean
  onHover: (id: TyreId | null) => void
  onPin: (id: TyreId) => void
}

function TyreHotspot({ tyre, active, onHover, onPin }: TyreHotspotProps) {
  const overlay = tyreOverlays[tyre.id]
  const TyreComponent = overlay.component

  const show = () => onHover(tyre.id)
  const hide = () => onHover(null)
  const pin = () => onPin(tyre.id)

  return (
    <>
      <button
        type="button"
        aria-label={tyre.name}
        className="absolute z-30 cursor-pointer rounded-2xl"
        style={overlay.hitbox}
        onClick={pin}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      />
      <div
        className={`pointer-events-none absolute transition-[opacity,visibility] duration-150 ${active ? 'visible z-20 opacity-100' : 'invisible z-10 opacity-0'}`}
        style={overlay.art}
      >
        <TyreComponent label={tyre.label} temperature={tyre.temperature} pressure={tyre.pressure} condition={tyre.condition} />
      </div>
    </>
  )
}

export function CarDiagnostics() {
  const { image, tyres } = useCar()
  const [pinned, setPinned] = useState<TyreId | null>(null)
  const [hovered, setHovered] = useState<TyreId | null>(null)
  const active = hovered ?? pinned

  const hover = (id: TyreId | null) => {
    setHovered(id)
    if (id !== null && id !== pinned) {
      setPinned(null)
    }
  }

  const pin = (id: TyreId) => {
    if (pinned === id) {
      setPinned(null)
    } else {
      setPinned(id)
    }
  }

  return (
    <div className="flex h-160 items-center justify-center xl:h-full xl:min-h-0">
      <div className="relative h-full shrink-0">
        <img src={raceCarGlow} width={288} height={660} className="pointer-events-none absolute inset-0 h-full w-full blur-md" />
        <img
          src={image}
          width={288}
          height={660}
          className={`pointer-events-none relative block h-full w-auto transition-[filter] duration-150 ${active ? 'grayscale brightness-50' : ''}`}
        />
        {tyres.map((tyre) => (
          <TyreHotspot key={tyre.id} tyre={tyre} active={active === tyre.id} onHover={hover} onPin={pin} />
        ))}
      </div>
    </div>
  )
}
