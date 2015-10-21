#ActiveRecordから継承
class Waterpark < ActiveRecord::Base
    #waterparkとuserを関連付け
    belongs_to :user
    #waterparkに順序を付ける（たぶんいらない）
    #default_scope -> { order('created_at DESC') }
    #必須属性placeがあるかどうか、最大50文字まで
    validates :place, presence: true, length: { maximum: 50 }
    #必須属性user_idがあるかどうか(本当に必須か?)
    validates :user_id, presence: true
    #必須属性latitudeがあるかどうか(-90 <= lat <= 90)
    validates :latitude, presence: true,
    numericality: { greater_than_or_equal_to:  -90, less_than_or_equal_to:  90 }
    #必須属性longitudeがあるかどうか(-180 <= log <= 180)
    validates :longitude, presence: true,
    numericality: { greater_than_or_equal_to: -180, less_than_or_equal_to: 180 }
end
