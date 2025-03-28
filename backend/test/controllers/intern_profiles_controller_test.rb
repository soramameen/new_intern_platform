require "test_helper"

class InternProfilesControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get intern_profiles_show_url
    assert_response :success
  end

  test "should get edit" do
    get intern_profiles_edit_url
    assert_response :success
  end

  test "should get update" do
    get intern_profiles_update_url
    assert_response :success
  end
end
