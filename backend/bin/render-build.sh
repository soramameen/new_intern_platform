#!/usr/bin/env bash
# bin/render-build.sh
set -o errexit

bundle install
# APIモードではアセットコンパイルは不要なので削除
# bundle exec rake assets:precompile
# bundle exec rake assets:clean
bundle exec rails db:migrate