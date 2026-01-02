import { ReleaseEvent } from '@octokit/webhooks-types';
import { Env } from '..';
import { withUserAuthor, truncate, buildV2Result, withEmoji, formatFileSize, buildEnhancedV2Result } from '../lib/embed';
import { Colors, Emojis } from '../constants';
import { GeneratorResult } from '.';

function generateTitle(event: ReleaseEvent): string {
	const action = event.action;
	const release = event.release;
	const tagName = release.tag_name;
	const repoName = event.repository.full_name;

	switch (action) {
		case 'published':
			return `Released ${tagName} on ${repoName}`;
		case 'created':
			return `Created release ${tagName} on ${repoName}`;
		case 'edited':
			return `Edited release ${tagName} on ${repoName}`;
		case 'deleted':
			return `Deleted release ${tagName} on ${repoName}`;
		case 'prereleased':
			return `Pre-released ${tagName} on ${repoName}`;
		case 'released':
			return `Released ${tagName} on ${repoName}`;
		default:
			return `Release ${action} ${tagName} on ${repoName}`;
	}
}

function getUrl(event: ReleaseEvent): string {
	return event.release.html_url;
}

function getReleaseTypeLabel(event: ReleaseEvent): string {
	const release = event.release;
	if (release.prerelease) return '🔶 Pre-release';
	if (release.draft) return '📝 Draft';
	return '🏷️ Stable';
}

function getTotalAssetSize(event: ReleaseEvent): number {
	return event.release.assets.reduce((acc, asset) => acc + asset.size, 0);
}

export default function generate(event: ReleaseEvent, _env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const release = event.release;
	const action = event.action;

	// Nur wichtige Actions verarbeiten
	if (!['published', 'created', 'released', 'prereleased'].includes(action)) {
		return undefined;
	}

	const title = generateTitle(event);
	const description = truncate(release.body, 500);

	const baseEmbed = withUserAuthor({
		title,
		url: getUrl(event),
		description,
		color: Colors.RELEASE,
	}, event.sender);

	if (apiVersion === 'v2') {
		const assets = release.assets;
		const fields = [
			{ name: 'Tag', value: `\`${release.tag_name}\``, inline: true },
			{ name: 'Type', value: getReleaseTypeLabel(event), inline: true },
		];

		if (release.name && release.name !== release.tag_name) {
			fields.push({ name: 'Name', value: release.name, inline: true });
		}

		if (assets.length > 0) {
			fields.push({ name: 'Assets', value: `${assets.length} file(s) (${formatFileSize(getTotalAssetSize(event))})`, inline: true });
		}

		const v2Title = withEmoji(title, 'RELEASE');
		const embed = {
			...baseEmbed,
			title: v2Title,
			fields
		};

		const buttons = [
			{ label: 'View Release', url: getUrl(event), emoji: '📦' },
			{ label: 'Download', url: `${event.repository.html_url}/releases/download/${release.tag_name}`, emoji: '⬇️' },
		];

		return buildEnhancedV2Result(embed, {
			footerText: `${event.repository.full_name} • ${getReleaseTypeLabel(event)}`,
			buttons,
		});
	}

	return { embeds: [baseEmbed] };
}

