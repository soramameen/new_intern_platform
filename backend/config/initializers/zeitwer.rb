# config/initializers/zeitwerk.rb
Rails.autoloaders.main.ignore(
  "#{Rails.root}/app/assets",
  "#{Rails.root}/app/javascript",
  "#{Rails.root}/app/views"
)