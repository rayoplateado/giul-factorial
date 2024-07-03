export const formatDatapointsCollection = (data) => {
  return Object.keys(data).map((key) => ({
    x: new Date(key),
    y: data[key]
  }))
}

export const getChartLabels = (data) => {
  return data.map((d) => d.x)
}

export const barChartDataset = (dataset, label) => {
  return {
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    barThickness: 5,
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1,
    data: dataset,
    label: label,
    order: 2,
    type: 'bar'
  }
}

export const lineChartDataset = (dataset, metricName) => {
  return {
    backgroundColor: getAvgColor(metricName),
    borderColor: getAvgColor(metricName),
    borderWidth: 1,
    cubicInterpolationMode: 'monotone',
    data: dataset,
    label: 'Avg x ' + metricName,
    metricName: metricName,
    order: 1,
    type: 'line'
  }
}

const getAvgColor = (avgName) => {
  switch (avgName) {
    case 'minute':
      return 'rgba(153, 102, 255, 1)'
    case 'hour':
      return 'rgba(0, 100, 0, 1)'
    case 'day':
      return 'rgba(0, 0, 139, 1)'
    default:
      return ''
  }
}
