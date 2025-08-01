import { BASE_URL } from '@/data'

export const addPath = (text: string) => '/' + BASE_URL + '/' + text

export const getTimeFromTimestamp = (unix_timestamp: number | undefined) => {
  if (!unix_timestamp) {
    return ''
  }

  let date = new Date(unix_timestamp * 1000)
  let hours = date.getHours()
  let minutes = '0' + date.getMinutes()
  let seconds = '0' + date.getSeconds()
  let formattedTime =
    hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
  return formattedTime
}
