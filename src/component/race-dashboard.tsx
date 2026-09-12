import { useState, type ReactNode } from 'react'
import apexLogo from '../assets/race-control/apex-logo.png'
import { type DashboardTab } from '../data/race-data'
import { useVitals, type VitalId } from '../context/vitals-hook'
import { PanelTransition, type PanelDirection } from './panel-transition'
import { MobileTabs } from './mobile-tabs'
import { CircuitPanel } from './circuit-panel'
import { RaceEvents } from './race-events'
import { CarDiagnostics } from './car-diagnostics'
import { DriverProfile } from './driver-profile'
import { DriverSelector } from './driver-selector'
import { TelemetryCard } from './telemetry-card'
import { EngineTelemetry } from './engine-telemetry'
import { WeatherStrip } from './weather-strip'

const vitalCards: { id: VitalId; label: string; unit?: string; curve: 'linear' | 'natural' | 'monotone' }[] = [
  { id: 'heartRate', label: 'Heart Rate', unit: 'BPM', curve: 'linear' },
  { id: 'breathing', label: 'Breath Rate', curve: 'natural' },
  { id: 'stress', label: 'Stress Level', curve: 'monotone' },
]

type DashboardPanelProps = {
  id: DashboardTab
  activeTab: DashboardTab
  direction: PanelDirection
  className: string
  children: ReactNode
}

function DashboardPanel({ id, activeTab, direction, className, children }: DashboardPanelProps) {
  return (
    <PanelTransition
      direction={direction}
      tabIndex={0}
      className={`min-h-0 min-w-0 ${activeTab === id ? 'block' : 'hidden'} md:block ${className}`}
    >
      {children}
    </PanelTransition>
  )
}

export function RaceDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('race')
  const vitals = useVitals()

  return (
    <div className="dashboard-shell relative isolate min-h-screen">
      <a href="#race-dashboard" className="fixed top-3 left-3 z-50 -translate-y-24 bg-white px-4 py-3 font-extrabold text-panel-deep focus:translate-y-0">Skip to race dashboard</a>
      <div className="mx-auto w-full px-4 pb-4 xl:flex xl:h-screen xl:min-h-160 xl:flex-col">
        <header className="flex h-24 shrink-0 items-start justify-between gap-2">
          <a href="./" className="-ml-4 block shrink-0">
            <img src={apexLogo} width={181} height={90} className="h-14 w-32 object-contain sm:h-20 sm:w-44" />
          </a>
          <DriverSelector />
          <div className="hidden w-32 shrink-0 sm:block sm:w-44" />
        </header>
        <main id="race-dashboard" tabIndex={-1} className="xl:flex xl:min-h-0 xl:flex-1 xl:flex-col">
          <MobileTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="grid items-start gap-6 md:grid-cols-2 xl:min-h-0 xl:flex-1 xl:grid-cols-3 xl:grid-rows-1 xl:items-stretch">
            <DashboardPanel id="race" activeTab={activeTab} direction="left" className="md:col-start-1 md:row-start-2 xl:row-start-1 xl:flex xl:flex-col gap-4">
              <div className="xl:min-h-0 xl:flex-1"><CircuitPanel /></div>
              <div className="xl:min-h-0 xl:flex-1"><RaceEvents /></div>
            </DashboardPanel>
            <DashboardPanel id="car" activeTab={activeTab} direction="up" className="md:col-start-2 md:row-start-2 xl:row-start-1 xl:h-full">
              <CarDiagnostics />
              <div className="mt-4 md:hidden"><EngineTelemetry /></div>
            </DashboardPanel>
            <DashboardPanel id="driver" activeTab={activeTab} direction="right" className="pt-20 md:col-span-2 md:row-start-1 xl:col-span-1 xl:col-start-3 xl:row-start-1 xl:flex xl:flex-col xl:gap-4 xl:pt-0">
              <DriverProfile />
              <div className="mt-4 grid gap-3 md:grid-cols-3 xl:mt-0 xl:flex xl:min-h-0 xl:flex-1 xl:flex-col xl:overflow-y-auto">
                {vitalCards.map((card) => {
                  const series = vitals[card.id]
                  return (
                    <TelemetryCard
                      key={card.id}
                      {...card}
                      series={series}
                      value={(series.at(-1) ?? 0).toFixed(0)}
                      highest={`${Math.round(Math.max(...series))}`}
                      lowest={`${Math.round(Math.min(...series))}`}
                    />
                  )
                })}
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
