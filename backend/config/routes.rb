# config/routes.rb
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get "interns/show"
      # get "offers/index"
      # get "offers/show"
      # get "offers/create"
      # get "offers/update"
      # 認証関連
      post '/login', to: 'sessions#create'
      get '/logged_in', to: 'sessions#status'
      
      # ユーザー関連
      resources :users, only: [:create, :index]
      
      # プロフィール関連
      resource :profile, only: [:show]
      resource :intern_profile, only: [:show, :update]
      resource :company_profile, only: [:show, :update]
      resources :offers, only: [:index, :show, :create, :update]
      resources :interns, only: [:show]
      resources :messages, only: [:index, :create]
      resources :companies, only: [:show]
      
    end
  end
end