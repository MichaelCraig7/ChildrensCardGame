Rails.application.routes.draw do

  namespace :api do
    get 'cards/index'
    get 'cards/show'
    get 'cards/create'
    get 'cards/update'
    get 'cards/destroy'
  end
  namespace :api do
    get 'characters/index'
    get 'characters/show'
    get 'characters/create'
    get 'characters/update'
    get 'characters/destroy'
  end
  namespace :api do
    get 'users/index'
    get 'users/show'
    get 'users/create'
    get 'users/update'
    get 'users/destroy'
  end
  namespace :api do
    get 'games/index'
    get 'games/show'
    get 'games/create'
    get 'games/update'
    get 'games/destroy'
  end
  namespace :api do
    resources :game do
      resources :user do
        resources :character do
          resources :card
        end
      end
    end
  end

end
