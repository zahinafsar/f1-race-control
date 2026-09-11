import { createContext, useContext } from 'react'

export type CarDetails = { id: string; name: string; image: string }

export type PlayerDetails = { id: string; shortName: string; number: number; car: CarDetails }

export type PlayerValue = {
  players: PlayerDetails[]
  player: PlayerDetails
  selectedId: string
  selectPlayer: (playerId: string) => void
}

export const PlayerContext = createContext<PlayerValue | null>(null)

export function usePlayer() {
  const player = useContext(PlayerContext)

  if (!player) {
    throw new Error('usePlayer must be used inside a PlayerProvider')
  }

  return player
}
