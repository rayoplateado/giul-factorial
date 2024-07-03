import React, { useEffect, useState } from 'react'
import Panel from './Panel'
import { getMetricNames, saveNewMetric } from './utils/BackendApis'
import { toUTC } from './utils/DateHelpers'

const App = () => {
  const [newMetric, setNewMetric] = useState({ name: '', value: '', timestamp: '' })
  const [metricNames, setMetricNames] = useState([])

  useEffect(() => {
    const initMetricsList = async () => {
      const data = await getMetricNames()
      setMetricNames(data)
    }

    initMetricsList()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if any of the fields are empty
    if (!newMetric.name || !newMetric.value || !newMetric.timestamp) {
      alert('Please fill in all fields to create a new Metric') // for the exercise I don't implement a smarter validation
      return
    }

    await saveNewMetric(newMetric.name, newMetric.value, toUTC(newMetric.timestamp))
    setNewMetric({ name: '', value: '', timestamp: '' }) // Reset the form

    setMetricNames([]) // Reset metricNames to force reload
    const updatedMetricNames = await getMetricNames()
    setMetricNames(updatedMetricNames)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewMetric({ ...newMetric, [name]: value })
  }

  return (
    <div className="container-lg">
      <h1 className="text-center my-5">Metrics Dashboard</h1>

      <h3>Insert a new metric value</h3>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="p-2 d-flex flex-wrap align-items-center"
      >
        <div className="form-group mr-2 mb-2">
          <input
            type="text"
            name="name"
            value={newMetric.name}
            onChange={handleInputChange}
            placeholder="Metric Name"
            className="form-control"
            list="metricNames"
          />
          <datalist id="metricNames">
            {metricNames.map((metricName, index) => (
              <option key={index} value={metricName} />
            ))}
          </datalist>
        </div>
        <div className="form-group mr-2 mb-2 mx-4">
          <input
            type="number"
            name="value"
            value={newMetric.value}
            onChange={handleInputChange}
            placeholder="Value"
            className="form-control"
          />
        </div>
        <div className="form-group mr-2 mb-2">
          <input
            type="datetime-local"
            name="timestamp"
            value={newMetric.timestamp}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group mb-2 mx-4">
          <button type="submit" className="btn btn-primary">
            Add Metric
          </button>
        </div>
      </form>

      {metricNames.length === 0 ? (
        <p>
          No metrics available, please insert a new one or run <b>rake db:seed_weather_metrics</b>
        </p>
      ) : (
        metricNames.map((metricName) => <Panel metricName={metricName} key={metricName} />)
      )}
    </div>
  )
}

export default App
