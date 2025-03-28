# config/routes.rb
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create, :index]
      
      post '/login', to: 'sessions#create'
      get '/logged_in', to: 'sessions#status'
    end
  end
end