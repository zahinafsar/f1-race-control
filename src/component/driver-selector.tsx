import { useState } from 'react'
import driverPortrait from '../assets/race-control/driver-portrait.png'
import { drivers } from '../data/race-data'

export function DriverSelector() {
  const [selectedDriver, setSelectedDriver] = useState(drivers[0].id)

  return (
    <nav className="shrink-0 rounded-b-xl bg-panel-deep px-3 py-3 sm:px-4">
      <ul className="flex items-center gap-3 sm:gap-4">
        {drivers.map((driver) => {
          const isSelected = driver.id === selectedDriver

          return (
            <li key={driver.id}>
              <button
                type="button"
                onClick={() => setSelectedDriver(driver.id)}
                className={`block size-8 cursor-pointer overflow-hidden rounded-full ring-2 transition sm:size-10 ${isSelected ? 'ring-accent' : 'opacity-70 ring-white hover:opacity-100'}`}
              >
                <img src={driverPortrait} alt={driver.shortName} width={267} height={767} className="h-full w-full object-cover object-top" />
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
