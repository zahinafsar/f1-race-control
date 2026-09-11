export type DashboardTab = 'race' | 'car' | 'driver'

export const dashboardTabs: { id: DashboardTab; label: string }[] = [
  { id: 'race', label: 'Race' },
  { id: 'car', label: 'Car' },
  { id: 'driver', label: 'Driver' },
]

export const raceStatistics = [
  { label: 'Lap', value: '16/67' },
  { label: 'Top Speed', value: '287 km/h' },
  { label: 'Current Lap', value: '1:21.52' },
  { label: 'Best Lap', value: '1:23.05' },
]

export const driverMetrics = [
  { id: 'breathing', label: 'Breath Per Minute', value: '65', unit: 'BPM', highest: '130 bpm', lowest: '48 bpm' },
  { id: 'heart-rate', label: 'Heart Rate', value: '12', highest: '14', lowest: '8' },
  { id: 'stress', label: 'Stress Level', value: '51', highest: '58', lowest: '45' },
]

export const carMetrics = [
  { id: 'rpm', label: 'RPM', display: '9800', value: 9800, max: 16720, fill: '58.6%', color: 'bg-linear-to-r from-green-700 to-yellow-300' },
  { id: 'engine', label: 'ENGINE TEMP', display: '112 C', value: 112, max: 135, fill: '82.8%', color: 'bg-linear-to-r from-green-700 via-yellow-300 to-red-500' },
  { id: 'fuel', label: 'FUEL', display: '78%', value: 78, max: 100, fill: '20%', color: 'bg-green-700' },
  { id: 'brakes', label: 'BRAKE TEMP', display: '650 C', value: 650, max: 1110, fill: '58.6%', color: 'bg-linear-to-r from-green-700 to-yellow-300' },
]

export const tyres = [
  { id: 'fl', label: 'FL TYRE', name: 'Front left tyre', temperature: 104, pressure: '1.2', x: 3, y: 96 },
  { id: 'fr', label: 'FR TYRE', name: 'Front right tyre', temperature: 101, pressure: '1.21', x: 233, y: 96 },
  { id: 'rl', label: 'RL TYRE', name: 'Rear left tyre', temperature: 98, pressure: '1.18', x: 6, y: 517 },
  { id: 'rr', label: 'RR TYRE', name: 'Rear right tyre', temperature: 99, pressure: '1.19', x: 225, y: 517 },
] as const

export const weatherMetrics = [
  { label: 'Air Temp', value: '23.4 c' },
  { label: 'Cloud', value: '13%' },
  { label: 'Humidity', value: '75%' },
  { label: 'Pressure', value: '1012 mb' },
  { label: 'Wind', value: '7.00 km/h' },
]
