Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  root 'main#index'
  get '*path', to: 'main#index' # Route catch-all to root
end
