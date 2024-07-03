class CreateMetrics < ActiveRecord::Migration[7.1]
  def change
    create_table :metrics do |t| # rubocop:disable Rails/CreateTableWithTimestamps
      t.datetime :timestamp
      t.string :name
      t.float :value

      # t.timestamps # not needed
    end
  end
end
