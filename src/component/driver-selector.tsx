import { driverPortraits } from '../data/driver-assets'
import { usePlayer } from '../context/player-hook'

export function DriverSelector() {
  const { players, selectedId, selectPlayer } = usePlayer()

  return (
    <nav className="shrink-0 rounded-b-xl bg-panel-deep px-3 py-3 sm:px-4">
      <ul className="flex items-center gap-3 sm:gap-4">
        {players.map((driver) => {
          const isSelected = driver.id === selectedId

          return (
            <li key={driver.id}>
              <button
                type="button"
                onClick={() => selectPlayer(driver.id)}
                className={`block size-8 cursor-pointer overflow-hidden rounded-full ring-2 transition sm:size-10 ${isSelected ? 'ring-accent' : 'opacity-70 ring-white hover:opacity-100'}`}
              >
                <img src={driverPortraits[driver.id]} width={308} height={376} className="h-full w-full object-cover object-top" />
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
