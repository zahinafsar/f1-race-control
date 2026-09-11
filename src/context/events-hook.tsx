import { createContext, useContext } from 'react'

export type RaceEvent = {
  id: string
  severity: 'info' | 'warning' | 'critical'
  message: string
  timestamp: string
  dateTime: string
}

export const EventsContext = createContext<RaceEvent[] | null>(null)

export function useEvents() {
  const events = useContext(EventsContext)

  if (!events) {
    throw new Error('useEvents must be used inside an EventsProvider')
  }

  return events
}
