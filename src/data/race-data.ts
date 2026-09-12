export type DashboardTab = 'race' | 'car' | 'driver'

export const dashboardTabs: { id: DashboardTab; label: string }[] = [
  { id: 'race', label: 'Race' },
  { id: 'car', label: 'Car' },
  { id: 'driver', label: 'Driver' },
]

export const tyreLayout = [
  { id: 'fl', label: 'FL TYRE', name: 'Front left tyre' },
  { id: 'fr', label: 'FR TYRE', name: 'Front right tyre' },
  { id: 'rl', label: 'RL TYRE', name: 'Rear left tyre' },
  { id: 'rr', label: 'RR TYRE', name: 'Rear right tyre' },
] as const
