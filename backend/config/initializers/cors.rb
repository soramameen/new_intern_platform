# config/initializers/cors.rb
Rails.application.config.middleware.use Rack::Cors do
  allow do
    origins 'http://localhost:3000', 
            'https://new-intern-platform-git-main-soramameens-projects.vercel.app',
            'https://new-intern-platform.vercel.app'
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      expose: ['Authorization'],
      credentials: true
  end
end