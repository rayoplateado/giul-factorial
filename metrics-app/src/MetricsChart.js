import React from 'react'
import { Chart } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'
import 'chart.js/auto'

const MetricsChart = ({ metricName, metricData }) => (
  <div>
    <h4 className="text-uppercase text-center">{metricName} chart</h4>
    <div style={{ height: '400px' }}>
      <Chart
        data={metricData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'time',
              ticks: {
                major: {
                  enabled: true
                }
              },
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Value'
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  </div>
)

export default MetricsChart
