require "test_helper"

class CompanyProfilesControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get company_profiles_show_url
    assert_response :success
  end

  test "should get edit" do
    get company_profiles_edit_url
    assert_response :success
  end

  test "should get update" do
    get company_profiles_update_url
    assert_response :success
  end
end
