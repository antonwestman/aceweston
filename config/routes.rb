Rails.application.routes.draw do
  if defined?(ArkivITInitialized)
    mount_devise_token_auth_for 'User', at: 'auth'
  end

  root 'main#index'
  get '*path', to: 'main#index' # Route catch-all to root
end
