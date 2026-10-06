/** One result from GET /geo/1.0/direct or /geo/1.0/reverse */
export interface OwmGeocodingResult {
  name: string
  local_names?: Record<string, string>
  lat: number
  lon: number
  country: string
  state?: string
}

export type OwmGeocodingResponse = OwmGeocodingResult[]
