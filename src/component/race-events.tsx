import { useState } from 'react'
import { useEvents } from '../context/events-hook'

const eventAccents = {
  info: 'border-l-transparent',
  warning: 'border-l-yellow-300',
  critical: 'border-l-red-400',
}

export function RaceEvents() {
  const events = useEvents()
  const [seededNewestId] = useState(events[0]?.id)

  return (
    <div className="xl:flex xl:h-full xl:min-h-0 xl:flex-col">
      <h2 className="flex h-9 shrink-0 items-center text-base font-black">Race Events</h2>
      <div className="relative h-80 overflow-hidden bg-panel-deep xl:min-h-0 xl:flex-1">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-linear-to-b from-panel-deep via-panel-deep to-transparent" />
        <ol
          tabIndex={0}
          className="flex h-full flex-col-reverse gap-2.5 overflow-y-auto overscroll-y-contain p-4 focus-visible:-outline-offset-2"
        >
          {events.map((event, index) => {
            const isArrival = index === 0 && event.id !== seededNewestId

            return (
              <li
                key={event.id}
                className={`flex min-h-10 shrink-0 items-start gap-1 border-l-4 bg-accent/20 py-3 pr-3 pl-2 text-xs leading-snug xl:text-sm ${eventAccents[event.severity]} ${isArrival ? 'race-event-arrival' : ''}`}
              >
                <time dateTime={event.dateTime} className="shrink-0 text-white/55 tabular-nums">{event.timestamp}</time>
                <span className="min-w-0 wrap-break-word">{event.message}</span>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
