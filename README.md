# Telegram 机器人

API 文档
https://core.telegram.org/bots/api

## 步骤

### 注册机器人
### 使用 ngrok 映射到外网
### 配置 webhook 到机器人
### 注册 webhook 到机器人
- 注册 Token，得到 `<YOUR-BOT-TOKEN>`

  https://t.me/botfather

- `pnpm install -g vercel`
- 创建 `api/webhook.js`
- `TELEGRAM_TOKEN=<YOUR-BOT-TOKEN> vercel dev`
- `pnpm install -g ngrok`
- `curl -X POST https://api.telegram.org/bot<YOUR-BOT-TOKEN>/setWebhook -H "Content-type: application/json" -d '{"url": "https://8fbd312cf3d7.ngrok.io/api/webhook"}' `

- `TELEGRAM_TOKEN=<YOUR-BOT-TOKEN> vercel dev`

## Deploying to Vercel

## 效果

![hxlW3HQRrNPT8aI](https://i.loli.net/2021/07/17/hxlW3HQRrNPT8aI.png)
