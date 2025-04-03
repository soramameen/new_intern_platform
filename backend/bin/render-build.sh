#!/usr/bin/env bash
# bin/render-build.sh
set -o errexit

bundle install
bundle exec rake assets:precompile
bundle exec rake assets:clean
bundle exec rails db:migrate