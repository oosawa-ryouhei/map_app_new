class SessionsController < ApplicationController

  def new
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      # ユーザーをサインインさせ、ユーザーページ (show) にリダイレクトする。
      sign_in user
      redirect_back_or user
    else
      #エラーメッセージを表示
      flash.now[:error] = 'Invalid email/password combination'
      render 'new'
    end
  end

  #セッションを削除（サインアウト）
  def destroy
    sign_out
    redirect_to root_url
  end
end