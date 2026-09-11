import { useState, type ReactNode } from 'react'
import apexLogo from '../assets/race-control/apex-logo.png'
import { driverMetrics, type DashboardTab } from '../data/race-data'
import { MobileTabs } from './mobile-tabs'
import { CircuitPanel } from './circuit-panel'
import { RaceEvents } from './race-events'
import { CarDiagnostics } from './car-diagnostics'
import { DriverProfile } from './driver-profile'
import { TelemetryCard } from './telemetry-card'
import { EngineTelemetry } from './engine-telemetry'
import { WeatherStrip } from './weather-strip'

type DashboardPanelProps = {
  id: DashboardTab
  activeTab: DashboardTab
  className: string
  children: ReactNode
}

function DashboardPanel({ id, activeTab, className, children }: DashboardPanelProps) {
  return (
    <div
      tabIndex={0}
      className={`min-h-0 min-w-0 ${activeTab === id ? 'block' : 'hidden'} md:block ${className}`}
    >
      {children}
    </div>
  )
}

export function RaceDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('race')

  return (
    <div className="dashboard-shell relative isolate min-h-screen">
      <a href="#race-dashboard" className="fixed top-3 left-3 z-50 -translate-y-24 bg-white px-4 py-3 font-extrabold text-panel-deep focus:translate-y-0">Skip to race dashboard</a>
      <div className="mx-auto w-full px-4 pb-4 xl:flex xl:h-screen xl:min-h-160 xl:flex-col">
        <header className="flex h-24 shrink-0 items-start">
          <a href="./" className="-ml-4 block shrink-0">
            <img src={apexLogo} alt="Apex Racing" width={181} height={90} className="h-20 w-44 object-contain" />
          </a>
        </header>
        <main id="race-dashboard" tabIndex={-1} className="xl:flex xl:min-h-0 xl:flex-1 xl:flex-col">
          <MobileTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="grid items-start gap-6 md:grid-cols-2 xl:min-h-0 xl:flex-1 xl:grid-cols-3 xl:grid-rows-1 xl:items-stretch">
            <DashboardPanel id="race" activeTab={activeTab} className="md:col-start-1 md:row-start-2 xl:row-start-1 xl:flex xl:flex-col gap-4">
              <div className="xl:min-h-0 xl:flex-1"><CircuitPanel /></div>
              <div className="xl:min-h-0 xl:flex-1"><RaceEvents /></div>
            </DashboardPanel>
            <DashboardPanel id="car" activeTab={activeTab} className="md:col-start-2 md:row-start-2 xl:row-start-1 xl:h-full">
              <CarDiagnostics />
              <div className="mt-4 md:hidden"><EngineTelemetry /></div>
            </DashboardPanel>
            <DashboardPanel id="driver" activeTab={activeTab} className="pt-20 md:col-span-2 md:row-start-1 xl:col-span-1 xl:col-start-3 xl:row-start-1 xl:flex xl:flex-col xl:gap-4 xl:pt-0">
              <DriverProfile />
              <div className="mt-4 grid gap-3 md:grid-cols-3 xl:mt-0 xl:flex xl:min-h-0 xl:flex-1 xl:flex-col xl:overflow-y-auto">
                {driverMetrics.map((metric) => <TelemetryCard key={metric.id} {...metric} />)}
              </div>
              <div className="mt-4 hidden shrink-0 md:block xl:mt-0"><EngineTelemetry /></div>
            </DashboardPanel>
          </div>
          <WeatherStrip />
        </main>
      </div>
    </div>
  )
}
