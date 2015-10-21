class User < ActiveRecord::Base
  #保存する前にemailを小文字に変える
  before_save { self.email = email.downcase }
  
  # User生成のタイミングでcreate_remember_token
  before_create :create_remember_token
  
  #必須属性nameが存在しているかどうか、MAX50文字まで
  validates :name, presence: true, length: { maximum: 50 }
  
  #メールアドレスのフォーマットを指定
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  
  #必須属性emailが存在しているかどうか,メアドがフォーマットにハマっているか、大文字小文字区別しない
  validates :email, presence:   true,
                    format:     { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
  
  #パスワードをセキュアなパスワードに（パスワードを暗号化）
  has_secure_password
  
  #必須属性passwordが存在しているかどうか、6文字以上必須
  validates :password, length: { minimum: 6 }

  #新しいremember_tokenにランダムの文字列を当てる(urlsafe_base64メソッド利用)
  def User.new_remember_token
    SecureRandom.urlsafe_base64
  end
  
  #暗号化
  def User.encrypt(token)
    Digest::SHA1.hexdigest(token.to_s)
  end
  


  private
    # User生成時、before_createコールバックから呼び出す。
    def create_remember_token
      self.remember_token = User.encrypt(User.new_remember_token)
    end
end