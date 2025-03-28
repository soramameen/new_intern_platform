# config/initializers/cors.rb
Rails.application.config.middleware.use Rack::Cors do
  allow do
    origins 'http://localhost:3000'  # フロントエンドのURL
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      expose: ['Authorization'],
      credentials: true
  end
end