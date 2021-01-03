API_ID=$(aws --endpoint=http://localhost:4566 apigateway get-rest-apis --query "items[?name==\`stripe-event-local\`].id" --output text --region us-east-1)
export REST_API_ID=$API_ID
echo http://localhost:4566/restapis/${REST_API_ID}/local/_user_request_/stripe-event
stripe listen --forward-to http://localhost:4566/restapis/${REST_API_ID}/local/_user_request_/stripe-event