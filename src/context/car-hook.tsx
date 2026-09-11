import { createContext, useContext } from 'react'
import type { TyreCondition } from '../data/tyre-condition'

export type TyreReading = {
  id: 'fl' | 'fr' | 'rl' | 'rr'
  label: string
  name: string
  temperature: string
  pressure: string
  condition: TyreCondition
  x: number
  y: number
}

export const carLimits = { rpm: 16720, engine: 135, fuel: 100, brakes: 1110 }

export type CarMetricId = keyof typeof carLimits

export type CarMetrics = Record<CarMetricId, number>

export type CarValue = { image: string; tyres: TyreReading[]; metrics: CarMetrics }

export const CarContext = createContext<CarValue | null>(null)

export function useCar() {
  const car = useContext(CarContext)

  if (!car) {
    throw new Error('useCar must be used inside a CarProvider')
  }

  return car
}
