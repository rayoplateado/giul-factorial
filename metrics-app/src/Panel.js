import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import MetricsChart from './MetricsChart'
import { getMetricDatapoints, getMetricAverageDatapoints } from './utils/BackendApis'
import {
  formatDatapointsCollection,
  getChartLabels,
  barChartDataset,
  lineChartDataset
} from './utils/ChartHelpers'

const Panel = ({ metricName }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] }) // current chart datasets
  const [activeAvgMetrics, setActiveAvgMetrics] = useState([]) //current active avg metrics
  const [metricsData, setMetricsData] = useState({}) // avg data retention to avoid multiple loadings

  const loadMetricData = async (metricName) => {
    const rawDatapoints = await getMetricDatapoints(metricName)
    const metricDatapoints = formatDatapointsCollection(rawDatapoints)

    setChartData({
      labels: getChartLabels(metricDatapoints),
      datasets: [barChartDataset(metricDatapoints, metricName)]
    })
  }

  useEffect(() => {
    loadMetricData(metricName)
  }, [metricName])

  const avgMetricsToggle = async (averageName) => {
    if (activeAvgMetrics.includes(averageName)) {
      setActiveAvgMetrics((prevMetrics) => prevMetrics.filter((m) => m !== averageName))
      setChartData((prevChartData) => ({
        ...prevChartData,
        datasets: prevChartData.datasets.filter((dataset) => dataset.metricName !== averageName)
      }))
    } else {
      const rawAvgDatapoints =
        metricsData[averageName] || (await getMetricAverageDatapoints(metricName, averageName))
      const avgDatapoints = metricsData[averageName] || formatDatapointsCollection(rawAvgDatapoints)
      if (!metricsData[averageName]) {
        setMetricsData((prevData) => ({ ...prevData, [averageName]: avgDatapoints }))
      }
      setActiveAvgMetrics((prevMetrics) => [...prevMetrics, averageName])
      setChartData((prevChartData) => ({
        ...prevChartData,
        datasets: [...prevChartData.datasets, lineChartDataset(avgDatapoints, averageName)]
      }))
    }
  }

  return (
    <div className="card my-5">
      <div className="card-body">
        <MetricsChart metricName={metricName} metricData={chartData} />

        <div className="d-flex justify-content-center">
          <div>
            {['minute', 'hour', 'day'].map((averageName) => (
              <button
                key={averageName}
                type="button"
                className={`mx-2 btn ${activeAvgMetrics.includes(averageName) ? 'btn-info' : 'btn-secondary'}`}
                onClick={() => avgMetricsToggle(averageName)}
              >
                Average per {averageName}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Panel
