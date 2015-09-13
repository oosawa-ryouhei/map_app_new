json.array!(@waterparks) do |waterpark|
  json.extract! waterpark, :latitude, :longitude
  json.url waterpark_url(waterpark, format: :json)
end

