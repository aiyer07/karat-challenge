# RESULT=$(aws --endpoint-url=http://localhost:4566 secretsmanager update-secret --secret-id StripeWebhookSigningSecret --secret-string $1)
aws --endpoint-url=http://localhost:4566 secretsmanager \
update-secret --secret-id StripeWebhookSigningSecret \
--secret-string $1 >/dev/null \
||  aws --endpoint-url=http://localhost:4566 secretsmanager create-secret \
--name StripeWebhookSigningSecret \
--secret-string $1 >/dev/null

echo 🤫 stripe signing secret stored
