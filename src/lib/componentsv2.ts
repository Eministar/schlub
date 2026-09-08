/**
 * Discord "Components V2" rendering for the /v3 endpoint.
 *
 * discord-api-types@0.37.x predates the V2 component set, so the payload types
 * live here. The renderer takes the finished v2 result of any event generator
 * and re-lays it out as a container, which keeps all events v3-capable without
 * touching a single generator.
 */
import type { APIActionRowComponent, APIEmbed, APIEmbedField, APIMessageActionRowComponent } from 'discord-api-types/v10';
import type { GeneratorResult } from '../events';
import { codeValue, splitLeadingEmoji } from './style';

export const MESSAGE_FLAG_IS_COMPONENTS_V2 = 1 << 15;

/** Discord rejects a container holding more than 4000 characters of text. */
const CONTAINER_TEXT_BUDGET = 4000;
const DESCRIPTION_LIMIT = 1024;
const MAX_TOP_LEVEL_COMPONENTS = 10;

export enum ComponentType {
	ActionRow = 1,
	Section = 9,
	TextDisplay = 10,
	Thumbnail = 11,
	Separator = 14,
	Container = 17,
}

export interface TextDisplayComponent {
	type: ComponentType.TextDisplay;
	content: string;
}

export interface ThumbnailComponent {
	type: ComponentType.Thumbnail;
	media: { url: string };
	description?: string;
}

export interface SectionComponent {
	type: ComponentType.Section;
	components: TextDisplayComponent[];
	accessory: ThumbnailComponent;
}

export interface SeparatorComponent {
	type: ComponentType.Separator;
	divider?: boolean;
	spacing?: 1 | 2;
}

export type ContainerChild =
	| TextDisplayComponent
	| SectionComponent
	| SeparatorComponent
	| APIActionRowComponent<APIMessageActionRowComponent>;

export interface ContainerComponent {
	type: ComponentType.Container;
	accent_color?: number;
	components: ContainerChild[];
}

export interface ComponentsV2Message {
	flags: number;
	components: ContainerComponent[];
}

/** Field name → leading emoji, so metadata reads as an icon row instead of a wall of labels. */
const FIELD_EMOJIS: Record<string, string> = {
	commits: '📝',
	commit: '📝',
	branch: '🌿',
	ref: '🌿',
	tag: '🏷️',
	type: '🔖',
	name: '🔖',
	status: '📊',
	state: '📊',
	conclusion: '📊',
	duration: '⏱️',
	'files changed': '📄',
	files: '📄',
	assets: '📦',
	labels: '🏷️',
	assignees: '👤',
	author: '👤',
	reviewer: '👀',
	reviewers: '👀',
	review: '📝',
	milestone: '🎯',
	environment: '🚀',
	workflow: '⚙️',
	category: '💬',
	comments: '💬',
	stars: '⭐',
	forks: '🍴',
	language: '💻',
	visibility: '🔒',
	task: '📋',
};

function text(content: string): TextDisplayComponent {
	return { type: ComponentType.TextDisplay, content };
}

function separator(): SeparatorComponent {
	return { type: ComponentType.Separator, divider: true, spacing: 1 };
}

function truncate(value: string, max: number): string {
	return value.length <= max ? value : `${value.slice(0, max - 1)}…`;
}

function buildHeading(embed: APIEmbed): string | undefined {
	if (!embed.title) return undefined;

	const { emoji, rest } = splitLeadingEmoji(embed.title);
	const title = embed.url ? `[${rest}](${embed.url})` : rest;

	return `## ${emoji ? `\`${emoji}\` ` : ''}${title}`;
}

function buildAuthorLine(embed: APIEmbed): string | undefined {
	const author = embed.author;
	if (!author?.name) return undefined;

	return `-# ${author.url ? `[${author.name}](${author.url})` : author.name}`;
}

function buildFieldText(field: APIEmbedField): string {
	const name = field.name.trim();
	const emoji = FIELD_EMOJIS[name.toLowerCase()];
	const label = emoji ? `\`${emoji}\` **${name}**` : `**${name}**`;

	return `${label} ${codeValue(name, field.value)}`;
}

/** Consecutive inline fields share a line; a non-inline field always gets its own. */
function buildFieldLines(fields: APIEmbedField[]): string[] {
	const lines: string[] = [];
	let inlineGroup: string[] = [];

	const flush = () => {
		if (inlineGroup.length === 0) return;
		lines.push(inlineGroup.join('  ·  '));
		inlineGroup = [];
	};

	for (const field of fields) {
		if (field.inline) {
			inlineGroup.push(buildFieldText(field));
			continue;
		}

		flush();
		lines.push(buildFieldText(field));
	}

	flush();

	return lines;
}

function buildFooterLine(embed: APIEmbed): string | undefined {
	const parts: string[] = [];
	if (embed.footer?.text) parts.push(embed.footer.text);
	if (embed.timestamp) {
		const unix = Math.floor(new Date(embed.timestamp).getTime() / 1000);
		if (Number.isFinite(unix)) parts.push(`<t:${unix}:R>`);
	}

	return parts.length > 0 ? `-# ${parts.join(' · ')}` : undefined;
}

function buildHeader(embed: APIEmbed, leadingContent?: string): ContainerChild[] {
	const lines = [leadingContent, buildHeading(embed), buildAuthorLine(embed)].filter((line): line is string => Boolean(line));
	if (lines.length === 0) return [];

	const thumbnailUrl = embed.author?.icon_url ?? embed.thumbnail?.url;
	if (!thumbnailUrl) return [text(lines.join('\n'))];

	return [
		{
			type: ComponentType.Section,
			components: [text(lines.join('\n'))],
			accessory: { type: ComponentType.Thumbnail, media: { url: thumbnailUrl } },
		},
	];
}

function buildContainer(
	embed: APIEmbed,
	rows: APIActionRowComponent<APIMessageActionRowComponent>[],
	leadingContent?: string
): ContainerComponent {
	const children: ContainerChild[] = [...buildHeader(embed, leadingContent)];

	if (embed.description) {
		children.push(text(truncate(embed.description, DESCRIPTION_LIMIT)));
	}

	const fieldLines = buildFieldLines(embed.fields ?? []);
	if (fieldLines.length > 0) {
		if (children.length > 0) children.push(separator());
		children.push(...fieldLines.map(text));
	}

	const footer = buildFooterLine(embed);
	if (footer) {
		if (children.length > 0) children.push(separator());
		children.push(text(footer));
	}

	children.push(...rows);

	return {
		type: ComponentType.Container,
		accent_color: embed.color,
		components: enforceTextBudget(children),
	};
}

/** Trims text components from the back until the container fits Discord's text budget. */
function enforceTextBudget(children: ContainerChild[]): ContainerChild[] {
	const sizeOf = (child: ContainerChild): number => {
		if (child.type === ComponentType.TextDisplay) return child.content.length;
		if (child.type === ComponentType.Section) return child.components.reduce((sum, t) => sum + t.content.length, 0);
		return 0;
	};

	let total = children.reduce((sum, child) => sum + sizeOf(child), 0);
	if (total <= CONTAINER_TEXT_BUDGET) return children;

	return children.map((child) => {
		if (total <= CONTAINER_TEXT_BUDGET || child.type !== ComponentType.TextDisplay) return child;

		const excess = total - CONTAINER_TEXT_BUDGET;
		const keep = Math.max(0, child.content.length - excess);
		total -= child.content.length - keep;

		return text(truncate(child.content, keep));
	});
}

export function toComponentsV2(result: GeneratorResult, _eventName: string): ComponentsV2Message | undefined {
	const rows = result.components ?? [];
	const embeds = result.embeds ?? [];

	if (embeds.length === 0) {
		if (!result.content) return undefined;

		return {
			flags: MESSAGE_FLAG_IS_COMPONENTS_V2,
			components: [{ type: ComponentType.Container, components: [text(result.content), ...rows] }],
		};
	}

	const containers = embeds
		.slice(0, MAX_TOP_LEVEL_COMPONENTS)
		// Buttons belong to the event as a whole, so they ride along with the first container.
		.map((embed, index) => buildContainer(embed, index === 0 ? rows : [], index === 0 ? result.content : undefined));

	return { flags: MESSAGE_FLAG_IS_COMPONENTS_V2, components: containers };
}
