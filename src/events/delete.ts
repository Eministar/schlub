import { DeleteEvent } from '@octokit/webhooks-types';
import { Env } from '..';
import { withUserAuthor, buildEnhancedV2Result } from '../lib/embed';
import { Colors, Emojis } from '../constants';
import { GeneratorResult } from '.';

function getRefTypeEmoji(refType: string): string {
	switch (refType) {
		case 'branch':
			return Emojis.BRANCH;
		case 'tag':
			return Emojis.TAG;
		default:
			return '📌';
	}
}

function generateTitle(event: DeleteEvent): string {
	const refType = event.ref_type;
	const ref = event.ref;
	const repoName = event.repository.full_name;

	return `Deleted ${refType} \`${ref}\` from ${repoName}`;
}

export default function generate(event: DeleteEvent, _env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const refType = event.ref_type;
	const ref = event.ref;
	const repoName = event.repository.full_name;

	const title = generateTitle(event);
	const emoji = getRefTypeEmoji(refType);

	const baseEmbed = withUserAuthor({
		title,
		url: event.repository.html_url,
		color: Colors.CLOSED, // Rot für Deletion
	}, event.sender);

	if (apiVersion === 'v2') {
		const v2Title = `🗑️ ${title}`;

		const fields: Array<{ name: string; value: string; inline: boolean }> = [
			{ name: 'Type', value: `${emoji} ${refType.charAt(0).toUpperCase() + refType.slice(1)}`, inline: true },
			{ name: 'Name', value: `\`${ref}\``, inline: true },
			{ name: 'Status', value: '❌ Deleted', inline: true },
		];

		const embed = {
			...baseEmbed,
			title: v2Title,
			fields,
		};

		const buttons: Array<{ label: string; url: string; emoji: string }> = [
			{ label: 'View Repository', url: event.repository.html_url, emoji: '📁' },
			{ label: 'All Branches', url: `${event.repository.html_url}/branches`, emoji: '🌿' },
		];

		if (refType === 'tag') {
			buttons.push({ label: 'All Tags', url: `${event.repository.html_url}/tags`, emoji: '🏷️' });
		}

		return buildEnhancedV2Result(embed, {
			footerText: `${repoName} • Deleted ${refType}`,
			buttons,
		});
	}

	return { embeds: [baseEmbed] };
}

