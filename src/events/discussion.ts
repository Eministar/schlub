import { DiscussionEvent } from '@octokit/webhooks-types';
import { Env } from '..';
import { withUserAuthor, truncate, buildEnhancedV2Result, withEmoji } from '../lib/embed';
import { Colors } from '../constants';
import { GeneratorResult } from '.';

function generateTitle(event: DiscussionEvent): string {
	const action = event.action;
	const discussion = event.discussion;
	const title = discussion.title;

	switch (action) {
		case 'created':
			return `New discussion: ${title}`;
		case 'edited':
			return `Edited discussion: ${title}`;
		case 'answered':
			return `Answered discussion: ${title}`;
		case 'locked':
			return `Locked discussion: ${title}`;
		case 'unlocked':
			return `Unlocked discussion: ${title}`;
		default:
			return `Discussion ${action}: ${title}`;
	}
}

export default function generate(event: DiscussionEvent, _env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const discussion = event.discussion;
	const action = event.action;

	// Nur wichtige Actions verarbeiten
	if (!['created', 'answered'].includes(action)) {
		return undefined;
	}

	const title = generateTitle(event);
	const description = truncate(discussion.body, 400);
	const repoName = event.repository.full_name;

	const color = action === 'answered' ? Colors.OPEN : Colors.DISCUSSION;

	const baseEmbed = withUserAuthor({
		title,
		url: discussion.html_url,
		description,
		color,
	}, event.sender);

	if (apiVersion === 'v2') {
		const v2Title = withEmoji(title, 'DISCUSSION');

		const fields = [
			{ name: 'Category', value: discussion.category?.name ?? 'General', inline: true },
			{ name: 'Status', value: action === 'answered' ? '✅ Answered' : '🟢 Open', inline: true },
		];

		if (discussion.comments > 0) {
			fields.push({ name: 'Comments', value: `${discussion.comments}`, inline: true });
		}

		const embed = {
			...baseEmbed,
			title: v2Title,
			fields
		};

		const buttons = [
			{ label: 'View Discussion', url: discussion.html_url, emoji: '💬' },
		];

		if (discussion.answer_html_url) {
			buttons.push({ label: 'View Answer', url: discussion.answer_html_url, emoji: '✅' });
		}

		return buildEnhancedV2Result(embed, {
			footerText: `${repoName} • Discussions`,
			buttons,
		});
	}

	return { embeds: [baseEmbed] };
}
