import { describe, expect, it } from 'vitest'
import {
  toCompass,
  toCondition,
  toConditionGroup,
  toLocalDateKey,
} from '@/converters'

describe('toConditionGroup', () => {
  it.each([
    [211, 'thunderstorm'],
    [301, 'drizzle'],
    [502, 'rain'],
    [601, 'snow'],
    [741, 'atmosphere'],
    [800, 'clear'],
    [804, 'clouds'],
  ])('maps %i to %s', (code, group) => {
    expect(toConditionGroup(code)).toBe(group)
  })
})

describe('toCompass', () => {
  it.each([
    [0, 'N'],
    [22.5, 'NNE'],
    [90, 'E'],
    [200, 'SSW'],
    [359, 'N'],
    [-90, 'W'],
    [720, 'N'],
  ])('maps %d° to %s', (degrees, direction) => {
    expect(toCompass(degrees)).toBe(direction)
  })
})

describe('toCondition', () => {
  it('derives day/night from the icon and capitalises the description', () => {
    expect(
      toCondition({
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01n',
      })
    ).toEqual({
      code: 800,
      group: 'clear',
      label: 'Clear',
      description: 'Clear sky',
      isDay: false,
    })
  })

  it('falls back gracefully when the API omits the condition', () => {
    expect(toCondition(undefined).group).toBe('clear')
  })
})

describe('toLocalDateKey', () => {
  it('shifts across midnight for positive and negative offsets', () => {
    const lateUtc = Date.UTC(2026, 9, 6, 22, 0) / 1000
    expect(toLocalDateKey(lateUtc, 0)).toBe('2026-10-06')
    expect(toLocalDateKey(lateUtc, 3 * 3600)).toBe('2026-10-07')
    expect(toLocalDateKey(Date.UTC(2026, 9, 6, 2) / 1000, -5 * 3600)).toBe(
      '2026-10-05'
    )
  })
})
