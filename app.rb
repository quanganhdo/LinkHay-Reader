require 'sinatra'
require 'haml'
require 'net/http'
require 'cgi'

get '/' do
  haml :index
end

get '/r/*' do
  response = nil
  Net::HTTP.start('api.linkhay.com', 80) do |http|
    params_as_string = params.collect { |k,v| "#{k}=#{v}" }.join('&')
    
    response = http.request_get("/1.0/#{params[:splat][0]}?#{params_as_string}", {'User-Agent' => 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_5; en-us) AppleWebKit/525.27.1 (KHTML, like Gecko) Version/3.2.1 Safari/525.27.1'})
  end           
  
  "#{params[:callback]}(#{response.body})"
end