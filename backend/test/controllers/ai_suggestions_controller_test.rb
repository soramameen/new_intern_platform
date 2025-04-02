require "test_helper"

class AiSuggestionsControllerTest < ActionDispatch::IntegrationTest
  test "should get generate_bio" do
    get ai_suggestions_generate_bio_url
    assert_response :success
  end
end
