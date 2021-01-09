# SETUP RULES
# aws --endpoint=http://localhost:4566 events put-rule \
# --name "StripeEvent" \
# --event-bus-name "default" \
# --event-pattern "{\"source\":[\"stripe\"]}" \
# >/dev/null || true 

aws --endpoint=http://localhost:4566 events put-rule \
--name "IssuingTransaction" \
--event-bus-name "default" \
--event-pattern "{\"source\":[\"stripe\"], \"detail-type\":[\"issuing_transaction.updated\",\"issuing_transaction.created\"]} " \
>/dev/null || true 

# aws --endpoint=http://localhost:4566 events put-rule \
# --name "IssuingAuthorization" \
# --event-bus-name "default" \
# --event-pattern "{\"source\":[\"stripe\"], \"detail-type\":[\"issuing_authorization.request\", \"issuing_authorization.updated\"]} " \
# >/dev/null || true 

# aws --endpoint=http://localhost:4566 events put-rule \
# --name "Balance" \
# --event-bus-name "default" \
# --event-pattern "{\"source\":[\"stripe\"], \"detail-type\":[\"balance.available\"]} " \
# >/dev/null || true 

echo 🍾 stripe event rules created

# SET RULE TO TARGET LAMBDAS
# aws --endpoint-url=http://localhost:4566 events put-targets \
#  --rule "StripeEvent" \
#  --targets "Id"="1","Arn"="arn:aws:lambda:us-east-1:000000000000:function:stripe-event-local-eventSourceHandler" \
#  >/dev/null || true

aws --endpoint-url=http://localhost:4566 events put-targets \
 --rule "IssuingTransaction" \
 --targets "Id"="2","Arn"="arn:aws:lambda:us-east-1:000000000000:function:stripe-event-local-transactionHandler" \
 >/dev/null || true

#  aws --endpoint-url=http://localhost:4566 events put-targets \
#  --rule "IssuingAuthorization" \
#  --targets "Id"="3","Arn"="arn:aws:lambda:us-east-1:000000000000:function:stripe-event-local-authorizationHandler" \
#  >/dev/null || true


# aws --endpoint-url=http://localhost:4566 events put-targets \
#  --rule "Balance" \
#  --targets "Id"="4","Arn"="arn:aws:lambda:us-east-1:000000000000:function:stripe-event-local-balanceHandler" \
#  >/dev/null || true


echo 🥂 stripe event rule targets set

# SETUP STRIPE FORWARDING
API_ID=$(aws --endpoint=http://localhost:4566 apigateway get-rest-apis --query "items[?name==\`stripe-event-local\`].id" --output text --region us-east-1)
export REST_API_ID=$API_ID
echo 🥴👍 stripe forwarding to APIGateway at http://localhost:4566/restapis/${REST_API_ID}/local/_user_request_/stripe-event

stripe listen --forward-to http://localhost:4566/restapis/${REST_API_ID}/local/_user_request_/stripe-event