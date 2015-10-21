class UsersController < ApplicationController
  #アクション実行前に定義する
  before_action :signed_in_user, only: [:edit, :update, :destroy]
  before_action :correct_user,   only: [:edit, :update]
  before_action :admin_user,     only: :destroy
  
  #すべてのユーザーを表示するページ
  # def index
  #   @users = User.paginate(page: params[:page])
  # end
  
  #特定のユーザーを表示するページ
  def show
    @user = User.find(params[:id])
  end
  
  #ユーザーを新規作成するページ (ユーザー登録)
  def new
    @user = User.new
  end
  
  #ユーザーを作成するアクション
  def create
    @user = User.new(user_params)
    if @user.save
      sign_in @user
      flash[:success] = "Welcome !"
      redirect_to @user
    else
      render 'new'
    end
  end
  
  #ユーザーを編集するページ
  def edit
  end
  
  #ユーザー情報を更新するアクション
  def update
    if @user.update_attributes(user_params)
      flash[:success] = "Profile updated"
      redirect_to @user
    else
      render 'edit'
    end
  end
  
  #ユーザーを削除するアクション
  def destroy
    User.find(params[:id]).destroy
    flash[:success] = "User destroyed."
    redirect_to users_url
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password,
                                   :password_confirmation)
    end
    
    # Before actions

    
    def signed_in_user
      unless signed_in?
        store_location #ユーザーがいたページを記憶
        redirect_to signin_url, notice: "Please sign in."
      end
    end

    #不正なユーザーがsigninページに行かないように（Homeへ飛ばす）
    def correct_user
      @user = User.find(params[:id])
      #ログインしているユーザーであればroot_pathを実行
      redirect_to(root_path) unless current_user?(@user)
    end
    
    #destroyアクションから管理者へのアクセスを制限する
    def admin_user
      redirect_to(root_path) unless current_user.admin?
    end
end