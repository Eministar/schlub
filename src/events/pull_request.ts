import { PullRequestEvent } from '@octokit/webhooks-types';
import { Env } from '..';
import { withUserAuthor, truncate, colorFromState, buildV2Result } from '../lib/embed';
import { GeneratorResult } from '.';

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

export default function generate(event: PullRequestEvent, env: Env, hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const pr = event.pull_request;
	const action = event.action;

	// Ignore some actions if necessary
	if (action === 'synchronize' || action === 'edited' || action === 'opened' || action === 'reopened' || action === 'closed') {
		const stateLabel = pr.merged ? 'merged' : action === 'closed' ? 'closed' : action;
		const baseEmbed = {
			title: generateTitle(event),
			url: getUrl(event),
			description: truncate(pr.body, 400),
			color: colorFromState(stateLabel),
			footer: { text: `${pr.base.repo.full_name} • PR #${pr.number}` },
		};

		if (apiVersion === 'v2') {
			const embed = withUserAuthor({
				...baseEmbed,
				fields: [ { name: 'PR', value: `#${pr.number}` }, { name: 'State', value: stateLabel } ]
			}, event.sender);
			return buildV2Result(embed, getUrl(event));
		}

		const embed = withUserAuthor(baseEmbed as any, event.sender);

		return { embeds: [embed] };
	}

	return undefined;
}
