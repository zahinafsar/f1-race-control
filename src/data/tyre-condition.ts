export type TyreCondition = 'normal' | 'warning' | 'critical'

export const demoTyreLimits = {
  temperatureWarning: 100,
  temperatureCritical: 104,
  pressureWarningLow: 1.15,
  pressureWarningHigh: 1.3,
  pressureCriticalLow: 1.1,
  pressureCriticalHigh: 1.35,
}

export const tyreHighlightClasses = {
  normal: 'fill-green-500 stroke-green-300',
  warning: 'fill-yellow-400 stroke-yellow-200',
  critical: 'fill-red-500 stroke-red-300',
}

export function getTyreCondition(temperature: number, pressure: string): TyreCondition {
  const pressureValue = Number(pressure)

  if (
    temperature >= demoTyreLimits.temperatureCritical ||
    pressureValue <= demoTyreLimits.pressureCriticalLow ||
    pressureValue >= demoTyreLimits.pressureCriticalHigh
  ) {
    return 'critical'
  }

  if (
    temperature >= demoTyreLimits.temperatureWarning ||
    pressureValue <= demoTyreLimits.pressureWarningLow ||
    pressureValue >= demoTyreLimits.pressureWarningHigh
  ) {
    return 'warning'
  }

  return 'normal'
}
