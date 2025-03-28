Rails.application.routes.draw do
  # APIルート
  namespace :api do
    namespace :v1 do
      resources :users, only: [:create, :index]
      
      post '/login', to: 'sessions#create'
      get '/logged_in', to: 'sessions#status'
    end
  end
  
  # プロフィール関連のルート
  resource :intern_profile, only: [:show, :edit, :update]
  resource :company_profile, only: [:show, :edit, :update]
  
  # 公開プロフィール閲覧用（オプション）
  namespace :public do
    resources :interns, only: [:index, :show]
    resources :companies, only: [:index, :show]
  end
end