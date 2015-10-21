class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  #SessionsHelperの内容を含む
  include SessionsHelper
end