export type DashboardTab = 'race' | 'car' | 'driver'

export const dashboardTabs: { id: DashboardTab; label: string }[] = [
  { id: 'race', label: 'Race' },
  { id: 'car', label: 'Car' },
  { id: 'driver', label: 'Driver' },
]

export const tyreLayout = [
  { id: 'fl', label: 'FL TYRE', name: 'Front left tyre', x: 3, y: 96 },
  { id: 'fr', label: 'FR TYRE', name: 'Front right tyre', x: 233, y: 96 },
  { id: 'rl', label: 'RL TYRE', name: 'Rear left tyre', x: 6, y: 517 },
  { id: 'rr', label: 'RR TYRE', name: 'Rear right tyre', x: 225, y: 517 },
] as const
