import { DeploymentStatusEvent } from '@octokit/webhooks-types';
import { Env } from '..';
import { withUserAuthor, buildEnhancedV2Result, withEmoji } from '../lib/embed';
import { Colors } from '../constants';
import { GeneratorResult } from '.';

function getStatusColor(state: string): number {
	switch (state) {
		case 'success':
			return Colors.WORKFLOW_SUCCESS;
		case 'failure':
		case 'error':
			return Colors.WORKFLOW_FAILURE;
		case 'pending':
		case 'queued':
		case 'in_progress':
			return Colors.WORKFLOW_PENDING;
		case 'inactive':
			return Colors.DRAFT;
		default:
			return Colors.DEPLOYMENT;
	}
}

function getStatusEmoji(state: string): string {
	switch (state) {
		case 'success':
			return '✅';
		case 'failure':
		case 'error':
			return '❌';
		case 'pending':
		case 'queued':
			return '⏳';
		case 'in_progress':
			return '🔄';
		case 'inactive':
			return '⏸️';
		default:
			return '🚀';
	}
}

export default function generate(event: DeploymentStatusEvent, _env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const deployment = event.deployment;
	const status = event.deployment_status;
	const state = status.state;

	// Nur wichtige Status-Updates zeigen
	if (!['success', 'failure', 'error', 'pending', 'in_progress'].includes(state)) {
		return undefined;
	}

	const environment = deployment.environment;
	const title = `${getStatusEmoji(state)} Deployment to ${environment}: ${state.charAt(0).toUpperCase() + state.slice(1)}`;
	const repoName = event.repository.full_name;

	const baseEmbed = withUserAuthor({
		title,
		url: status.target_url ?? deployment.url,
		description: status.description ?? undefined,
		color: getStatusColor(state),
	}, event.sender);

	if (apiVersion === 'v2') {
		const v2Title = withEmoji(`Deployment to ${environment}`, 'DEPLOYMENT');

		const fields = [
			{ name: 'Environment', value: environment, inline: true },
			{ name: 'Status', value: `${getStatusEmoji(state)} ${state.charAt(0).toUpperCase() + state.slice(1)}`, inline: true },
		];

		// Ref info (branch/tag/sha)
		if (deployment.ref) {
			fields.push({ name: 'Ref', value: `\`${deployment.ref}\``, inline: true });
		}

		// Commit SHA
		fields.push({
			name: 'Commit',
			value: `[\`${deployment.sha.slice(0, 7)}\`](${event.repository.html_url}/commit/${deployment.sha})`,
			inline: true
		});

		// Task (wenn vorhanden)
		if (deployment.task && deployment.task !== 'deploy') {
			fields.push({ name: 'Task', value: deployment.task, inline: true });
		}

		const embed = {
			...baseEmbed,
			title: v2Title,
			fields
		};

		const buttons: Array<{ label: string; url: string; emoji?: string }> = [];

		if (status.target_url) {
			buttons.push({ label: 'View Deployment', url: status.target_url, emoji: '🔗' });
		}

		if (status.log_url) {
			buttons.push({ label: 'View Logs', url: status.log_url, emoji: '📋' });
		}

		if (status.environment_url) {
			buttons.push({ label: 'Open Environment', url: status.environment_url, emoji: '🌐' });
		}

		return buildEnhancedV2Result(embed, {
			footerText: `${repoName} • ${environment}`,
			buttons: buttons.length > 0 ? buttons : undefined,
		});
	}

	return { embeds: [baseEmbed] };
}

