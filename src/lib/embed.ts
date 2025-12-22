import { User } from '@octokit/webhooks-types';
import type { APIEmbed, APIActionRowComponent, APIButtonComponent } from 'discord-api-types/v10';

const BASE_EMBED: APIEmbed = {};

export function withBaseEmbed(embed: APIEmbed): APIEmbed {
	return {
		...BASE_EMBED,
		...embed,
	};
}
export function withUserAuthor(embed: APIEmbed, user: User): APIEmbed {
	return {
		...embed,
		author: {
			name: user.login,
			icon_url: user.avatar_url,
			url: user.html_url,
		},
	};
}

export function truncate(text: string | null | undefined, max = 200): string {
	if (!text) return '';
	if (text.length <= max) return text;
	return text.slice(0, max - 3) + '...';
}

export function colorFromState(state: string): number | undefined {
	switch (state) {
		case 'merged':
		case 'success':
			return 0x57f287; // green
		case 'opened':
		case 'in_progress':
			return 0x5865f2; // blurple
		case 'closed':
		case 'failure':
		case 'cancelled':
			return 0xed4245; // red
		default:
			return undefined;
	}
}

export function buildV2Result(embed: APIEmbed, url?: string) {
	// ensure timestamp and footer
	const now = new Date().toISOString();
	const e: APIEmbed = {
		...embed,
		footer: embed.footer ?? { text: 'schlub v2' },
		timestamp: embed.timestamp ?? now,
	};

	const components: APIActionRowComponent<APIButtonComponent>[] = [];
	if (url) {
		components.push({
			type: 1,
			components: [
				{ type: 2, style: 5, label: 'Open on GitHub', url },
			],
		});
	}

	return { embeds: [e], components: components.length ? components : undefined };
}
