import { ForkEvent } from '@octokit/webhooks-types';
import { Env } from '..';
import { withUserAuthor, buildV2Result } from '../lib/embed';
import pluralize from '../lib/utils/pluralize';
import { GeneratorResult } from '.';

export default function generate(event: ForkEvent, env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const embedBase: any = withUserAuthor({
		title: `Forked ${event.repository.full_name} to ${event.forkee.full_name}`,
		url: event.forkee.html_url,
		footer: {
			text: pluralize(event.repository.forks_count, "fork", "forks"),
		},
	}, event.sender)

	if (apiVersion === 'v2') {
		embedBase.fields = [ { name: 'Fork', value: event.forkee.full_name } ];
		return buildV2Result(embedBase, event.forkee.html_url);
	}

	return { embeds: [embedBase] };
}
