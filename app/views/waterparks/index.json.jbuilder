json.array!(@waterparks) do |waterpark|
  json.extract! waterpark, :observed, :place, :weather, :e_coli, :coliform_bacteria, :cod, :water_temperature,
  :total_residual_cl, :nh3_n, :ph, :latitude, :longitude, :electric_conductivity, :color, :ecoli_color,
  :aquatic_organism, :dataset

  json.url waterpark_url(waterpark, format: :json)
  
end

