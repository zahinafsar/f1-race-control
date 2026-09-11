import raceCarGlow from '../assets/race-control/race-car-glow.png'
import { tyreOverlays } from '../data/tyre-overlays'
import { useCar } from '../context/car-hook'
import { FrontLeftTyre } from './front-left-tyre'
import { FrontRightTyre } from './front-right-tyre'
import { RearLeftTyre } from './rear-left-tyre'
import { RearRightTyre } from './rear-right-tyre'

const tyreComponents = {
  fl: FrontLeftTyre,
  fr: FrontRightTyre,
  rl: RearLeftTyre,
  rr: RearRightTyre,
}

function carUnits(pixels: number) {
  return `${(pixels / 288) * 100}cqw`
}

export function CarDiagnostics() {
  const { image, tyres } = useCar()

  return (
    <div className="car-container flex h-160 items-center justify-center xl:h-full xl:min-h-0">
      <div className="car-model relative shrink-0">
        <img src={raceCarGlow} alt="" width={288} height={660} className="pointer-events-none absolute inset-0 h-full w-full opacity-70 blur-2xl" />
        <img src={image} alt="Top view of the racing car" width={288} height={660} className="car-image pointer-events-none relative h-full w-full" />
        {tyres.map((tyre) => {
          const overlay = tyreOverlays[tyre.id]
          const TyreComponent = tyreComponents[tyre.id]

          return (
            <div
              key={tyre.id}
              className="tyre-hotspot absolute"
              style={{ left: carUnits(tyre.x), top: carUnits(tyre.y), width: carUnits(overlay.tyreWidth), height: carUnits(92) }}
            >
              <button
                type="button"
                className="h-full w-full cursor-pointer rounded-2xl"
              />
              <div
                className="tyre-overlay pointer-events-none absolute"
                style={{
                  left: carUnits(-overlay.tyreX),
                  top: carUnits(-overlay.tyreY),
                  width: carUnits(overlay.width),
                  height: carUnits(overlay.height),
                }}
              >
                <TyreComponent label={tyre.label} temperature={tyre.temperature} pressure={tyre.pressure} condition={tyre.condition} />
                <div
                  className="pointer-events-auto absolute"
                  style={{ left: carUnits(overlay.tooltipX), top: carUnits(overlay.tooltipY), width: carUnits(255), height: carUnits(84) }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
