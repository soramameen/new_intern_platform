# db/seeds.rb
# テストユーザー: インターン生
User.create(
  email: 'intern@example.com',
  password: 'password',
  user_type: 'intern',
  name: '山田太郎',
  skills: 'JavaScript, React, Ruby',
  bio: '大学3年生です。Webアプリケーション開発に興味があります。'
)

# テストユーザー: 企業
User.create(
  email: 'company@example.com',
  password: 'password',
  user_type: 'company',
  name: '採用担当',
  company_name: '株式会社サンプル',
  company_description: 'Webアプリケーション開発を行うベンチャー企業です。'
)

puts "シードデータが作成されました。"