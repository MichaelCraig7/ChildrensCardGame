Rails.application.routes.draw do

  namespace :api do
    resources :games do
      resources :gamerooms 
      resources :users do
        resources :characters do
          resources :cards
        end
      end
    end
  end

end
