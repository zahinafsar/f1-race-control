import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fontsource-variable/geist'
import { RaceDashboard } from './component/race-dashboard'
import { WeatherProvider } from './context/weather-provider'
import { EventsProvider } from './context/events-provider'
import { PlayerProvider } from './context/player-provider'
import { CarProvider } from './context/car-provider'
import { VitalsProvider } from './context/vitals-provider'
import { RaceProvider } from './context/race-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WeatherProvider>
      <EventsProvider>
        <PlayerProvider>
          <CarProvider>
            <VitalsProvider>
              <RaceProvider>
                <RaceDashboard />
              </RaceProvider>
            </VitalsProvider>
          </CarProvider>
        </PlayerProvider>
      </EventsProvider>
    </WeatherProvider>
  </StrictMode>,
)
