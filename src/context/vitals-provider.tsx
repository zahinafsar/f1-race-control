import { useEffect, useState, type ReactNode } from 'react'
import { VitalsContext } from './vitals-hook'

const heartRatePattern = [56, 56, 57, 58, 60, 58, 56, 55, 54, 58, 125, 64, 48, 56, 62, 66, 64, 60, 57, 56]
const breathingPattern = [15, 17, 19, 20, 21, 21, 21, 20, 19, 17, 15, 13, 12, 10, 9, 9, 9, 10, 12, 13]
const stressPattern = [44, 45, 47, 50, 54, 58, 62, 65, 67, 68, 67, 65, 62, 59, 56, 53, 50, 47, 45, 44]

export function VitalsProvider({ children }: { children: ReactNode }) {
  const [vitals, setVitals] = useState(() => ({
    tick: 0,
    heartRate: [heartRatePattern, heartRatePattern, heartRatePattern].flat(),
    breathing: [breathingPattern, breathingPattern, breathingPattern].flat(),
    stress: [stressPattern, stressPattern, stressPattern].flat(),
  }))

  useEffect(() => {
    const timer = setInterval(() => {
      setVitals((prev) => {
        const tick = prev.tick + 1

        return {
          tick,
          heartRate: [...prev.heartRate, heartRatePattern[tick % heartRatePattern.length]].slice(-60),
          breathing: [...prev.breathing, breathingPattern[tick % breathingPattern.length]].slice(-60),
          stress: [...prev.stress, stressPattern[tick % stressPattern.length]].slice(-60),
        }
      })
    }, 500)

    return () => clearInterval(timer)
  }, [])

  return <VitalsContext value={vitals}>{children}</VitalsContext>
}
