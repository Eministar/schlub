import type { WebhookEventMap, WebhookEventName } from '@octokit/webhooks-types';
import events, { EmbedGenerator } from './events';
import { RESTPostAPIWebhookWithTokenJSONBody } from 'discord-api-types/v10';
import { DISCORD_WEBHOOK_URL } from './lib/discord';

export interface Env {
	STARS: KVNamespace;
	WATCHES: KVNamespace;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const requestUrl = new URL(request.url);

		let webhook: { id: string; token: string; threadId?: string } | undefined;
		let apiVersion = 'v1';

		// Get the webhook ID and token from the URL
		const path = requestUrl.pathname.split('/').filter(Boolean);

		// support optional version prefix: /v1/:id/:token or /v2/:id/:token
		if (path.length === 3 && (path[0] === 'v1' || path[0] === 'v2')) {
			apiVersion = path[0];
			webhook = { id: path[1], token: path[2] };
		} else if (path.length === 2) {
			// legacy: /:id/:token
			webhook = { id: path[0], token: path[1] };
		} else {
			return new Response('Invalid path: expected /v{n}/webhookId/webhookToken or /webhookId/webhookToken', { status: 400 });
		}

		if (requestUrl.searchParams.has('thread_id')) webhook.threadId = requestUrl.searchParams.get('thread_id')!;

		const hookId = request.headers.get('X-GitHub-Hook-ID');
		if (!hookId) return new Response('Missing X-GitHub-Hook-ID', { status: 400 });

		// Get the event name and payload
		const eventName = request.headers.get('X-GitHub-Event') as WebhookEventName;
		if (!eventName) return new Response('Missing event name', { status: 400 });
		let eventPayload: WebhookEventMap[WebhookEventName];
		try {
			eventPayload = await request.json();
		} catch (e) {
			return new Response('Invalid Payload', { status: 400 });
		}

		// Get the event embed generator
		const generate = events[eventName] as EmbedGenerator<WebhookEventMap[WebhookEventName]> | undefined;
		if (!generate) return new Response('Event not implemented', { status: 200 });

		// Generate the embed (pass apiVersion)
		const result = await generate(eventPayload, env, hookId, apiVersion);

		if (!result) return new Response('No result generated', { status: 200 });

		const body: RESTPostAPIWebhookWithTokenJSONBody = {
			content: result?.content,
			embeds: result?.embeds,
			components: result?.components,
		};

		const webhookUrl = DISCORD_WEBHOOK_URL(webhook.id, webhook.token, webhook.threadId, true);

		const res = await fetch(webhookUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		// For now, reply with the embed
		return new Response(res.body, { status: res.status });
	},
};
