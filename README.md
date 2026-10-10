# AI Store Chat for WooCommerce

A free, lightweight AI chat widget for WooCommerce stores. It answers customer questions about shipping, returns and products **using only your own store pages and product list** — and says so when it doesn't know.

No monthly chatbot subscription. You pay the AI provider (Claude API) only for the messages your customers actually send.

Built for the video *Add an AI Chatbot to Your WooCommerce Store — No Monthly Fee* on **The AI Dev Desk** YouTube channel.

## Features

- Floating chat widget, no jQuery, no external scripts
- Learns from the pages you pick (Shipping, Returns, FAQ…) and your WooCommerce products (price, stock, sizes)
- Your API key stays on your server — the browser only talks to your own site
- Per-visitor hourly message limit to protect your API budget
- Prompt caching on the store information to lower the cost of repeat questions
- Usage counter (messages and tokens) in the settings page, so you can see your real cost

## Install

1. Download `ai-store-chat.zip` from the [Releases](../../releases) page.
2. WordPress admin → **Plugins → Add New → Upload Plugin** → choose the zip → **Activate**.
3. Go to **Settings → AI Store Chat**.
4. Paste a Claude API key from [console.anthropic.com](https://console.anthropic.com). **Set a monthly spend limit there first.**
5. Tick your policy pages, keep **Include products** on, and save.

The chat button now appears on your store for visitors.

## Requirements

- WordPress 6.0+
- PHP 7.4+
- WooCommerce (optional — without it the bot uses your pages only)

## Good to know

- The bot can't look up a specific order's status. It only knows the selected pages and products.
- Chats are not stored. Test it with your own top 10 customer questions and tighten any policy page that gives vague answers.
- If you use a page-caching plugin, exclude `/wp-json/aisc/v1/` from caching.
- Change the widget colors with the `--aisc-accent` and `--aisc-accent-text` CSS variables.

## Want it customized?

Order tracking, your brand voice, multi-language, or connecting it to your helpdesk — that's what I build for clients. Find me through **The AI Dev Desk** channel or at [usmantalib.com](https://usmantalib.com).

## License

GPL-2.0-or-later. See [LICENSE](LICENSE).
