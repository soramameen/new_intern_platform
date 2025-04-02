# インターン生・企業マッチングサービス

## プロジェクト概要

このプロジェクトは、インターン生と企業をマッチングするための Web アプリケーションです。インターン生は自分のスキルやプロフィールを登録し、企業は求めるスキルや条件に合うインターン生を探すことができます。

## 技術スタック

### フロントエンド

- Next.js 15.2
- React 19.0
- TypeScript
- Tailwind CSS
- 認証管理: JWT + localStorage

### バックエンド

- Ruby on Rails
- SQLite
- JWT 認証
- RESTful API

## 主な機能

- **ユーザー認証システム**：JWT 認証を用いた安全なログイン・ログアウト機能
- **ユーザー種別管理**：インターン生と企業で異なる権限とビュー
- **プロフィール管理**：
  - **インターン生**：スキル、学歴、自己紹介等の登録・編集
  - **企業**：会社情報、業種、求める人材像等の登録・編集
- **オファー機能**：
  - **企業**：企業から気になるインターン生にオファーを送ることが可能
  - **インターン生**：企業から受け取ったオファーを承認・否認が可能

## アピールポイント

1. **セキュアな認証システム**

   - JWT を使用したトークンベースの認証システムを実装
   - クライアント側でのトークン管理とサーバーサイドでの検証による二重のセキュリティ
   - ユーザーのロールベースのアクセス制御（企業とインターン生で異なる権限）

2. **フロントエンド・バックエンド分離アーキテクチャ**

   - Next.js と Rails API の完全分離による開発の効率化
   - RESTful API によるクリーンな通信インターフェース
   - TypeScript による型安全性の確保

3. **UX/UI の工夫**

   - ユーザーフレンドリーなダッシュボード設計
   - Tailwind CSS を活用した一貫性のあるデザイン
   - ユーザーフィードバックの視覚的表示（エラーメッセージ、ローディング状態等）

## 開発で苦労した点と解決策

1. **rails での認証機能の実装**

   - **課題**：**devise** を用いた認証機能の実装がうまくいかなかった．
   - **解決策**：
     - デフォルトで rails で提供されている機能を使い，
       最小限の認証でプロトタイプとして作成した．

2. **Next.js 側での認証状態の管理**

   - **課題**：Next.js での認証機能の管理がうまくいかなかった．
   - **解決策**：
     - **jwt** を用いてシンプルに実装することにした．
     - **Local storage** にトークンとユーザー情報を保存しておくことで
       どこでも呼び出せるようにした．

3. **異なるユーザータイプの処理**

   - **課題**：インターン生と企業で異なるプロフィール情報や UI が必要だった
   - **解決策**：
     - それぞれで認証機能を作ろうとしたが，難しかった．
     - user モデルに intern か company かのカラムを追加することによって解決．
     - 異なるユーザータイプ用のページにアクセスした際，リダイレクトされるように．
     - 共通のページはユーザータイプで分岐するように．

## 今後の展望

- **オファー機能**：
- **チャット機能**：チャットとしてデータベースを管理．誰から誰へのアソシエーション．
  あとは作成された順に表示する．
- **検索機能**：フィルターを使えばすぐできそうではある

## セットアップ手順

### 前提条件

- Node.js 18.x 以上
- Ruby 3.x 以上
- Rails 7.x 以上
- PostgreSQL

### フロントエンド

```bash
# リポジトリのクローン
git clone [リポジトリURL]

# フロントエンドディレクトリに移動
cd frontend

# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

### バックエンド

```bash
# バックエンドディレクトリに移動
cd backend

# 依存パッケージのインストール
bundle install

# データベースの作成とマイグレーション
rails db:create
rails db:migrate

# サーバーの起動
rails s
```
