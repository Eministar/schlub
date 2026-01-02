import { WorkflowRunEvent } from '@octokit/webhooks-types';
import { Env } from '..';
import { withUserAuthor, buildEnhancedV2Result, withEmoji, formatRelativeTime } from '../lib/embed';
import { Colors, Emojis } from '../constants';
import { GeneratorResult } from '.';

function getWorkflowColor(conclusion: string | null): number {
	switch (conclusion) {
		case 'success':
			return Colors.WORKFLOW_SUCCESS;
		case 'failure':
		case 'timed_out':
			return Colors.WORKFLOW_FAILURE;
		case 'cancelled':
		case 'skipped':
			return Colors.DRAFT;
		default:
			return Colors.WORKFLOW_PENDING;
	}
}

function getWorkflowEmoji(conclusion: string | null): keyof typeof Emojis {
	switch (conclusion) {
		case 'success':
			return 'WORKFLOW_SUCCESS';
		case 'failure':
		case 'timed_out':
			return 'WORKFLOW_FAILURE';
		default:
			return 'WORKFLOW_PENDING';
	}
}

function getStatusLabel(event: WorkflowRunEvent): string {
	const run = event.workflow_run;
	if (run.conclusion) {
		return run.conclusion.charAt(0).toUpperCase() + run.conclusion.slice(1);
	}
	return run.status.charAt(0).toUpperCase() + run.status.slice(1);
}

function formatDuration(startedAt: string, completedAt: string | null): string {
	if (!completedAt) return 'Running...';

	const start = new Date(startedAt);
	const end = new Date(completedAt);
	const diff = end.getTime() - start.getTime();

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;

	if (minutes > 0) {
		return `${minutes}m ${remainingSeconds}s`;
	}
	return `${seconds}s`;
}

export default function generate(event: WorkflowRunEvent, _env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const run = event.workflow_run;
	const action = event.action;

	// Nur completed events zeigen (nicht bei jedem Trigger)
	if (action !== 'completed') {
		return undefined;
	}

	const conclusion = run.conclusion;
	const title = `Workflow "${run.name}" ${getStatusLabel(event)}`;
	const repoName = event.repository.full_name;

	const baseEmbed = withUserAuthor({
		title,
		url: run.html_url,
		color: getWorkflowColor(conclusion),
	}, event.sender);

	if (apiVersion === 'v2') {
		const v2Title = withEmoji(title, getWorkflowEmoji(conclusion));

		const fields = [
			{ name: 'Workflow', value: run.name, inline: true },
			{ name: 'Status', value: getStatusLabel(event), inline: true },
			{ name: 'Branch', value: `\`${run.head_branch}\``, inline: true },
			{ name: 'Duration', value: formatDuration(run.run_started_at ?? run.created_at, run.updated_at), inline: true },
			{ name: 'Run #', value: `${run.run_number}`, inline: true },
			{ name: 'Attempt', value: `${run.run_attempt}`, inline: true },
		];

		// Commit info hinzufügen
		if (run.head_commit) {
			fields.push({
				name: 'Commit',
				value: `[\`${run.head_sha.slice(0, 7)}\`](${event.repository.html_url}/commit/${run.head_sha}) ${run.head_commit.message.split('\n')[0].slice(0, 50)}`,
				inline: false,
			});
		}

		const embed = {
			...baseEmbed,
			title: v2Title,
			fields
		};

		const buttons = [
			{ label: 'View Run', url: run.html_url, emoji: '▶️' },
			{ label: 'View Logs', url: `${run.html_url}/logs`, emoji: '📋' },
		];

		return buildEnhancedV2Result(embed, {
			footerText: `${repoName} • ${run.name}`,
			buttons,
		});
	}

	return { embeds: [baseEmbed] };
}

