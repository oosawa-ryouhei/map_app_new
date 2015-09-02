require 'spec_helper'

describe "Waterpark pages" do

  subject { page }

  let(:user) { FactoryGirl.create(:user) }
  before { sign_in user }

  describe "waterpark creation" do
    before { visit root_path }

    describe "with invalid information" do

      it "should not create a waterpark" do
        expect { click_button "Post" }.not_to change(Waterpark, :count)
      end

      describe "error messages" do
        before { click_button "Post" }
        it { should have_content('error') }
      end
    end

    describe "with valid information" do

      before { fill_in 'waterpark_content', with: "Lorem ipsum" }
      it "should create a waterpark" do
        expect { click_button "Post" }.to change(Waterpark, :count).by(1)
      end
    end
  end
end