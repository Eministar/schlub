import { CommitCommentEvent } from '@octokit/webhooks-types';
import { Env } from '..';
import { withUserAuthor, truncate, buildEnhancedV2Result, formatRelativeTime } from '../lib/embed';
import { Colors, Emojis } from '../constants';
import { GeneratorResult } from '.';

function generateTitle(event: CommitCommentEvent): string {
	const action = event.action;
	const commitSha = event.comment.commit_id.slice(0, 7);

	switch (action) {
		case 'created':
			return `New comment on commit ${commitSha}`;
		default:
			return `Comment ${action} on commit ${commitSha}`;
	}
}

export default function generate(event: CommitCommentEvent, _env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const action = event.action;
	const comment = event.comment;

	// Nur created verarbeiten
	if (action !== 'created') {
		return undefined;
	}

	// Leere Kommentare ignorieren
	if (!comment.body || comment.body.trim().length === 0) {
		return undefined;
	}

	const repoName = event.repository.full_name;
	const commitSha = comment.commit_id;
	const shortSha = commitSha.slice(0, 7);
	const title = generateTitle(event);

	const baseEmbed = withUserAuthor({
		title,
		url: comment.html_url,
		description: truncate(comment.body, 500),
		color: Colors.DISCUSSION,
	}, event.sender);

	if (apiVersion === 'v2') {
		const v2Title = `${Emojis.CODE} ${title}`;

		const fields: Array<{ name: string; value: string; inline: boolean }> = [
			{
				name: 'Commit',
				value: `[\`${shortSha}\`](${event.repository.html_url}/commit/${commitSha})`,
				inline: true
			},
		];

		// Pfad anzeigen wenn auf eine bestimmte Datei kommentiert wurde
		if (comment.path) {
			fields.push({
				name: 'File',
				value: `\`${comment.path}\``,
				inline: true
			});

			if (comment.line) {
				fields.push({
					name: 'Line',
					value: `${comment.line}`,
					inline: true
				});
			}
		}

		// Zeitstempel
		fields.push({
			name: 'Posted',
			value: formatRelativeTime(comment.created_at),
			inline: true
		});

		// Reaktionen
		// @ts-ignore - reactions might exist on some comment types
		if (comment.reactions && comment.reactions.total_count > 0) {
			// @ts-ignore
			const reactions = comment.reactions;
			const parts: string[] = [];
			if (reactions['+1'] > 0) parts.push(`👍 ${reactions['+1']}`);
			if (reactions['-1'] > 0) parts.push(`👎 ${reactions['-1']}`);
			if (reactions.laugh > 0) parts.push(`😄 ${reactions.laugh}`);
			if (reactions.heart > 0) parts.push(`❤️ ${reactions.heart}`);

			if (parts.length > 0) {
				fields.push({ name: 'Reactions', value: parts.join(' '), inline: true });
			}
		}

		const embed = {
			...baseEmbed,
			title: v2Title,
			fields,
			thumbnail: event.sender.avatar_url ? { url: event.sender.avatar_url } : undefined,
		};

		const buttons: Array<{ label: string; url: string; emoji: string }> = [
			{ label: 'View Comment', url: comment.html_url, emoji: '💬' },
			{ label: 'View Commit', url: `${event.repository.html_url}/commit/${commitSha}`, emoji: '📝' },
		];

		return buildEnhancedV2Result(embed, {
			footerText: `${repoName} • Commit ${shortSha}`,
			buttons,
			thumbnailUrl: event.sender.avatar_url,
		});
	}

	return { embeds: [baseEmbed] };
}

