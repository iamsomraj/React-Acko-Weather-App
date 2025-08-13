export const getTimeFromTimestamp = (unixTimestamp: number | undefined) => {
  if (!unixTimestamp) {
    return ''
  }

  const date = new Date(unixTimestamp * 1000)
  const hours = date.getHours()
  const minutes = '0' + date.getMinutes()
  const seconds = '0' + date.getSeconds()
  const formattedTime =
    hours + ':' + minutes.slice(-2) + ':' + seconds.slice(-2)
  return formattedTime
}
