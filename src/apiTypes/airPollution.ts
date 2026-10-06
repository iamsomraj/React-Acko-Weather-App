import type { OwmCoord } from './common'

/** GET /data/2.5/air_pollution */
export interface OwmAirPollutionResponse {
  coord: OwmCoord
  list: {
    dt: number
    /** Air Quality Index: 1 = Good … 5 = Very Poor */
    main: { aqi: 1 | 2 | 3 | 4 | 5 }
    /** Concentrations in μg/m³ */
    components: {
      co: number
      no: number
      no2: number
      o3: number
      so2: number
      pm2_5: number
      pm10: number
      nh3: number
    }
  }[]
}
