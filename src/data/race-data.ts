export type DashboardTab = 'race' | 'car' | 'driver'

export const dashboardTabs: { id: DashboardTab; label: string }[] = [
  { id: 'race', label: 'Race' },
  { id: 'car', label: 'Car' },
  { id: 'driver', label: 'Driver' },
]

export const drivers = [
  { id: 'nova-07', shortName: 'A. NOVA', number: 7 },
  { id: 'vek-22', shortName: 'K. VELDOR', number: 22 },
  { id: 'rine-44', shortName: 'S. HALE', number: 44 },
]

export const raceStatistics = [
  { label: 'Lap', value: '16/67' },
  { label: 'Top Speed', value: '287 km/h' },
  { label: 'Current Lap', value: '1:21.52' },
  { label: 'Best Lap', value: '1:23.05' },
]

const round = (value: number) => Math.round(value * 10) / 10

function heartbeatSeries(lowest: number, highest: number, beats: number, samplesPerBeat: number) {
  const waves = [
    { center: 0.18, amplitude: 0.14, width: 0.04 },
    { center: 0.33, amplitude: -0.12, width: 0.012 },
    { center: 0.37, amplitude: 1, width: 0.013 },
    { center: 0.42, amplitude: -0.3, width: 0.016 },
    { center: 0.62, amplitude: 0.24, width: 0.055 },
  ]

  return Array.from({ length: beats * samplesPerBeat }, (_, index) => {
    const phase = (index % samplesPerBeat) / samplesPerBeat
    const signal = waves.reduce((total, wave) => {
      return total + wave.amplitude * Math.exp(-(((phase - wave.center) / wave.width) ** 2))
    }, 0)
    return round(lowest + ((signal + 0.3) / 1.3) * (highest - lowest))
  })
}

function breathingSeries(lowest: number, highest: number, cycles: number, samples: number) {
  const middle = (lowest + highest) / 2
  const amplitude = ((highest - lowest) / 2) * 0.94

  return Array.from({ length: samples }, (_, index) => {
    const phase = (index / samples) * cycles * Math.PI * 2
    return round(middle + amplitude * (Math.sin(phase) * 0.84 + Math.sin(phase * 2 + 0.4) * 0.16))
  })
}

function driftSeries(lowest: number, highest: number, samples: number) {
  const middle = (lowest + highest) / 2
  const amplitude = ((highest - lowest) / 2) * 0.9

  return Array.from({ length: samples }, (_, index) => {
    const phase = (index / samples) * Math.PI * 2
    const drift = Math.sin(phase * 1.4 + 0.6) * 0.56 + Math.sin(phase * 3.3 + 2.1) * 0.3 + Math.sin(phase * 8.1 + 1.2) * 0.14
    return round(middle + amplitude * drift)
  })
}

export const driverMetrics = [
  {
    id: 'breathing',
    label: 'Breath Rate',
    value: '65',
    unit: 'BPM',
    highest: '130',
    lowest: '48',
    curve: 'natural' as const,
    series: breathingSeries(48, 130, 3, 72),
  },
  {
    id: 'heart-rate',
    label: 'Heart Rate',
    value: '12',
    highest: '14',
    lowest: '8',
    curve: 'linear' as const,
    series: heartbeatSeries(8, 14, 4, 36),
  },
  {
    id: 'stress',
    label: 'Stress Level',
    value: '51',
    highest: '58',
    lowest: '45',
    curve: 'monotone' as const,
    series: driftSeries(45, 58, 48),
  },
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
