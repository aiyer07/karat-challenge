# RESULT=$(aws --endpoint-url=http://localhost:4566 secretsmanager update-secret --secret-id StripeWebhookSigningSecret --secret-string $1)
R2=$(aws --endpoint-url=http://localhost:4566 secretsmanager update-secret --secret-id StripeWebhookSigningSecret --secret-string $1 ||  aws --endpoint-url=http://localhost:4566 secretsmanager create-secret --name StripeWebhookSigningSecret --secret-string $1)
# echo $R2