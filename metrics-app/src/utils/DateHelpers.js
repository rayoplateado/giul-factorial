export const toUTC = (dateString) => {
  const localDate = new Date(dateString)
  const UTCDateString = localDate.toISOString()
  return UTCDateString
}
