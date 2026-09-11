import driverPortrait from '../assets/race-control/driver-portrait.png'
import driverChevrons from '../assets/race-control/driver-chevrons.svg'

export function DriverProfile() {
  return (
    <div className="relative h-28 shrink-0">
      <div className="absolute inset-y-0 right-18 left-0 overflow-hidden bg-panel">
        <img src={driverChevrons} alt="" width={227} height={241} className="absolute -top-8 left-0 h-60 w-56" />
      </div>
      <div className="relative z-10 flex h-full flex-col justify-between p-4 text-xl font-black text-accent 2xl:text-2xl">
        <h2>L. HAMILTON</h2>
        <div>24</div>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-0 h-48 w-48 overflow-hidden">
        <img src={driverPortrait} alt="" width={267} height={767} className="absolute top-0 left-0 w-56 max-w-none" />
      </div>
    </div>
  )
}
