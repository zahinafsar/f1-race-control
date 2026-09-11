import { useEffect, useState, type ReactNode } from 'react'
import { EventsContext, type RaceEvent } from './events-hook'

const templates = [
  { severity: 'info', message: () => `Sector 2 personal best` },
  { severity: 'info', message: () => `Gap to car ahead: 4.5s` },
  { severity: 'info', message: () => `Speed trap: 325 km/h` },
  { severity: 'info', message: () => 'DRS available on the next straight' },
  { severity: 'info', message: () => 'ERS deployment switched to overtake' },
  { severity: 'info', message: () => 'Pit crew ready — box this lap' },
  { severity: 'warning', message: () => `Tyre temperature high: FR — 115°C` },
  { severity: 'warning', message: () => `Yellow flag — turn 10` },
  { severity: 'warning', message: () => `Track limits noted at turn 17` },
  { severity: 'critical', message: () => `Brake temperature critical: RL — 980°C` },
  { severity: 'critical', message: () => 'Debris on the racing line — reduce speed' },
] as const

function createEvent(): RaceEvent {
  const time = new Date();
  const template = templates[Math.floor(Math.random() * templates.length)]

  return {
    id: `event-${time.getTime()}`,
    severity: template.severity,
    message: template.message(),
    timestamp: time.toLocaleTimeString('en-GB'),
    dateTime: time.toISOString(),
  }
}

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<RaceEvent[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setEvents((prev) => [createEvent(), ...prev].slice(0, 60))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return <EventsContext value={events}>{children}</EventsContext>
}
