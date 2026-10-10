/* AI Store Chat — floating widget. No dependencies. */
(function () {
	'use strict';

	if (!window.AISC || !window.fetch) {
		return;
	}

	var cfg = window.AISC;
	var history = []; // [{role, content}] kept in memory for this page only
	var busy = false;

	function el(tag, cls, text) {
		var node = document.createElement(tag);
		if (cls) node.className = cls;
		if (text) node.textContent = text; // textContent = no HTML injection
		return node;
	}

	// Launcher button
	var launcher = el('button', 'aisc-launcher');
	launcher.type = 'button';
	launcher.setAttribute('aria-label', 'Open chat');
	launcher.setAttribute('aria-expanded', 'false');
	launcher.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';

	// Panel
	var panel = el('div', 'aisc-panel');
	panel.setAttribute('role', 'dialog');
	panel.setAttribute('aria-label', cfg.title);
	panel.hidden = true;

	var header = el('div', 'aisc-header');
	header.appendChild(el('span', 'aisc-title', cfg.title));
	var close = el('button', 'aisc-close', '×');
	close.type = 'button';
	close.setAttribute('aria-label', 'Close chat');
	header.appendChild(close);

	var log = el('div', 'aisc-log');
	log.setAttribute('aria-live', 'polite');

	var form = el('form', 'aisc-form');
	var input = el('input', 'aisc-input');
	input.type = 'text';
	input.maxLength = cfg.maxChars;
	input.placeholder = 'Type your question…';
	input.setAttribute('aria-label', 'Your question');
	var send = el('button', 'aisc-send', 'Send');
	send.type = 'submit';
	form.appendChild(input);
	form.appendChild(send);

	panel.appendChild(header);
	panel.appendChild(log);
	panel.appendChild(form);
	document.body.appendChild(panel);
	document.body.appendChild(launcher);

	function addBubble(who, text) {
		var b = el('div', 'aisc-msg aisc-' + who, text);
		log.appendChild(b);
		log.scrollTop = log.scrollHeight;
		return b;
	}

	addBubble('bot', cfg.welcome);

	function toggle(open) {
		panel.hidden = !open;
		launcher.setAttribute('aria-expanded', open ? 'true' : 'false');
		if (open) input.focus();
	}

	launcher.addEventListener('click', function () { toggle(panel.hidden); });
	close.addEventListener('click', function () { toggle(false); launcher.focus(); });
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape' && !panel.hidden) { toggle(false); launcher.focus(); }
	});

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		var text = input.value.trim();
		if (!text || busy) return;

		busy = true;
		send.disabled = true;
		input.value = '';
		addBubble('user', text);
		var typing = addBubble('bot aisc-typing', 'Typing…');

		fetch(cfg.endpoint, {
			method: 'POST',
			credentials: 'same-origin',
			headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': cfg.nonce },
			body: JSON.stringify({ message: text, history: history })
		})
			.then(function (res) { return res.json(); })
			.then(function (data) {
				typing.remove();
				if (data && data.reply) {
					addBubble('bot', data.reply);
					history.push({ role: 'user', content: text }, { role: 'assistant', content: data.reply });
					history = history.slice(-8);
				} else {
					addBubble('bot aisc-error', (data && data.error) || 'Something went wrong. Please try again.');
				}
			})
			.catch(function () {
				typing.remove();
				addBubble('bot aisc-error', 'Connection problem. Please try again.');
			})
			.then(function () {
				busy = false;
				send.disabled = false;
				input.focus();
			});
	});
})();
