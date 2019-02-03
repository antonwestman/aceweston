# rubocop:disable Rails/LexicallyScopedActionFilter
class ApiController < ActionController::API
  include Pundit
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def user_not_authorized
    render json: {
      errors: ['You are not allowed to perform that action']
    }, status: :unauthorized
  end
end
# rubocop:enable Rails/LexicallyScopedActionFilter
