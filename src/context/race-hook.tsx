import { createContext, useContext } from 'react'

export type RaceStat = {
  player: string
  rank: string
  lap: string
  topSpeed: string
  currentLap: string
  bestLap: string
  x: number
  y: number
}

export type Race = { circuit: string; stats: RaceStat[] }

export const RaceContext = createContext<Race | null>(null)

export function useRace() {
  const race = useContext(RaceContext)

  if (!race) {
    throw new Error('useRace must be used inside a RaceProvider')
  }

  return race
}
