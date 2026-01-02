import { User } from '@octokit/webhooks-types';
import type { APIEmbed, APIActionRowComponent, APIButtonComponent } from 'discord-api-types/v10';
import { Emojis } from '../constants';

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

// Relative Zeitformatierung für schönere Embeds
export function formatRelativeTime(date: Date | string): string {
	const now = new Date();
	const then = typeof date === 'string' ? new Date(date) : date;
	const diff = now.getTime() - then.getTime();

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
	if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
	if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
	return 'just now';
}

// Formatiert Dateigröße
export function formatFileSize(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

// Formatiert Label-Liste (z.B. für Issues)
export function formatLabels(labels: Array<{ name: string; color?: string }>): string {
	if (!labels || labels.length === 0) return 'None';
	return labels.map(l => `\`${l.name}\``).join(', ');
}

// Generiert eine kompakte Statistik-Zeile
export function formatStats(stats: Record<string, number | string>): string {
	return Object.entries(stats)
		.filter(([_, v]) => v !== undefined && v !== null)
		.map(([k, v]) => `**${k}:** ${v}`)
		.join(' • ');
}

// Emoji-Präfix für Titel (nur v2)
export function withEmoji(title: string, emoji: keyof typeof Emojis): string {
	return `${Emojis[emoji]} ${title}`;
}

// Generiert mehrere Button-Links
export function buildButtonRow(...buttons: Array<{ label: string; url: string; emoji?: string }>): APIActionRowComponent<APIButtonComponent> {
	return {
		type: 1,
		components: buttons.slice(0, 5).map(btn => ({
			type: 2 as const,
			style: 5 as const,
			label: btn.label,
			url: btn.url,
			emoji: btn.emoji ? { name: btn.emoji } : undefined,
		})),
	};
}

export function buildV2Result(embed: APIEmbed, url?: string, extraButtons?: Array<{ label: string; url: string; emoji?: string }>) {
	// ensure timestamp and footer
	const now = new Date().toISOString();
	const e: APIEmbed = {
		...embed,
		footer: embed.footer ?? { text: 'schlub v2' },
		timestamp: embed.timestamp ?? now,
	};

	const components: APIActionRowComponent<APIButtonComponent>[] = [];

	const allButtons: Array<{ label: string; url: string; emoji?: string }> = [];
	if (url) {
		allButtons.push({ label: 'Open on GitHub', url, emoji: '🔗' });
	}
	if (extraButtons) {
		allButtons.push(...extraButtons);
	}

	if (allButtons.length > 0) {
		components.push(buildButtonRow(...allButtons));
	}

	return { embeds: [e], components: components.length ? components : undefined };
}

// Typ für erweiterte v2 Embed-Optionen
export interface V2EmbedOptions {
	showTimestamp?: boolean;
	footerText?: string;
	buttons?: Array<{ label: string; url: string; emoji?: string }>;
	thumbnailUrl?: string;
	imageUrl?: string;
}

// Erweiterte buildV2Result mit mehr Optionen
export function buildEnhancedV2Result(embed: APIEmbed, options: V2EmbedOptions = {}) {
	const now = new Date().toISOString();
	const e: APIEmbed = {
		...embed,
		footer: options.footerText ? { text: options.footerText } : (embed.footer ?? { text: 'schlub v2' }),
		timestamp: options.showTimestamp !== false ? (embed.timestamp ?? now) : undefined,
		thumbnail: options.thumbnailUrl ? { url: options.thumbnailUrl } : embed.thumbnail,
		image: options.imageUrl ? { url: options.imageUrl } : embed.image,
	};

	const components: APIActionRowComponent<APIButtonComponent>[] = [];

	if (options.buttons && options.buttons.length > 0) {
		components.push(buildButtonRow(...options.buttons));
	}

	return { embeds: [e], components: components.length ? components : undefined };
}
