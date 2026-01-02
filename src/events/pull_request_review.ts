import { PullRequestReviewEvent } from '@octokit/webhooks-types';
import { Env } from '..';
import { withUserAuthor, truncate, buildEnhancedV2Result, withEmoji } from '../lib/embed';
import { Colors, Emojis } from '../constants';
import { GeneratorResult } from '.';

function getReviewColor(state: string): number {
	switch (state) {
		case 'approved':
			return Colors.REVIEW_APPROVED;
		case 'changes_requested':
			return Colors.REVIEW_CHANGES_REQUESTED;
		case 'commented':
		case 'dismissed':
		default:
			return Colors.REVIEW_COMMENTED;
	}
}

function getReviewEmoji(state: string): string {
	switch (state) {
		case 'approved':
			return '✅';
		case 'changes_requested':
			return '🔄';
		case 'commented':
			return '💬';
		case 'dismissed':
			return '🚫';
		default:
			return '📝';
	}
}

function getStateLabel(state: string): string {
	switch (state) {
		case 'approved':
			return 'Approved';
		case 'changes_requested':
			return 'Changes Requested';
		case 'commented':
			return 'Commented';
		case 'dismissed':
			return 'Dismissed';
		default:
			return state;
	}
}

export default function generate(event: PullRequestReviewEvent, _env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const review = event.review;
	const pr = event.pull_request;
	const action = event.action;

	// Nur submitted reviews zeigen
	if (action !== 'submitted') {
		return undefined;
	}

	// Leere comments ohne text ignorieren
	if (review.state === 'commented' && !review.body) {
		return undefined;
	}

	const state = review.state;
	const title = `${getReviewEmoji(state)} Review ${getStateLabel(state)} on PR #${pr.number}`;
	const repoName = event.repository.full_name;

	const baseEmbed = withUserAuthor({
		title,
		url: review.html_url,
		description: truncate(review.body, 400),
		color: getReviewColor(state),
	}, event.sender);

	if (apiVersion === 'v2') {
		const fields = [
			{ name: 'Pull Request', value: `[#${pr.number}](${pr.html_url}) ${truncate(pr.title, 50)}`, inline: false },
			{ name: 'Review', value: getStateLabel(state), inline: true },
			{ name: 'Reviewer', value: `[@${event.sender.login}](${event.sender.html_url})`, inline: true },
		];

		// Base/Head branch info
		fields.push({
			name: 'Branch',
			value: `\`${pr.head.ref}\` → \`${pr.base.ref}\``,
			inline: true,
		});

		const embed = {
			...baseEmbed,
			fields
		};

		const buttons = [
			{ label: 'View Review', url: review.html_url, emoji: '📝' },
			{ label: 'View PR', url: pr.html_url, emoji: '🔀' },
		];

		return buildEnhancedV2Result(embed, {
			footerText: `${repoName} • PR #${pr.number}`,
			buttons,
		});
	}

	return { embeds: [baseEmbed] };
}

