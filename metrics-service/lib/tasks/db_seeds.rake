namespace :db do
  desc 'Seed weather metrics for the last 7 days'
  task seed_weather_like_metrics: :environment do
    # Temperature between -10.0 and 35.0 degrees Celsius
    MetricRandomSeeder.generate('temperature', -10.0..35.0)
    # Humidity between 0% and 100%
    MetricRandomSeeder.generate('humidity', 0..100)
    # UV index between 0 and 15 as an integer
    MetricRandomSeeder.generate('uv_index', 0..15)
    puts 'Seeds created successfully!'
  end
end

class MetricRandomSeeder
  def self.generate(name, value_range, num_samples = 500, last_days = 7)
    num_samples.times do
      timestamp = DateTime.now - (rand * last_days)
      value = rand(value_range)
      Metric.create(timestamp:, name:, value:)
    end
  end
end
