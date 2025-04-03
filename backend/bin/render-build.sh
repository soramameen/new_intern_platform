#!/usr/bin/env bash
# bin/render-build.sh
set -o errexit

bundle install
# APIモードではアセットコンパイルは不要なので削除
# bundle exec rake assets:precompile
# bundle exec rake assets:clean
# seeds用コメントアウト
bundle exec rails db:migrate

# DISABLE_DATABASE_ENVIRONMENT_CHECK=1 bundle exec rake db:migrate:reset
# bundle exec rake db:seed 