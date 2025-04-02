class Api::V1::AiSuggestionsController < ApplicationController
  before_action :authenticate_user!
  def generate_bio
      skills = params[:skills] || ""
      
      response = HTTParty.post(
        "https://api.openai.com/v1/chat/completions",
        headers: {
          "Authorization" => "Bearer #{ENV['OPENAI_API_KEY']}",
          "Content-Type" => "application/json"
        },
        body: {
          model: "gpt-4o-mini",
          messages: [
            { 
              role: "system", 
              content: "あなたは自己紹介文をJSON形式で生成するアシスタントです。50文字以内で簡潔に。" 
            },
            { 
              role: "user", 
              content: "スキル: #{skills} を元にJSON形式で自己紹介文を生成してください" 
            }
          ],
          max_tokens: 60,
          temperature: 0.7,
          response_format: { type: "json_object" }
        }.to_json
      )

      Rails.logger.info "OpenAI Response: #{response.body}"
      
      if response.success?
        # JSON解析の修正
        parsed_response = JSON.parse(response.body)
        bio = parsed_response.dig("choices", 0, "message", "content")
        
        render json: { bio: bio.strip }
      else
        Rails.logger.error "OpenAI Error: #{response.code} - #{response.body}"
        render json: { error: "AI提案の取得に失敗しました" }, status: :unprocessable_entity
      end
  rescue => e
        Rails.logger.error "予期せぬエラー: #{e.message}"
        render json: { error: "予期せぬエラーが発生しました" }, status: :internal_server_error
  end
end