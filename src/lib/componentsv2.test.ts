import { describe, expect, it } from 'vitest';
import { ComponentType, MESSAGE_FLAG_IS_COMPONENTS_V2, toComponentsV2 } from './componentsv2';
import type { ContainerComponent, SectionComponent, TextDisplayComponent } from './componentsv2';
import type { GeneratorResult } from '../events';
import push from '../events/push';
import release from '../events/release';

const baseResult: GeneratorResult = {
	embeds: [
		{
			title: '📤 Pushed 3 commits to eministar/schlub',
			url: 'https://github.com/eministar/schlub/compare/a...b',
			description: '[`abc1234`](https://github.com/x) fix things — someone',
			color: 0x238636,
			author: { name: 'Eministar', url: 'https://github.com/Eministar', icon_url: 'https://avatars.example/1.png' },
			footer: { text: 'eministar/schlub • main' },
			timestamp: '2024-01-01T00:00:00.000Z',
			fields: [
				{ name: 'Commits', value: '3', inline: true },
				{ name: 'Branch', value: '`main`', inline: true },
				{ name: 'Notes', value: 'some longer note', inline: false },
			],
		},
	],
	components: [
		{
			type: 1,
			components: [{ type: 2, style: 5, label: 'Compare', url: 'https://github.com/eministar/schlub/compare/a...b' }],
		},
	],
};

function container(result: ReturnType<typeof toComponentsV2>): ContainerComponent {
	const first = result!.components[0];
	expect(first.type).toBe(ComponentType.Container);
	return first as ContainerComponent;
}

function texts(c: ContainerComponent): string[] {
	return c.components.flatMap((child) => {
		if (child.type === ComponentType.TextDisplay) return [(child as TextDisplayComponent).content];
		if (child.type === ComponentType.Section) return (child as SectionComponent).components.map((t) => t.content);
		return [];
	});
}

describe('toComponentsV2', () => {
	it('returns the components v2 flag and no embeds or content', () => {
		const result = toComponentsV2(baseResult, 'push')!;

		expect(result.flags).toBe(MESSAGE_FLAG_IS_COMPONENTS_V2);
		expect(result).not.toHaveProperty('embeds');
		expect(result).not.toHaveProperty('content');
	});

	it('wraps the whole message in a container carrying the embed color as accent', () => {
		expect(container(toComponentsV2(baseResult, 'push')).accent_color).toBe(0x238636);
	});

	it('puts the title in a section with the author avatar as thumbnail', () => {
		const section = container(toComponentsV2(baseResult, 'push')).components[0] as SectionComponent;

		expect(section.type).toBe(ComponentType.Section);
		expect(section.accessory).toEqual({ type: ComponentType.Thumbnail, media: { url: 'https://avatars.example/1.png' } });
	});

	it('backticks the leading title emoji and keeps the title linked', () => {
		const [heading] = texts(container(toComponentsV2(baseResult, 'push')));

		expect(heading).toContain('`📤`');
		expect(heading).toContain('[Pushed 3 commits to eministar/schlub](https://github.com/eministar/schlub/compare/a...b)');
		expect(heading.startsWith('## ')).toBe(true);
	});

	it('credits the author on a subtext line', () => {
		expect(texts(container(toComponentsV2(baseResult, 'push'))).join('\n')).toContain('-# [Eministar](https://github.com/Eministar)');
	});

	it('joins consecutive inline fields into one line and backticks their values', () => {
		const line = texts(container(toComponentsV2(baseResult, 'push'))).find((t) => t.includes('Commits'))!;

		expect(line).toBe('`📝` **Commits** `3`  ·  `🌿` **Branch** `main`');
	});

	it('gives non-inline fields their own line', () => {
		expect(texts(container(toComponentsV2(baseResult, 'push')))).toContainEqual('**Notes** some longer note');
	});

	it('renders the footer as subtext with a relative timestamp', () => {
		const footer = texts(container(toComponentsV2(baseResult, 'push'))).at(-1)!;

		expect(footer).toBe('-# eministar/schlub • main · <t:1704067200:R>');
	});

	it('separates the header, body and metadata blocks', () => {
		const kinds = container(toComponentsV2(baseResult, 'push')).components.map((c) => c.type);

		expect(kinds).toContain(ComponentType.Separator);
	});

	it('keeps link buttons as an action row inside the container', () => {
		const row = container(toComponentsV2(baseResult, 'push')).components.at(-1)!;

		expect(row).toEqual(baseResult.components![0]);
	});

	it('renders one container per embed', () => {
		const result = toComponentsV2({ embeds: [baseResult.embeds![0], { title: 'Second' }] }, 'push')!;

		expect(result.components.filter((c) => c.type === ComponentType.Container)).toHaveLength(2);
	});

	it('falls back to a plain text display when there is no thumbnail', () => {
		const result = toComponentsV2({ embeds: [{ title: 'No author', color: 1 }] }, 'ping')!;

		expect(container(result).components[0].type).toBe(ComponentType.TextDisplay);
	});

	it('promotes plain content when an event returns no embed', () => {
		const result = toComponentsV2({ content: 'hello' }, 'ping')!;

		expect(texts(container(result))).toEqual(['hello']);
	});

	it('returns undefined for an empty result', () => {
		expect(toComponentsV2({}, 'ping')).toBeUndefined();
	});

	it('stays within the 4000 character container budget', () => {
		const result = toComponentsV2({ embeds: [{ title: 'Big', description: 'x'.repeat(9000) }] }, 'push')!;

		expect(JSON.stringify(texts(container(result))).length).toBeLessThan(4000);
	});
});

const repository = {
	full_name: 'eministar/schlub',
	html_url: 'https://github.com/eministar/schlub',
	name: 'schlub',
} as any;

const sender = { login: 'Eministar', avatar_url: 'https://avatars.example/1.png', html_url: 'https://github.com/Eministar' } as any;

describe('event generators rendered as components v2', () => {
	it('renders a push the way the /v3 endpoint would', async () => {
		const event = {
			ref: 'refs/heads/main',
			forced: false,
			compare: 'https://github.com/eministar/schlub/compare/a...b',
			repository,
			sender,
			commits: [
				{
					id: 'abc1234def5678',
					message: 'fix the thing',
					added: ['a.ts'],
					modified: ['b.ts'],
					removed: [],
					author: { username: 'Eministar', name: 'Eministar' },
				},
			],
		} as any;

		const result = toComponentsV2((await push(event, {} as any, 'hook', 'v2'))!, 'push')!;
		const rendered = texts(container(result)).join('\n');

		expect(result.flags).toBe(MESSAGE_FLAG_IS_COMPONENTS_V2);
		expect(rendered).toContain('`📤`');
		expect(rendered).toContain('`🌿` **Branch** `main`');
		expect(rendered).toContain('`📄` **Files Changed** `+1 ~1 -0`');
		expect(container(result).components.at(-1)!.type).toBe(ComponentType.ActionRow);
	});

	it('renders a release the way the /v3 endpoint would', async () => {
		const event = {
			action: 'published',
			repository,
			sender,
			release: {
				tag_name: 'v1.2.0',
				name: 'v1.2.0',
				body: 'Release notes',
				html_url: 'https://github.com/eministar/schlub/releases/tag/v1.2.0',
				assets: [{ size: 2048 }],
				prerelease: false,
				draft: false,
			},
		} as any;

		const rendered = texts(container(toComponentsV2((await release(event, {} as any, 'hook', 'v2'))!, 'release')!)).join('\n');

		expect(rendered).toContain('`🎉`');
		expect(rendered).toContain('`🏷️` **Tag** `v1.2.0`');
		expect(rendered).toContain('Release notes');
	});
});
