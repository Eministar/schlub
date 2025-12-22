import { Issue, IssuesClosedEvent, IssuesEvent, IssuesOpenedEvent, IssuesReopenedEvent, Repository } from '@octokit/webhooks-types';
import { Env } from '../..';
import { withUserAuthor, buildV2Result } from '../../lib/embed';
import { Colors } from '../../constants';
import { GeneratorResult } from '..';

type IssueState = "completed" | "not_planned" | "reopened" | null;

type ParsedIssueState = Exclude<IssueState | "opened", null>;

const STATE_COLOR_MAP: Record<ParsedIssueState, number> = {
	opened: Colors.OPEN,
	reopened: Colors.OPEN,
	completed: Colors.MERGED,
	not_planned: Colors.DRAFT,
}

function getIssueText(issue: Issue, repository: Repository): string {
	return `${repository.full_name}#${issue.number}`
}

function getActionOnIssueText(repository: Repository, issue: Issue, state: ParsedIssueState): string {
	const issueText = getIssueText(issue, repository);
	switch (state) {
		case "opened":
			return `Opened issue ${issueText} (${issue.title})`;
		case "reopened":
			return `Reopened issue ${issueText} (${issue.title})`;
		case "completed":
			return `Closed issue ${issueText} (${issue.title}) as completed`;
		case "not_planned":
			return `Closed issue ${issueText} (${issue.title}) as not planned`;
	}
}

export default function generate(event: IssuesOpenedEvent | IssuesReopenedEvent | IssuesClosedEvent, env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const state: ParsedIssueState = (event.issue.state_reason as IssueState) ?? (event.action === "opened" ? "opened" : "completed");

	const embedBase: any = withUserAuthor({
		title: getActionOnIssueText(event.repository, event.issue, state),
		url: event.issue.html_url,
		color: getStateColor(state),
	}, event.sender)

	if (state === "opened" && event.issue.body) embedBase.description = event.issue.body;

	if (apiVersion === 'v2') {
		if (state === "opened") embedBase.fields = [ { name: 'Issue', value: `${event.repository.full_name}#${event.issue.number}` } ];
		return buildV2Result(embedBase, event.issue.html_url);
	}

	return { embeds: [embedBase] };
}

function getStateColor(state: ParsedIssueState): number {
	return STATE_COLOR_MAP[state];
}
