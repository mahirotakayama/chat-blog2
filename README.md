# Chat-blogDB設計

## users table

|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false|
### Association
- has_many :posts

## postsテーブル
|Column|Type|Options|
|------|----|-------|
|title|text|null: false|
|text|text|null: false|
|image|string|null: false|
|user_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
