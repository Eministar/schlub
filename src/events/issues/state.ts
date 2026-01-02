import { Issue, IssuesClosedEvent, IssuesEvent, IssuesOpenedEvent, IssuesReopenedEvent, Repository } from '@octokit/webhooks-types';
import { Env } from '../..';
import { withUserAuthor, buildEnhancedV2Result, truncate, formatLabels } from '../../lib/embed';
import { Colors, Emojis } from '../../constants';
import { GeneratorResult } from '..';

type IssueState = "completed" | "not_planned" | "reopened" | null;

type ParsedIssueState = Exclude<IssueState | "opened", null>;

const STATE_COLOR_MAP: Record<ParsedIssueState, number> = {
	opened: Colors.OPEN,
	reopened: Colors.OPEN,
	completed: Colors.MERGED,
	not_planned: Colors.DRAFT,
}

const STATE_EMOJI_MAP: Record<ParsedIssueState, string> = {
	opened: '🟢',
	reopened: '🔄',
	completed: '✅',
	not_planned: '⏭️',
}

function getIssueText(issue: Issue, repository: Repository): string {
	return `${repository.full_name}#${issue.number}`
}

function getActionOnIssueText(repository: Repository, issue: Issue, state: ParsedIssueState): string {
	const issueText = getIssueText(issue, repository);
	switch (state) {
		case "opened":
			return `Opened issue ${issueText}`;
		case "reopened":
			return `Reopened issue ${issueText}`;
		case "completed":
			return `Closed issue ${issueText} as completed`;
		case "not_planned":
			return `Closed issue ${issueText} as not planned`;
	}
}

export default function generate(event: IssuesOpenedEvent | IssuesReopenedEvent | IssuesClosedEvent, env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const state: ParsedIssueState = (event.issue.state_reason as IssueState) ?? (event.action === "opened" ? "opened" : "completed");

	const embedBase: any = withUserAuthor({
		title: getActionOnIssueText(event.repository, event.issue, state),
		url: event.issue.html_url,
		color: getStateColor(state),
	}, event.sender)

	if (state === "opened" && event.issue.body) {
		embedBase.description = truncate(event.issue.body, 400);
	}

	if (apiVersion === 'v2') {
		const v2Title = `${STATE_EMOJI_MAP[state]} ${getActionOnIssueText(event.repository, event.issue, state)}`;

		const fields = [
			{ name: 'Issue', value: `[#${event.issue.number}](${event.issue.html_url}) ${truncate(event.issue.title, 50)}`, inline: false },
			{ name: 'Status', value: `${STATE_EMOJI_MAP[state]} ${state.charAt(0).toUpperCase() + state.slice(1)}`, inline: true },
		];

		// Labels hinzufügen
		if (event.issue.labels && event.issue.labels.length > 0) {
			fields.push({ name: 'Labels', value: formatLabels(event.issue.labels as Array<{ name: string }>), inline: true });
		}

		// Assignees hinzufügen
		if (event.issue.assignees && event.issue.assignees.length > 0) {
			fields.push({
				name: 'Assignees',
				value: event.issue.assignees.map(a => `@${a.login}`).join(', '),
				inline: true
			});
		}

		// Milestone
		if (event.issue.milestone) {
			fields.push({ name: 'Milestone', value: event.issue.milestone.title, inline: true });
		}

		// Kommentare
		if (event.issue.comments > 0) {
			fields.push({ name: 'Comments', value: `${event.issue.comments}`, inline: true });
		}

		const embed = {
			...embedBase,
			title: v2Title,
			fields
		};

		return buildEnhancedV2Result(embed, {
			footerText: `${event.repository.full_name} • Issue #${event.issue.number}`,
			buttons: [
				{ label: 'View Issue', url: event.issue.html_url, emoji: '📋' },
			],
		});
	}

	return { embeds: [embedBase] };
}

function getStateColor(state: ParsedIssueState): number {
	return STATE_COLOR_MAP[state];
}
