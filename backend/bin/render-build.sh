#!/usr/bin/env bash
# bin/render-build.sh
set -o errexit

bundle install
# APIモードではアセットコンパイルは不要なので削除
# bundle exec rake assets:precompile
# bundle exec rake assets:clean
# seeds用コメントアウト

# 安全なマイグレーション
bundle exec rails db:migrate

# 条件付きシーディング（必要な場合のみ）
bundle exec rails db:seed