class Waterpark < ActiveRecord::Base
    belongs_to :user
    default_scope -> { order('created_at DESC') }
    validates :place, presence: true, length: { maximum: 140 }
    validates :user_id, presence: true
end
