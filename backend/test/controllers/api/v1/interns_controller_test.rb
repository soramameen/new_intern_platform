require "test_helper"

class Api::V1::InternsControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get api_v1_interns_show_url
    assert_response :success
  end
end
