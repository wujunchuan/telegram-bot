set -u
echo 'bind hooks to telegram'

if [ -f .env ]; then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

curl -X "POST" "https://api.telegram.org/bot${TELEGRAM_TOKEN}/setWebhook" \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d $'{
  "url": "https://wujunchuan-telegram-bot-pj6grr94c6v9w-3000.githubpreview.dev/api/webhook"
}'
