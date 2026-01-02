import { PullRequestEvent } from '@octokit/webhooks-types';
import { Env } from '..';
import { withUserAuthor, truncate, colorFromState, buildEnhancedV2Result, withEmoji, formatLabels } from '../lib/embed';
import { GeneratorResult } from '.';
import { Colors, Emojis } from '../constants';

function generateTitle(event: PullRequestEvent): string {
	const action = event.action;
	const pr = event.pull_request;
	if (action === 'closed') {
		if (pr.merged) return `Merged PR #${pr.number}: ${pr.title}`;
		return `Closed PR #${pr.number}: ${pr.title}`;
	}
	return `${action.charAt(0).toUpperCase() + action.slice(1)} PR #${pr.number}: ${pr.title}`;
}

function getUrl(event: PullRequestEvent): string {
	return event.pull_request.html_url;
}

function getPRColor(pr: PullRequestEvent['pull_request'], action: string): number {
	if (pr.merged) return Colors.MERGED;
	if (action === 'closed') return Colors.CLOSED;
	if (pr.draft) return Colors.DRAFT;
	return Colors.OPEN;
}

function getPRStatusEmoji(pr: PullRequestEvent['pull_request'], action: string): string {
	if (pr.merged) return '🟣';
	if (action === 'closed') return '🔴';
	if (pr.draft) return '📝';
	return '🟢';
}

export default function generate(event: PullRequestEvent, env: Env, hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const pr = event.pull_request;
	const action = event.action;

	// Nur wichtige Actions verarbeiten
	const supportedActions = ['opened', 'closed', 'reopened', 'ready_for_review', 'converted_to_draft'];
	if (!supportedActions.includes(action)) {
		return undefined;
	}

	const stateLabel = pr.merged ? 'merged' : action === 'closed' ? 'closed' : action;
	const baseEmbed = {
		title: generateTitle(event),
		url: getUrl(event),
		description: truncate(pr.body, 400),
		color: getPRColor(pr, action),
		footer: { text: `${pr.base.repo.full_name} • PR #${pr.number}` },
	};

	if (apiVersion === 'v2') {
		const v2Title = `${getPRStatusEmoji(pr, action)} ${generateTitle(event)}`;

		const fields = [
			{ name: 'Status', value: pr.merged ? '🟣 Merged' : pr.draft ? '📝 Draft' : action === 'closed' ? '🔴 Closed' : '🟢 Open', inline: true },
			{ name: 'Branch', value: `\`${pr.head.ref}\` → \`${pr.base.ref}\``, inline: true },
		];

		// Änderungen anzeigen
		fields.push({
			name: 'Changes',
			value: `+${pr.additions} -${pr.deletions} (${pr.changed_files} file${pr.changed_files !== 1 ? 's' : ''})`,
			inline: true,
		});

		// Reviewers
		if (pr.requested_reviewers && pr.requested_reviewers.length > 0) {
			const reviewers = pr.requested_reviewers
				.filter(r => 'login' in r)
				.map(r => `@${(r as { login: string }).login}`)
				.join(', ');
			if (reviewers) {
				fields.push({ name: 'Reviewers', value: reviewers, inline: true });
			}
		}

		// Labels
		if (pr.labels && pr.labels.length > 0) {
			fields.push({ name: 'Labels', value: formatLabels(pr.labels), inline: true });
		}

		// Assignees
		if (pr.assignees && pr.assignees.length > 0) {
			fields.push({
				name: 'Assignees',
				value: pr.assignees.map(a => `@${a.login}`).join(', '),
				inline: true
			});
		}

		const embed = withUserAuthor({
			...baseEmbed,
			title: v2Title,
			fields
		}, event.sender);

		const buttons = [
			{ label: 'View PR', url: getUrl(event), emoji: '🔀' },
			{ label: 'Files Changed', url: `${getUrl(event)}/files`, emoji: '📄' },
		];

		if (!pr.merged && action !== 'closed') {
			buttons.push({ label: 'Commits', url: `${getUrl(event)}/commits`, emoji: '📝' });
		}

		return buildEnhancedV2Result(embed, {
			footerText: `${pr.base.repo.full_name} • ${pr.merged ? 'Merged' : pr.draft ? 'Draft' : 'Open'} PR #${pr.number}`,
			buttons,
		});
	}

	const embed = withUserAuthor(baseEmbed as any, event.sender);

	return { embeds: [embed] };
}

