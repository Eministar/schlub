import type { APIEmbed } from 'discord-api-types/v10';
import type { GeneratorResult } from '../events';

const COLOR_PATTERN = /^#?[0-9a-fA-F]{6}$/;
const STYLE_PARAM_PATTERN = /^style_([a-z_]+)_(emoji|color)$/;

const CODE_WRAP_FIELD_NAMES = new Set([
	'status',
	'state',
	'type',
	'branch',
	'tag',
	'ref',
	'workflow',
	'review',
	'task',
]);

interface EventStyle {
	emoji?: string;
	color?: number;
}

function isMarkdownLink(value: string): boolean {
	return value.includes('](');
}

function stripLeadingEmoji(text: string): string {
	return text.replace(/^[\p{Extended_Pictographic}\p{Emoji_Presentation}\uFE0F\u200D\s]+/u, '').trimStart();
}

function normalizeEmoji(value: string | null): string | undefined {
	if (!value) return undefined;
	const emoji = value.trim();
	if (!emoji) return undefined;
	return emoji.slice(0, 16);
}

function parseColor(value: string | null): number | undefined {
	if (!value) return undefined;
	const trimmed = value.trim();
	if (!COLOR_PATTERN.test(trimmed)) return undefined;
	return Number.parseInt(trimmed.replace('#', ''), 16);
}

function wrapInCode(value: string): string {
	if (!value || value.includes('`')) return value;
	return `\`${value}\``;
}

function withSmartFieldFormatting(embed: APIEmbed): APIEmbed {
	if (!embed.fields || embed.fields.length === 0) return embed;

	const fields = embed.fields.map((field) => {
		const normalizedName = field.name.trim().toLowerCase();
		if (!CODE_WRAP_FIELD_NAMES.has(normalizedName)) return field;
		if (isMarkdownLink(field.value)) return field;

		return {
			...field,
			value: wrapInCode(field.value),
		};
	});

	return {
		...embed,
		fields,
	};
}

function withSmartCommitFormatting(eventName: string, embed: APIEmbed): APIEmbed {
	if (eventName !== 'push' || !embed.description) return embed;

	const lines = embed.description.split('\n');
	const formatted = lines.map((line) => line.replace(/(\[[^\]]+\]\([^\)]+\)\s)(.+?)(\s—\s.+)$/, (_match, start, message, end) => `${start}\`${message}\`${end}`));

	return {
		...embed,
		description: formatted.join('\n'),
	};
}

export function readV2Styles(searchParams: URLSearchParams): Map<string, EventStyle> {
	const map = new Map<string, EventStyle>();

	for (const [key, value] of searchParams.entries()) {
		const match = STYLE_PARAM_PATTERN.exec(key);
		if (!match) continue;

		const eventKey = match[1];
		const attribute = match[2];
		const current = map.get(eventKey) ?? {};

		if (attribute === 'emoji') {
			current.emoji = normalizeEmoji(value);
		}

		if (attribute === 'color') {
			current.color = parseColor(value);
		}

		map.set(eventKey, current);
	}

	return map;
}

export function applyV2Styles(result: GeneratorResult, eventName: string, styles: Map<string, EventStyle>, apiVersion: string): GeneratorResult {
	if (apiVersion !== 'v2' || !result.embeds || result.embeds.length === 0) return result;

	const eventStyle = styles.get(eventName);
	const globalStyle = styles.get('all');
	const color = eventStyle?.color ?? globalStyle?.color;
	const emoji = eventStyle?.emoji ?? globalStyle?.emoji;

	const embeds = result.embeds.map((embed) => {
		let updated = withSmartCommitFormatting(eventName, withSmartFieldFormatting(embed));

		if (typeof color === 'number') {
			updated = { ...updated, color };
		}

		if (emoji && updated.title) {
			updated = {
				...updated,
				title: `${emoji} ${stripLeadingEmoji(updated.title)}`,
			};
		}

		return updated;
	});

	return {
		...result,
		embeds,
	};
}
