=== AI Store Chat ===
Stable tag: 1.1.0
Contributors: theaidevdesk
Requires at least: 6.0
Requires PHP: 7.4
License: GPLv2 or later

A lightweight AI chat widget for WooCommerce. It answers customer questions only from the pages and products you choose, using the Claude or Gemini API. No monthly chatbot subscription: you pay the API provider per message.

== Installation ==

1. Plugins > Add New > Upload Plugin, choose ai-store-chat.zip, activate.
2. Settings > AI Store Chat.
3. Choose Claude or Gemini and paste that provider's API key (platform.claude.com or aistudio.google.com/apikey).
4. Tick your Shipping, Returns and FAQ pages. Keep "Include products" on.
5. Save. The chat button appears on the front end for visitors.

== How it works ==

* The browser talks only to your own site (REST route /wp-json/aisc/v1/message). Your API key never leaves the server.
* The bot's knowledge (selected pages + products) is cached for 1 hour and rebuilt whenever you save a page or product.
* Each visitor (by IP) is limited to the number of messages per hour you set.
* With Claude, the store information is sent with prompt caching, which lowers the cost of repeat questions.
* Settings > AI Store Chat shows message and token counts so you can work out your real cost.

== Notes ==

* Gemini free tier is for testing: Google may use free-tier data to improve its products. Enable billing on your Gemini key before using it with real customers. EU/UK/Swiss stores must use a paid tier.
* Page caching plugins: exclude the REST route from caching, and if your pages are cached longer than 12 hours, the chat nonce can expire. Exclude pages or shorten the cache.
* The bot cannot look up a specific order. It only knows what is in the selected pages and product list.
* Chats are not saved. Ask it your top 10 customer questions yourself each week at first, and tighten your policy pages where answers are vague.

== Changelog ==

= 1.1.0 =
* New: choose Gemini (Google) as the AI provider, including its free tier for testing.

= 1.0.0 =
* First release.
