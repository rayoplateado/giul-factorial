import axios from 'axios'

const apiServerBaseURL = 'http://localhost:3000/api/v1' // it should go in a .env file

const getDataFromServer = async (relativePath, params = {}) => {
  try {
    const endpoint = `${apiServerBaseURL}/${relativePath}`
    const response = await axios.get(endpoint, { params: params })
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}

const postDataToServer = async (relativePath, params) => {
  try {
    const endpoint = `${apiServerBaseURL}/${relativePath}`
    const response = await axios.post(endpoint, { metric: params })
    return response.data
  } catch (error) {
    console.error('Error saving data:', error)
    return []
  }
}

export const getMetricNames = async () => {
  const relativePath = 'metrics'
  return getDataFromServer(relativePath)
}

export const getMetricDatapoints = async (metricName) => {
  const relativePath = `metrics/${metricName}`
  return getDataFromServer(relativePath)
}

export const getMetricAverageDatapoints = async (metricName, granularity) => {
  const relativePath = `metrics/${metricName}/average/${granularity}`
  return getDataFromServer(relativePath)
}

export const saveNewMetric = async (name, value, UTCTimestamp) => {
  const relativePath = 'metrics'
  const metricData = { name: name, value: value, timestamp: UTCTimestamp }
  return postDataToServer(relativePath, metricData)
}
