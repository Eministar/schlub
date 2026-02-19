import type { WebhookEventMap, WebhookEventName } from '@octokit/webhooks-types';
import events, { EmbedGenerator } from './events';
import { RESTPostAPIWebhookWithTokenJSONBody } from 'discord-api-types/v10';
import { DISCORD_WEBHOOK_URL } from './lib/discord';
import { getLandingPageHTML } from './lib/landing';
import { applyV2Styles, readV2Styles } from './lib/style';

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
		if (path.length === 1 && path[0] === 'robots.txt') {
			return new Response(
				`User-agent: *
Allow: /

Sitemap: ${requestUrl.origin}/sitemap.xml`,
				{
					status: 200,
					headers: {
						'Content-Type': 'text/plain; charset=utf-8',
						'Cache-Control': 'public, max-age=3600',
					},
				}
			);
		}

		if (path.length === 1 && path[0] === 'sitemap.xml') {
			const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>${requestUrl.origin}/</loc>
	</url>
</urlset>`;
			return new Response(sitemap, {
				status: 200,
				headers: {
					'Content-Type': 'application/xml; charset=utf-8',
					'Cache-Control': 'public, max-age=3600',
				},
			});
		}

		// Show landing page for root path or common info paths
		if (path.length === 0 || (path.length === 1 && ['info', 'help', 'about'].includes(path[0]))) {
			return new Response(getLandingPageHTML(), {
				status: 200,
				headers: {
					'Content-Type': 'text/html; charset=utf-8',
					'Cache-Control': 'no-store',
				},
			});
		}

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
		const styledResult = applyV2Styles(result, eventName, readV2Styles(requestUrl.searchParams), apiVersion);

		const body: RESTPostAPIWebhookWithTokenJSONBody = {
			content: styledResult?.content,
			embeds: styledResult?.embeds,
			components: styledResult?.components,
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
