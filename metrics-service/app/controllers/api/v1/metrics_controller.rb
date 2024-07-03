module Api
  module V1
    class MetricsController < ApplicationController
      # return the list of the names for all the existing metrics
      def index
        metric_names = Metric.select(:name).distinct.order(:name).pluck(:name)
        render json: metric_names
      end

      def show
        range = time_range(params[:date_start], params[:date_end])
        metric_records = Metric.select(:timestamp, :value)
                               .where(name: params[:id], timestamp: range)
                               .order(timestamp: :asc)
        metric_datapoints = MetricSerializer.serialize(metric_records)
        render json: metric_datapoints
      end

      def create
        metric = Metric.new(metric_params)
        if metric.save
          render json: metric, status: :created
        else
          render json: metric.errors, status: :unprocessable_entity
        end
      end

      def average
        range = time_range(params[:date_start], params[:date_end])
        avg_datapoints = Metric.where(name: params[:id])
                               .group_by_period(params[:granularity], :timestamp, series: false, range:)
                               .average(:value)

        avg_datapoints.transform_keys!(&:end_of_day) if params[:granularity] == 'day'
        render json: avg_datapoints
      end

      private

      def metric_params
        params.require(:metric).permit(:timestamp, :name, :value)
      end

      def time_range(date_start_param, date_end_param)
        date_start = safe_date_parse(date_start_param)
        date_end = safe_date_parse(date_end_param)
        return default_time_range unless date_start.present? || date_end.present?
        Range.new(date_start, date_end)
      end

      def default_time_range
        4.days.ago...
      end

      def safe_date_parse(date_string)
        date_string.nil? ? nil : Date.parse(date_string)
      rescue Date::Error
        nil
      end
    end
  end
end
