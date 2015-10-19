require 'spec_helper'

describe Waterpark do

  #let(:user) { FactoryGirl.create(:user) }
  before do 
    @waterpark = Waterpark.new(place: "Lorem ipsum",
                               e_coli: "1000",
                               coliform_bacteria: "5000",
                               cod: "4",
                               total_residual_cl: "0.1",
                               nh3_n: "0.2",
                               ph: "7",
                               water_temperature: "20",
                               latitude: "35.654938",
                               longitude: "139.7479837",
                               weather: "Sunny",
                               user_id: "1")
  end

  subject { @waterpark }

  it { should respond_to(:place) }
  it { should respond_to(:user_id) }
  it { should respond_to(:user) }
  it { should respond_to(:e_coli) }
  it { should respond_to(:coliform_bacteria) }
  it { should respond_to(:cod) }
  it { should respond_to(:water_temperature) }
  it { should respond_to(:total_residual_cl) }
  it { should respond_to(:nh3_n) }
  it { should respond_to(:weather) }
  it { should respond_to(:observed) }
  it { should respond_to(:ph) }
  it { should respond_to(:latitude) }
  it { should respond_to(:longitude) }
  
  it { should be_valid }

  #user_idがない場合
  describe "when user_id is not present" do
    before { @waterpark.user_id = nil }
    it { should_not be_valid }
  end
  
  #placeが空の場合
  describe "with blank place" do
    before { @waterpark.place = " " }
    it { should_not be_valid }
  end
  
  #placeが長すぎるの場合
  describe "with place that is too long" do
    before { @waterpark.place = "a" * 51 }
    it { should_not be_valid }
  end
  
  #latitudeが空の場合
  describe "with blank latitude" do
    before { @waterpark.latitude = " " }
    it { should_not be_valid }
  end
  
  #latitudeの上限確認
  describe "with latitude that is more than" do
    before { @waterpark.latitude = 91}
    it { should_not be_valid }
  end
  
  #latitudeの下限確認
  describe "with latitude that is Fewer" do
    before { @waterpark.latitude = -91}
    it { should_not be_valid }
  end
  
  #longitudeが空の場合
  describe "with blank longitude" do
    before { @waterpark.longitude = " " }
    it { should_not be_valid }
  end
  
  #longitudeの上限確認
  describe "with longitude that is more than" do
    before { @waterpark.longitude = 181}
    it { should_not be_valid }
  end
  
  #longitudeの下限確認
  describe "with longitude that is Fewer" do
    before { @waterpark.longitude = -181}
    it { should_not be_valid }
  end
end