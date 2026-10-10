=== AI Store Chat ===
Contributors: theaidevdesk
Requires at least: 6.0
Requires PHP: 7.4
License: GPLv2 or later

A lightweight AI chat widget for WooCommerce. It answers customer questions only from the pages and products you choose, using the Claude API. No monthly chatbot subscription: you pay the API provider per message.

== Installation ==

1. Plugins > Add New > Upload Plugin, choose ai-store-chat.zip, activate.
2. Settings > AI Store Chat.
3. Paste your Claude API key (console.anthropic.com). Set a monthly spend limit in the console first.
4. Tick your Shipping, Returns and FAQ pages. Keep "Include products" on.
5. Save. The chat button appears on the front end for visitors.

== How it works ==

* The browser talks only to your own site (REST route /wp-json/aisc/v1/message). Your API key never leaves the server.
* The bot's knowledge (selected pages + products) is cached for 1 hour and rebuilt whenever you save a page or product.
* Each visitor (by IP) is limited to the number of messages per hour you set.
* The store information is sent with prompt caching, which lowers the cost of repeat questions.
* Settings > AI Store Chat shows message and token counts so you can work out your real cost.

== Notes ==

* Page caching plugins: exclude the REST route from caching, and if your pages are cached longer than 12 hours, the chat nonce can expire. Exclude pages or shorten the cache.
* The bot cannot look up a specific order. It only knows what is in the selected pages and product list.
* Chats are not saved. Ask it your top 10 customer questions yourself each week at first, and tighten your policy pages where answers are vague.
