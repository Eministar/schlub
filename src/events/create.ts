import { CreateEvent } from '@octokit/webhooks-types';
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

function getRefTypeColor(refType: string): number {
	switch (refType) {
		case 'branch':
			return Colors.OPEN;
		case 'tag':
			return Colors.RELEASE;
		default:
			return Colors.DISCUSSION;
	}
}

function generateTitle(event: CreateEvent): string {
	const refType = event.ref_type;
	const ref = event.ref;
	const repoName = event.repository.full_name;

	return `Created ${refType} \`${ref}\` on ${repoName}`;
}

export default function generate(event: CreateEvent, _env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const refType = event.ref_type;
	const ref = event.ref;
	const repoName = event.repository.full_name;
	const description = event.description || '';

	const title = generateTitle(event);
	const color = getRefTypeColor(refType);
	const emoji = getRefTypeEmoji(refType);

	const baseEmbed = withUserAuthor({
		title,
		url: event.repository.html_url,
		description: description ? description : undefined,
		color,
	}, event.sender);

	if (apiVersion === 'v2') {
		const v2Title = `${emoji} ${title}`;

		const fields: Array<{ name: string; value: string; inline: boolean }> = [
			{ name: 'Type', value: `${emoji} ${refType.charAt(0).toUpperCase() + refType.slice(1)}`, inline: true },
			{ name: 'Name', value: `\`${ref}\``, inline: true },
		];

		// Master-Branch anzeigen
		if (event.master_branch) {
			fields.push({ name: 'Default Branch', value: `\`${event.master_branch}\``, inline: true });
		}

		// Bei Tags: Zeige dass es möglicherweise ein Release werden könnte
		if (refType === 'tag') {
			fields.push({
				name: 'Hint',
				value: '🎉 This tag might become a release!',
				inline: false
			});
		}

		const embed = {
			...baseEmbed,
			title: v2Title,
			fields,
		};

		// URLs für Branch/Tag
		const refUrl = refType === 'branch'
			? `${event.repository.html_url}/tree/${ref}`
			: `${event.repository.html_url}/releases/tag/${ref}`;

		const buttons: Array<{ label: string; url: string; emoji: string }> = [
			{ label: `View ${refType.charAt(0).toUpperCase() + refType.slice(1)}`, url: refUrl, emoji: emoji },
			{ label: 'View Repository', url: event.repository.html_url, emoji: '📁' },
		];

		// Bei Branches: Link zum Erstellen eines PRs
		if (refType === 'branch' && event.master_branch && ref !== event.master_branch) {
			buttons.push({
				label: 'Create PR',
				url: `${event.repository.html_url}/compare/${event.master_branch}...${ref}`,
				emoji: '🔀'
			});
		}

		return buildEnhancedV2Result(embed, {
			footerText: `${repoName} • New ${refType}`,
			buttons,
		});
	}

	return { embeds: [baseEmbed] };
}

