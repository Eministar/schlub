import { MemberEvent } from '@octokit/webhooks-types';
import { Env } from '..';
import { withUserAuthor, buildEnhancedV2Result } from '../lib/embed';
import { Colors } from '../constants';
import { GeneratorResult } from '.';

function getPermissionEmoji(permission: string): string {
	switch (permission) {
		case 'admin':
			return '👑';
		case 'maintain':
			return '🛡️';
		case 'write':
		case 'push':
			return '✏️';
		case 'triage':
			return '📋';
		case 'read':
		case 'pull':
			return '👀';
		default:
			return '👤';
	}
}

function getActionEmoji(action: string): string {
	switch (action) {
		case 'added':
			return '➕';
		case 'removed':
			return '➖';
		case 'edited':
			return '✏️';
		default:
			return '👥';
	}
}

function getActionColor(action: string): number {
	switch (action) {
		case 'added':
			return Colors.OPEN;
		case 'removed':
			return Colors.CLOSED;
		case 'edited':
			return Colors.DISCUSSION;
		default:
			return Colors.DRAFT;
	}
}

function generateTitle(event: MemberEvent): string {
	const action = event.action;
	const member = event.member;
	const repoName = event.repository.full_name;

	switch (action) {
		case 'added':
			return `Added ${member.login} to ${repoName}`;
		case 'removed':
			return `Removed ${member.login} from ${repoName}`;
		case 'edited':
			return `Updated ${member.login}'s permissions on ${repoName}`;
		default:
			return `Member ${action} on ${repoName}`;
	}
}

export default function generate(event: MemberEvent, _env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const action = event.action;
	const member = event.member;
	const repoName = event.repository.full_name;

	const title = generateTitle(event);
	const color = getActionColor(action);
	const actionEmoji = getActionEmoji(action);

	const baseEmbed = withUserAuthor({
		title,
		url: member.html_url,
		color,
	}, event.sender);

	if (apiVersion === 'v2') {
		const v2Title = `${actionEmoji} ${title}`;

		const fields: Array<{ name: string; value: string; inline: boolean }> = [
			{
				name: 'Member',
				value: `[@${member.login}](${member.html_url})`,
				inline: true
			},
			{
				name: 'Action',
				value: `${actionEmoji} ${action.charAt(0).toUpperCase() + action.slice(1)}`,
				inline: true
			},
		];

		// Bei Berechtigungsänderungen: Alte und neue Berechtigung anzeigen
		// @ts-ignore - permission/old_permission structure varies
		if (action === 'edited' && event.changes?.old_permission) {
			// @ts-ignore
			const oldPermission = event.changes.old_permission.from;
			// @ts-ignore - permission might exist
			const newPermission = event.member.permissions ? Object.keys(event.member.permissions).find(k => event.member.permissions[k]) : 'unknown';

			fields.push({
				name: 'Permission Change',
				value: `${getPermissionEmoji(oldPermission)} ${oldPermission} → ${getPermissionEmoji(newPermission || 'unknown')} ${newPermission}`,
				inline: false
			});
		}

		// Hinzugefügt von
		if (event.sender.login !== member.login) {
			fields.push({
				name: action === 'added' ? 'Added by' : action === 'removed' ? 'Removed by' : 'Changed by',
				value: `[@${event.sender.login}](${event.sender.html_url})`,
				inline: true
			});
		}

		const embed = {
			...baseEmbed,
			title: v2Title,
			fields,
			thumbnail: member.avatar_url ? { url: member.avatar_url } : undefined,
		};

		const buttons: Array<{ label: string; url: string; emoji: string }> = [
			{ label: 'View Profile', url: member.html_url, emoji: '👤' },
			{ label: 'Collaborators', url: `${event.repository.html_url}/settings/access`, emoji: '👥' },
		];

		return buildEnhancedV2Result(embed, {
			footerText: `${repoName} • Collaborators`,
			buttons,
			thumbnailUrl: member.avatar_url,
		});
	}

	return { embeds: [baseEmbed] };
}

