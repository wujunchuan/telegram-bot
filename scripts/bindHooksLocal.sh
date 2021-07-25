set -u
source ./scripts/importEnv.sh
echo 'bind hooks to telegram'

curl -X "POST" "https://api.telegram.org/bot${TELEGRAM_TOKEN}/setWebhook" \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d $'{
  "url": "https://fuckwechat.loca.lt/api/webhook/api/webhook"
}'
