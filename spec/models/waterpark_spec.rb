require 'spec_helper'

describe Waterpark do

  let(:user) { FactoryGirl.create(:user) }
  before { @waterpark = user.waterparks.build(place: "Lorem ipsum") }

  subject { @waterpark }

  it { should respond_to(:place) }
  it { should respond_to(:user_id) }
  it { should respond_to(:user) }
  its(:user) { should eq user }
  
  it { should be_valid }

  describe "when user_id is not present" do
    before { @waterpark.user_id = nil }
    it { should_not be_valid }
  end
  
  describe "when user_id is not present" do
    before { @waterpark.user_id = nil }
    it { should_not be_valid }
  end

  describe "with blank place" do
    before { @waterpark.place = " " }
    it { should_not be_valid }
  end

  describe "with place that is too long" do
    before { @waterpark.place = "a" * 141 }
    it { should_not be_valid }
  end
end