import { describe, expect, it } from 'vitest'
import {
  formatDayLabel,
  formatLocalTime,
  formatLocation,
  formatTemp,
  formatUtcOffset,
  formatVisibility,
  formatWindSpeed,
} from '@/lib/format'

describe('format helpers', () => {
  it('formats temperatures and wind for each unit system', () => {
    expect(formatTemp(21.6)).toBe('22°')
    expect(formatTemp(-0.4)).toBe('0°')
    expect(formatWindSpeed(5, 'metric')).toBe('18 km/h')
    expect(formatWindSpeed(12.4, 'imperial')).toBe('12 mph')
  })

  it('formats visibility', () => {
    expect(formatVisibility(10_000, 'metric')).toBe('10 km')
    expect(formatVisibility(6500, 'metric')).toBe('6.5 km')
    expect(formatVisibility(16_093, 'imperial')).toBe('10.0 mi')
    expect(formatVisibility(null, 'metric')).toBe('—')
  })

  it('renders times in the location timezone regardless of the browser', () => {
    const noonUtc = Date.UTC(2026, 9, 6, 12, 0)
    expect(
      formatLocalTime(noonUtc, 19_800, {
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
      })
    ).toBe('17:30')
    expect(
      formatLocalTime(noonUtc, -18_000, {
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
      })
    ).toBe('07:00')
  })

  it('labels today and tomorrow relative to the location', () => {
    const now = Date.UTC(2026, 9, 6, 20, 0)
    expect(formatDayLabel('2026-10-06', 0, now)).toBe('Today')
    // At UTC+5 it is already Oct 7.
    expect(formatDayLabel('2026-10-07', 5 * 3600, now)).toBe('Today')
    expect(formatDayLabel('2026-10-07', 0, now)).toBe('Tomorrow')
  })

  it('formats locations and UTC offsets', () => {
    expect(
      formatLocation({ name: 'London', state: 'England', country: 'GB' })
    ).toBe('London, England, GB')
    expect(formatLocation({ name: 'Tokyo', country: 'JP' })).toBe('Tokyo, JP')
    expect(formatUtcOffset(19_800)).toBe('UTC+5:30')
    expect(formatUtcOffset(-18_000)).toBe('UTC−5')
  })
})
