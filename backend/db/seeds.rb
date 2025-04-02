# db/seeds.rb
# 開発用のサンプルデータを生成

# データベースをクリーンアップ
puts "データベースをクリーンアップしています..."
Offer.destroy_all
User.destroy_all
# プロフィールはユーザー削除時に関連削除されるため明示的に削除する必要はありません

# ランダムなデータ生成のためのヘルパーメソッド
def random_date_future(from = Date.today, to = 2.years.from_now.to_date)
  rand(from..to)
end

# 異なるスキルセットを用意
skills_sets = [
  "JavaScript, React, Node.js",
  "Python, Django, Flask, AWS",
  "Ruby, Rails, PostgreSQL",
  "Java, Spring Boot, Hibernate",
  "PHP, Laravel, MySQL",
  "C#, .NET, Azure",
  "Swift, iOS, Objective-C",
  "Kotlin, Android, Firebase",
  "HTML, CSS, JavaScript, jQuery",
  "React Native, Flutter, Mobile Development",
  "Docker, Kubernetes, DevOps",
  "AWS, GCP, Cloud Infrastructure",
  "TypeScript, Angular, Vue.js",
  "Data Science, Machine Learning, Python",
  "UI/UX Design, Figma, Adobe XD",
  "Product Management, Agile, Scrum",
  "GraphQL, Apollo, API Development",
  "Rust, Go, Systems Programming",
  "BlockChain, Smart Contracts, Solidity",
  "Unity, Game Development, C#"
]

# 大学と専攻のサンプル
universities = [
  "東京大学", "京都大学", "大阪大学", "名古屋大学", "九州大学", 
  "北海道大学", "東北大学", "慶應義塾大学", "早稲田大学", "立命館大学",
  "同志社大学", "関西大学", "明治大学", "法政大学", "上智大学"
]

majors = [
  "情報工学", "コンピュータサイエンス", "システム工学", "電気電子工学", "機械工学",
  "応用数学", "物理学", "デザイン学", "経営情報学", "メディア学",
  "人工知能", "データサイエンス", "サイバーセキュリティ", "ロボティクス", "生命情報学"
]

# 会社の業種サンプル
industries = [
  "Webサービス/SaaS", "モバイルアプリ開発", "ゲーム開発", "AI/機械学習", "FinTech",
  "HealthTech", "EdTech", "EC/通販", "広告/マーケティング", "セキュリティ",
  "クラウドサービス", "IoT", "コンサルティング", "エンタープライズソフトウェア", "デジタルトランスフォーメーション"
]

# 企業規模のサンプル
company_sizes = ["1-10人", "11-50人", "51-100人", "101-300人", "301-1000人", "1000人以上"]

# 場所のサンプル
locations = [
  "東京都", "大阪府", "京都府", "神奈川県", "愛知県",
  "福岡県", "北海道", "宮城県", "広島県", "沖縄県",
  "千葉県", "埼玉県", "兵庫県", "静岡県", "茨城県"
]

# ポジションのサンプル
positions = [
  "フロントエンドエンジニア", "バックエンドエンジニア", "フルスタックエンジニア", "モバイルアプリ開発者",
  "UI/UXデザイナー", "データサイエンティスト", "機械学習エンジニア", "DevOpsエンジニア",
  "QAエンジニア", "プロダクトマネージャー", "テクニカルライター", "ゲーム開発者",
  "セキュリティエンジニア", "クラウドエンジニア", "ブロックチェーンエンジニア"
]

puts "=== インターン生データを生成しています ==="
# メインのインターン生ユーザーを作成
main_intern = User.create!(
  email: 'intern@example.com',
  password: 'password',
  user_type: 'intern',
  name: '山田太郎',
  skills: 'JavaScript, React, Ruby',
  bio: '大学3年生です。Webアプリケーション開発に興味があります。'
)

# プロフィール情報を更新
main_intern.intern_profile.update!(
  name: main_intern.name,
  bio: main_intern.bio,
  school: "東京大学",
  major: "情報工学",
  expected_graduation: "2026年3月",
  skills: main_intern.skills,
  github_url: "https://github.com/yamada-taro",
  portfolio_url: "https://portfolio.yamada-taro.example.com",
  location: "東京都"
)

puts "メインインターン生を作成しました: #{main_intern.name}"

# その他のインターン生を作成（一意のメールアドレスを使用）
29.times do |i|
  graduation_year = rand(2026..2028)
  graduation_month = rand(1..12)
  graduation_date = "#{graduation_year}年#{graduation_month}月"
  
  # 一意の接頭辞を持つメールアドレスを生成
  unique_prefix = "intern_#{i+1}"
  random_part = ('a'..'z').to_a.shuffle[0,5].join
  email = "#{unique_prefix}_#{random_part}@example.com"
  
  user = User.create!(
    email: email,
    password: 'password',
    user_type: 'intern',
    name: "インターン生#{i+1}",
    skills: skills_sets.sample,
    bio: "#{universities.sample}の学生です。#{rand(1..4)}年生で、#{majors.sample}を専攻しています。"
  )
  
  # プロフィール情報を更新
  user.intern_profile.update!(
    name: user.name,
    bio: user.bio,
    school: universities.sample,
    major: majors.sample,
    expected_graduation: graduation_date,
    skills: user.skills,
    github_url: "https://github.com/user_#{i+1}",
    portfolio_url: rand < 0.7 ? "https://portfolio-#{i+1}.example.com" : nil,
    location: locations.sample
  )
  
  puts "インターン生 #{i+1}/29 を作成しました: #{user.name}"
end

puts "=== 企業データを生成しています ==="
# メインの企業ユーザーを作成
main_company = User.create!(
  email: 'company@example.com',
  password: 'password',
  user_type: 'company',
  name: '採用担当',
  company_name: '株式会社サンプル',
  company_description: 'Webアプリケーション開発を行うベンチャー企業です。JavaScriptやReactを使った開発を行っています。'
)

# プロフィール情報を更新
main_company.company_profile.update!(
  company_name: main_company.company_name,
  description: main_company.company_description,
  industry: "Webサービス/SaaS",
  location: "東京都",
  website: "https://sample-company.example.com",
  company_size: "11-50人"
)

puts "メイン企業を作成しました: #{main_company.company_name}"

# その他の企業を作成（一意のメールアドレスを使用）
19.times do |i|
  # 一意の接頭辞を持つメールアドレスを生成
  unique_prefix = "company_#{i+1}"
  random_part = ('a'..'z').to_a.shuffle[0,5].join
  email = "#{unique_prefix}_#{random_part}@example.com"
  
  # 企業説明文にはランダムにスキルを入れておく（レコメンデーション機能のマッチング用）
  skills_for_description = skills_sets.sample.split(', ')
  used_skills = skills_for_description.select { |_| rand < 0.7 }.join('や')
  
  user = User.create!(
    email: email,
    password: 'password',
    user_type: 'company',
    name: "採用担当#{i+1}",
    company_name: "株式会社テクノ#{i+1}",
    company_description: "#{industries.sample}を行う企業です。#{used_skills}などの技術を活用した開発をしています。"
  )
  
  # プロフィール情報を更新
  user.company_profile.update!(
    company_name: user.company_name,
    description: user.company_description,
    industry: industries.sample,
    location: locations.sample,
    website: "https://company-#{i+1}.example.com",
    company_size: company_sizes.sample
  )
  
  puts "企業 #{i+1}/19 を作成しました: #{user.company_name}"
end

# オファーの生成
puts "=== オファーデータを生成しています ==="
# 企業のIDリスト
company_ids = User.where(user_type: 'company').pluck(:id)
# インターン生のIDリスト
intern_ids = User.where(user_type: 'intern').pluck(:id)

# オファーデータを生成（各企業から複数のインターン生へ）
company_ids.each do |company_id|
  # 各企業からランダムな数（1〜3人）のインターン生にオファーを送る
  intern_sample = intern_ids.sample(rand(1..3))
  
  intern_sample.each do |intern_id|
    # ステータスをランダムに選択（70%が保留中、20%が承諾済み、10%が拒否）
    status = if rand < 0.7
              :pending
            elsif rand < 0.9
              :accepted
            else
              :declined
            end
    
    position = positions.sample
    
    # オファーを作成
    begin
      Offer.create!(
        company_id: company_id,
        intern_id: intern_id,
        position: position,
        message: "#{position}として一緒に働きませんか？あなたのスキルと経験を活かせるプロジェクトがあります。",
        details: "勤務時間: 週20時間〜\n報酬: 時給1,500円〜\n期間: 3ヶ月〜\nリモートワーク可能です。",
        status: status
      )
      
      puts "企業ID:#{company_id} からインターンID:#{intern_id} へのオファーを作成しました"
    rescue ActiveRecord::RecordInvalid => e
      puts "オファー作成エラー: #{e.message}"
    end
  end
end

puts "=== シードデータの作成が完了しました ==="
puts "サンプルログイン情報:"
puts "インターン生: email: intern@example.com, password: password"
puts "企業: email: company@example.com, password: password"