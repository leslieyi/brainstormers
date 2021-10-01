Rails.application.routes.draw do
  resources :reviewsets
  resources :reviewcards

  resources :flashcards
  resources :studysets

  resources :my_studysets
  get "/my-ordered-studysets", to: "my_studysets#my_ordered_studysets"
  get "/ordered-studysets", to: "studysets#ordered_studysets"

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  patch "/edit-profile", to: "users#update"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
