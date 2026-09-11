import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { driverCars } from '../data/driver-assets'
import { PlayerContext, type PlayerDetails } from './player-hook'

const players: PlayerDetails[] = [
  { id: 'nova-07', shortName: 'A. NOVA', number: 7, car: { id: 'apex-rb7', name: 'Apex RB-7', image: driverCars['nova-07'] } },
  { id: 'vek-22', shortName: 'K. VELDOR', number: 22, car: { id: 'apex-w15', name: 'Apex W-15', image: driverCars['vek-22'] } },
  { id: 'rine-44', shortName: 'S. HALE', number: 44, car: { id: 'apex-sf24', name: 'Apex SF-24', image: driverCars['rine-44'] } },
]

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState(players[0].id)
  const [activeId, setActiveId] = useState(players[0].id)
  const commitTimer = useRef(0)

  useEffect(() => () => window.clearTimeout(commitTimer.current), [])

  const selectPlayer = useCallback((playerId: string) => {
    setSelectedId(playerId)
    window.clearTimeout(commitTimer.current)
    commitTimer.current = window.setTimeout(() => setActiveId(playerId), 200)
  }, [])

  const value = useMemo(() => {
    const player = players.find((entry) => entry.id === activeId) ?? players[0]

    return { players, player, selectedId, selectPlayer }
  }, [activeId, selectedId, selectPlayer])

  return <PlayerContext value={value}>{children}</PlayerContext>
}
