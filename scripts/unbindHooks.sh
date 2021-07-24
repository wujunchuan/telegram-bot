set -u
echo 'unbind hooks to telegram'

if [ -f .env ]; then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

curl -X "POST" "https://api.telegram.org/bot${TELEGRAM_TOKEN}/setWebhook" \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d $'{
  "url": "https://bot.fuckwechat.com/api/webhook"
}'
