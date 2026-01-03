import { DiscussionEvent } from '@octokit/webhooks-types';
import { Env } from '..';
import { withUserAuthor, truncate, buildEnhancedV2Result, withEmoji, formatRelativeTime, formatLabels } from '../lib/embed';
import { Colors, Emojis } from '../constants';
import { GeneratorResult } from '.';

// Kategorie-Emojis für verschiedene Discussion-Typen
const CategoryEmojis: Record<string, string> = {
	'announcements': '📢',
	'general': '💬',
	'ideas': '💡',
	'polls': '📊',
	'q&a': '❓',
	'show and tell': '🎭',
	'help': '🆘',
	'feedback': '📝',
};

// Farben basierend auf dem Discussion-Zustand
function getDiscussionColor(event: DiscussionEvent): number {
	const action = event.action;
	const discussion = event.discussion;

	if (action === 'answered') return Colors.OPEN;
	if (action === 'locked') return Colors.CLOSED;
	if (action === 'pinned') return Colors.STAR;
	if (discussion.locked) return Colors.DRAFT;

	return Colors.DISCUSSION;
}

// Emoji für die Kategorie holen
function getCategoryEmoji(categoryName: string): string {
	const normalized = categoryName.toLowerCase();
	return CategoryEmojis[normalized] || '💬';
}

// Status-Badge generieren
function getStatusBadge(event: DiscussionEvent): string {
	const discussion = event.discussion;
	const action = event.action;

	if (action === 'answered' || discussion.answer_html_url) return '✅ Answered';
	if (action === 'locked' || discussion.locked) return '🔒 Locked';
	if (action === 'pinned') return '📌 Pinned';
	if (action === 'unpinned') return '📍 Unpinned';
	return '🟢 Open';
}

// Erweiterte Reactions-Statistik (wenn verfügbar)
function formatReactions(discussion: DiscussionEvent['discussion']): string | null {
	const reactions = discussion.reactions;
	if (!reactions) return null;

	const parts: string[] = [];
	if (reactions['+1'] > 0) parts.push(`👍 ${reactions['+1']}`);
	if (reactions['-1'] > 0) parts.push(`👎 ${reactions['-1']}`);
	if (reactions.laugh > 0) parts.push(`😄 ${reactions.laugh}`);
	if (reactions.hooray > 0) parts.push(`🎉 ${reactions.hooray}`);
	if (reactions.confused > 0) parts.push(`😕 ${reactions.confused}`);
	if (reactions.heart > 0) parts.push(`❤️ ${reactions.heart}`);
	if (reactions.rocket > 0) parts.push(`🚀 ${reactions.rocket}`);
	if (reactions.eyes > 0) parts.push(`👀 ${reactions.eyes}`);

	return parts.length > 0 ? parts.join(' ') : null;
}

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
		case 'pinned':
			return `Pinned discussion: ${title}`;
		case 'unpinned':
			return `Unpinned discussion: ${title}`;
		case 'labeled':
			return `Labeled discussion: ${title}`;
		case 'unlabeled':
			return `Removed label from discussion: ${title}`;
		case 'category_changed':
			return `Category changed: ${title}`;
		case 'transferred':
			return `Transferred discussion: ${title}`;
		default:
			return `Discussion ${action}: ${title}`;
	}
}

// Unterstützte Actions für Benachrichtigungen
const SUPPORTED_ACTIONS = ['created', 'answered', 'pinned', 'unpinned', 'locked', 'unlocked', 'edited', 'labeled', 'category_changed'];

export default function generate(event: DiscussionEvent, _env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const discussion = event.discussion;
	const action = event.action;

	// Erweiterte Action-Liste
	if (!SUPPORTED_ACTIONS.includes(action)) {
		return undefined;
	}

	const title = generateTitle(event);
	const description = truncate(discussion.body, 400);
	const repoName = event.repository.full_name;
	const color = getDiscussionColor(event);

	const baseEmbed = withUserAuthor({
		title,
		url: discussion.html_url,
		description,
		color,
	}, event.sender);

	if (apiVersion === 'v2') {
		const categoryEmoji = getCategoryEmoji(discussion.category?.name ?? 'General');
		const v2Title = `${Emojis.DISCUSSION} ${title}`;

		const fields: Array<{ name: string; value: string; inline: boolean }> = [
			{ name: 'Category', value: `${categoryEmoji} ${discussion.category?.name ?? 'General'}`, inline: true },
			{ name: 'Status', value: getStatusBadge(event), inline: true },
		];

		// Kommentare anzeigen
		if (discussion.comments > 0) {
			fields.push({ name: 'Comments', value: `💬 ${discussion.comments}`, inline: true });
		}

		// Labels anzeigen (falls vorhanden)
		// @ts-ignore - labels might exist on some discussion events
		if (discussion.labels && discussion.labels.length > 0) {
			fields.push({
				name: 'Labels',
				// @ts-ignore
				value: formatLabels(discussion.labels),
				inline: true
			});
		}

		// Reactions anzeigen
		const reactions = formatReactions(discussion);
		if (reactions) {
			fields.push({ name: 'Reactions', value: reactions, inline: true });
		}

		// Upvotes (falls verfügbar)
		// @ts-ignore - upvote_count might exist on some discussion events
		if (discussion.upvote_count > 0) {
			// @ts-ignore
			fields.push({ name: 'Upvotes', value: `⬆️ ${discussion.upvote_count}`, inline: true });
		}

		// Erstellungsdatum bei neuen Discussions
		if (action === 'created') {
			fields.push({
				name: 'Created',
				value: formatRelativeTime(discussion.created_at),
				inline: true
			});
		}

		// Bei 'answered': Zeige Antwort-Info
		if (action === 'answered' && discussion.answer_chosen_at) {
			fields.push({
				name: 'Answered',
				value: formatRelativeTime(discussion.answer_chosen_at),
				inline: true
			});
		}

		// Zusätzliche Kontext-Info bei bestimmten Actions
		if (action === 'locked' && discussion.active_lock_reason) {
			fields.push({
				name: 'Lock Reason',
				value: discussion.active_lock_reason,
				inline: true
			});
		}

		const embed = {
			...baseEmbed,
			title: v2Title,
			fields,
			thumbnail: event.sender.avatar_url ? { url: event.sender.avatar_url } : undefined,
		};

		const buttons: Array<{ label: string; url: string; emoji: string }> = [
			{ label: 'View Discussion', url: discussion.html_url, emoji: '💬' },
		];

		if (discussion.answer_html_url) {
			buttons.push({ label: 'View Answer', url: discussion.answer_html_url, emoji: '✅' });
		}

		// Button für Kategorie (wenn verfügbar)
		// @ts-ignore - html_url might exist on some category types
		if (discussion.category?.html_url) {
			// @ts-ignore
			buttons.push({ label: discussion.category.name, url: discussion.category.html_url, emoji: categoryEmoji });
		}

		return buildEnhancedV2Result(embed, {
			footerText: `${repoName} • ${discussion.category?.name ?? 'Discussions'}`,
			buttons,
			thumbnailUrl: event.sender.avatar_url,
		});
	}

	return { embeds: [baseEmbed] };
}
