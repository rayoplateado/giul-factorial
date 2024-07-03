# Metrics Service

## Dependencies
`Ruby 3.3.x`
`Sqlite3 1.4`

## Initial setup
1. Install required libraries: `bundle install`
2. Database creation: `rake db:create`
3. Data tables creation: `rake db:migrate`

## Seed data
From the frontend application the user can create new metric data, but to have a set of meaningful data there is a rake task:
`rake db:seed_weather_like_metrics`

## Start the service
Start the server: `bin/rails s`
The service is reacheable at the address: `http://localhost:3000`
