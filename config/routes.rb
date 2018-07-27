Rails.application.routes.draw do

  namespace :api do
    resources :games do
      resources :gameboards 
      resources :users do
        resources :characters do
          resources :cards
        end
      end
    end
  end

end
