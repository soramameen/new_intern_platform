require "test_helper"

class Api::V1::OffersControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_offers_index_url
    assert_response :success
  end

  test "should get show" do
    get api_v1_offers_show_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_offers_create_url
    assert_response :success
  end

  test "should get update" do
    get api_v1_offers_update_url
    assert_response :success
  end
end
