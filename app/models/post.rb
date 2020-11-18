class Post < ApplicationRecord
  validates :title, :content, :image, presence: true
  belongs_to :user

  validates :content, presence: true, unless: :image?

  mount_uploader :image, ImageUploader
end
