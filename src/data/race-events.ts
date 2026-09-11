type EventSeverity = 'info' | 'warning' | 'critical'

type EventTemplate = {
  severity: EventSeverity
  message: () => string
}

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomTyre() {
  const positions = ['FL', 'FR', 'RL', 'RR']
  return positions[randomInteger(0, positions.length - 1)]
}

const eventTemplates: EventTemplate[] = [
  { severity: 'warning', message: () => `Tyre temperature high: ${randomTyre()} — ${randomInteger(105, 118)}°C` },
  { severity: 'info', message: () => `Sector ${randomInteger(1, 3)} personal best` },
  { severity: 'info', message: () => 'DRS available on the next straight' },
  { severity: 'info', message: () => `Gap to car ahead: ${(randomInteger(3, 45) / 10).toFixed(1)}s` },
  { severity: 'warning', message: () => `Yellow flag — turn ${randomInteger(1, 17)}` },
  { severity: 'info', message: () => 'Green flag — track clear' },
  { severity: 'critical', message: () => `Brake temperature critical: ${randomTyre()} — ${randomInteger(850, 980)}°C` },
  { severity: 'info', message: () => 'Radio check complete — loud and clear' },
  { severity: 'info', message: () => `Speed trap: ${randomInteger(278, 325)} km/h` },
  { severity: 'warning', message: () => `Track limits noted at turn ${randomInteger(1, 17)}` },
  { severity: 'info', message: () => 'Pit crew ready — box this lap' },
  { severity: 'info', message: () => 'ERS deployment switched to overtake' },
  { severity: 'warning', message: () => `Engine temperature rising: ${randomInteger(115, 124)}°C` },
  { severity: 'info', message: () => `Wind speed updated: ${randomInteger(5, 22)} km/h` },
  { severity: 'info', message: () => 'Tyre pressures within target range' },
  { severity: 'critical', message: () => `Tyre pressure dropping: ${randomTyre()} — inspect immediately` },
  { severity: 'info', message: () => 'Battery recharge mode enabled' },
  { severity: 'warning', message: () => 'Light rain reported in sector 2' },
  { severity: 'info', message: () => 'Overtake complete — position gained' },
  { severity: 'info', message: () => `Pit stop completed in ${(randomInteger(21, 38) / 10).toFixed(1)}s` },
  { severity: 'critical', message: () => 'Debris on the racing line — reduce speed' },
  { severity: 'info', message: () => 'Fuel saving target achieved' },
]

let elapsedSeconds = 41 * 60 + 2

export const raceEvents = Array.from({ length: 300 }, (_, index) => {
  const template = eventTemplates[randomInteger(0, eventTemplates.length - 1)]
  const minutes = Math.floor(elapsedSeconds / 60)
  const seconds = elapsedSeconds % 60
  const event = {
    id: `race-event-${index + 1}`,
    severity: template.severity,
    message: template.message(),
    timestamp: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
    dateTime: `PT${minutes}M${seconds}S`,
  }

  elapsedSeconds -= randomInteger(3, 7)
  return event
})
