require 'spec_helper'

describe User do
  #userに情報を与える
  before do
    @user = User.new(name: "Example User", email: "user@example.com",
                     password: "foobar", password_confirmation: "foobar")
  end
　#userを対象にする
  subject { @user }

  it { should respond_to(:name) }
  it { should respond_to(:email) }
  it { should respond_to(:password_digest) }
  it { should respond_to(:password) }
  it { should respond_to(:password_confirmation) }
  it { should respond_to(:remember_token) }
  #？
  it { should respond_to(:authenticate) }
  
  it { should respond_to(:admin) }
  it { should respond_to(:waterparks) }
　#有効
  it { should be_valid }
  #adminの初期値はfalseであるため
  it { should_not be_admin }
  
  #adminにtrueがセットされた場合
  describe "with admin attribute set to 'true'" do
    #adminを切り替える
    before do
      @user.save!
      @user.toggle!(:admin)
    end

    it { should be_admin }
  end

  #nameがなかった場合
  describe "when name is not present" do
    before { @user.name = " " }
    it { should_not be_valid }
  end
  
  #emailがなかった場合
  describe "when email is not present" do
    before { @user.email = " " }
    it { should_not be_valid }
  end
  
  #name文字数オーバーの場合
  describe "when name is too long" do
    before { @user.name = "a" * 51 }
    it { should_not be_valid }
  end
  
  #emailのフォーマットが無効な場合
  describe "when email format is invalid" do
    it "should be invalid" do
      addresses = %w[user@foo,com user_at_foo.org example.user@foo.
                     foo@bar_baz.com foo@bar+baz.com]
      addresses.each do |invalid_address|
        @user.email = invalid_address
        expect(@user).not_to be_valid
      end
    end
  end

  #emailのフォーマットが有効な場合
  describe "when email format is valid" do
    it "should be valid" do
      addresses = %w[user@foo.COM A_US-ER@f.b.org frst.lst@foo.jp a+b@baz.cn]
      addresses.each do |valid_address|
        @user.email = valid_address
        expect(@user).to be_valid
      end
    end
  end
  
  #既に使われているemail addressだった場合
  describe "when email address is already taken" do
    before do
      #@userをコピーしてuser_with_same_emailを作る
      user_with_same_email = @user.dup
      #@userのemailを大文字にしてuser_with_same_emailに設定
      user_with_same_email.email = @user.email.upcase
      #user_with_same_emailを保存する（@userは保存されていない）
      user_with_same_email.save
    end

    it { should_not be_valid }
  end
  
  #passwordが存在しない場合
  describe "when password is not present" do
    before do
      @user = User.new(name: "Example User", email: "user@example.com",
                       password: " ", password_confirmation: " ")
    end
    it { should_not be_valid }
  end
  
  #passwordとpassword_confirmationが一致しなかった場合
  describe "when password doesn't match confirmation" do
    before { @user.password_confirmation = "mismatch" }
    it { should_not be_valid }
  end
  
  #passwordの文字数が短い場合
  describe "with a password that's too short" do
    before { @user.password = @user.password_confirmation = "a" * 5 }
    it { should be_invalid }
  end
  
  #入力したパスワードが一致する場合としない場合
  describe "return value of authenticate method" do
    before { @user.save }
    #@userとemailが一致するユーザーをデータベースから探してくる
    let(:found_user) { User.find_by(email: @user.email) }
    
    #一致した場合
    describe "with valid password" do
      it { should eq found_user.authenticate(@user.password) }
    end

    #一致しない場合
    describe "with invalid password" do
      #user_for_invalid_passwordに無効なpasswordで認証した結果を入れる
      let(:user_for_invalid_password) { found_user.authenticate("invalid") }
      
      it { should_not eq user_for_invalid_password }
      #user_for_invalid_passwordはfalseだよ
      specify { expect(user_for_invalid_password).to be_false }
    end
  end
  
  #remember tokenが有効であるかを確認（空欄ではない）
  describe "remember token" do
    #@user保存するとremenber_tokenが生成
    before { @user.save }
    #its(:remenber_token)は@user.remember_token
    its(:remember_token) { should_not be_blank }
  end
end