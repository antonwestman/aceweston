require 'rails_helper'
describe 'Signup Flow', type: :feature, js: true do
  before do
    visit('/')
  end
  context 'Signing in' do
    before {
      page.find('a', text: 'Sign in').click
    }
    it 'brings them login page' do
      expect(page).to have_current_path('/login')
    end
  end
  context 'Signing up' do
    before { page.find('a', text: 'Sign up').click }
    it 'brings them to register page' do
      expect(page).to have_current_path('/register')
    end
  end
end
