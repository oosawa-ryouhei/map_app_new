require 'spec_helper'

describe Waterpark do
    let(:user) { FactoryGirl.create(:user) }
  before {  @waterpark = user.waterpark(escherichia_coli: "5000")}
  
  subject { @waterpark }
  it { should respond_to(:escherichia_coli) }
  it { should respond_to(:coliform_bacteria) }
  it { should respond_to(:COD) }
  it { should respond_to(:water_temperature) }
  it { should respond_to(:total_residual_chlorine) }
  it { should respond_to(:ammonium_nitrogen) }
  it { should respond_to(:pH) }
  it { should respond_to(:weather) }
  it { should respond_to(:observed) }
  it { should respond_to(:place) }
  it { should respond_to(:latitude) }
  it { should respond_to(:longitude) }
  it { should respond_to(:user) }
  
  it { should be_valid }
  its(:user) { should eq user }
  
  describe "when escherichia_coli is not present" do
    before { @waterpark.escherichia_coli = nil }
    it { should_not be_valid }
  end

end
