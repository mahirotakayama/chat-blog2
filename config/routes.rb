Rails.application.routes.draw do
  devise_for :users
  root to: 'posts#index'
  resources :posts, except: :index
  resources :users, only: :show

    namespace :api do
      resources :posts, only: :index, defaults: { format: 'json' }
  end

end
