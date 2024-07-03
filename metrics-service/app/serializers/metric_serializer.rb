class MetricSerializer
  # I want to have the same output format for metrics datapoints and averages datapoints
  # from "timestamp": "2024-06-24T09:17:42.236Z", "value": -0.6,
  # to "\"2024-06-24 09:17:00 UTC\": -0.6,"
  def self.serialize(records)
    records.each_with_object({}) do |record, datapoints|
      # timestamp are UTC already
      datapoints.store(record.timestamp, record.value)
    end
  end
end
