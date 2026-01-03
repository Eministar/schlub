import { IssueCommentEvent } from '@octokit/webhooks-types';
import { Env } from '..';
import { withUserAuthor, truncate, buildEnhancedV2Result, formatRelativeTime } from '../lib/embed';
import { Colors, Emojis } from '../constants';
import { GeneratorResult } from '.';

// Erkennt bestimmte Kommentar-Patterns
function detectCommentType(body: string): { type: string; emoji: string } {
	const lowerBody = body.toLowerCase();

	// Bot-Befehle erkennen
	if (lowerBody.startsWith('/')) {
		return { type: 'Command', emoji: '🤖' };
	}

	// Review-ähnliche Kommentare
	if (lowerBody.includes('lgtm') || lowerBody.includes('looks good')) {
		return { type: 'Approval', emoji: '✅' };
	}

	if (lowerBody.includes('wip') || lowerBody.includes('work in progress')) {
		return { type: 'WIP Note', emoji: '🚧' };
	}

	if (lowerBody.includes('blocked') || lowerBody.includes('blocking')) {
		return { type: 'Blocker', emoji: '🚫' };
	}

	if (lowerBody.includes('question') || lowerBody.includes('?')) {
		return { type: 'Question', emoji: '❓' };
	}

	if (lowerBody.includes('fix') || lowerBody.includes('bug')) {
		return { type: 'Bug Related', emoji: '🐛' };
	}

	return { type: 'Comment', emoji: '💬' };
}

// Prüft ob es ein PR-Kommentar ist
function isPullRequest(event: IssueCommentEvent): boolean {
	return 'pull_request' in event.issue && event.issue.pull_request !== undefined;
}

function generateTitle(event: IssueCommentEvent): string {
	const action = event.action;
	const issue = event.issue;
	const isPR = isPullRequest(event);
	const type = isPR ? 'PR' : 'Issue';
	const number = issue.number;

	switch (action) {
		case 'created':
			return `New comment on ${type} #${number}`;
		case 'edited':
			return `Edited comment on ${type} #${number}`;
		case 'deleted':
			return `Deleted comment on ${type} #${number}`;
		default:
			return `Comment ${action} on ${type} #${number}`;
	}
}

function getColor(event: IssueCommentEvent): number {
	const isPR = isPullRequest(event);
	const state = event.issue.state;

	if (state === 'closed') {
		// Bei PRs prüfen ob gemerged
		if (isPR && event.issue.pull_request?.merged_at) {
			return Colors.MERGED;
		}
		return Colors.CLOSED;
	}

	return isPR ? Colors.OPEN : Colors.DISCUSSION;
}

export default function generate(event: IssueCommentEvent, _env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const action = event.action;
	const comment = event.comment;
	const issue = event.issue;

	// Nur created und edited verarbeiten (deleted ist meist nicht interessant)
	if (!['created', 'edited'].includes(action)) {
		return undefined;
	}

	// Leere Kommentare ignorieren
	if (!comment.body || comment.body.trim().length === 0) {
		return undefined;
	}

	const isPR = isPullRequest(event);
	const title = generateTitle(event);
	const repoName = event.repository.full_name;
	const commentType = detectCommentType(comment.body);

	const baseEmbed = withUserAuthor({
		title,
		url: comment.html_url,
		description: truncate(comment.body, 500),
		color: getColor(event),
	}, event.sender);

	if (apiVersion === 'v2') {
		const typeEmoji = isPR ? Emojis.PULL_REQUEST : Emojis.ISSUE_OPEN;
		const v2Title = `${commentType.emoji} ${title}`;

		const fields: Array<{ name: string; value: string; inline: boolean }> = [
			{
				name: isPR ? 'Pull Request' : 'Issue',
				value: `[#${issue.number}](${issue.html_url}) ${truncate(issue.title, 50)}`,
				inline: false
			},
			{ name: 'Type', value: `${commentType.emoji} ${commentType.type}`, inline: true },
			{ name: 'State', value: issue.state === 'open' ? '🟢 Open' : '🔴 Closed', inline: true },
		];

		// Autor des Issues/PRs anzeigen (wenn unterschiedlich vom Kommentator)
		if (issue.user && issue.user.login !== event.sender.login) {
			fields.push({
				name: isPR ? 'PR Author' : 'Issue Author',
				value: `[@${issue.user.login}](${issue.user.html_url})`,
				inline: true
			});
		}

		// Labels anzeigen
		if (issue.labels && issue.labels.length > 0) {
			const labelNames = issue.labels
				.slice(0, 3)
				.map(l => typeof l === 'string' ? l : l.name)
				.filter(Boolean)
				.map(name => `\`${name}\``)
				.join(', ');
			if (labelNames) {
				fields.push({ name: 'Labels', value: labelNames, inline: true });
			}
		}

		// Kommentar-Reaktionen (falls vorhanden)
		if (comment.reactions && comment.reactions.total_count > 0) {
			const reactions = comment.reactions;
			const parts: string[] = [];
			if (reactions['+1'] > 0) parts.push(`👍 ${reactions['+1']}`);
			if (reactions['-1'] > 0) parts.push(`👎 ${reactions['-1']}`);
			if (reactions.laugh > 0) parts.push(`😄 ${reactions.laugh}`);
			if (reactions.heart > 0) parts.push(`❤️ ${reactions.heart}`);
			if (reactions.rocket > 0) parts.push(`🚀 ${reactions.rocket}`);

			if (parts.length > 0) {
				fields.push({ name: 'Reactions', value: parts.join(' '), inline: true });
			}
		}

		// Zeitstempel
		fields.push({
			name: action === 'edited' ? 'Edited' : 'Posted',
			value: formatRelativeTime(action === 'edited' ? comment.updated_at : comment.created_at),
			inline: true
		});

		const embed = {
			...baseEmbed,
			title: v2Title,
			fields,
			thumbnail: event.sender.avatar_url ? { url: event.sender.avatar_url } : undefined,
		};

		const buttons: Array<{ label: string; url: string; emoji: string }> = [
			{ label: 'View Comment', url: comment.html_url, emoji: '💬' },
			{ label: isPR ? 'View PR' : 'View Issue', url: issue.html_url, emoji: isPR ? '🔀' : '📋' },
		];

		return buildEnhancedV2Result(embed, {
			footerText: `${repoName} • ${isPR ? 'PR' : 'Issue'} #${issue.number}`,
			buttons,
			thumbnailUrl: event.sender.avatar_url,
		});
	}

	return { embeds: [baseEmbed] };
}

