import { createContext, useContext } from 'react'

export type VitalId = 'heartRate' | 'breathing' | 'stress'

export type Vitals = Record<VitalId, number[]>

export const VitalsContext = createContext<Vitals | null>(null)

export function useVitals() {
  const vitals = useContext(VitalsContext)

  if (!vitals) {
    throw new Error('useVitals must be used inside a VitalsProvider')
  }

  return vitals
}
