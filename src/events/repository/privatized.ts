import { RepositoryPrivatizedEvent } from '@octokit/webhooks-types';
import { Env } from '../..';
import { withUserAuthor, buildV2Result } from '../../lib/embed';
import { Colors } from '../../constants';
import { GeneratorResult } from '..';

export default function generate(event: RepositoryPrivatizedEvent, _env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const repo = event.repository;

	const baseEmbed = withUserAuthor({
		title: `Made repository private: ${repo.full_name}`,
		url: repo.html_url,
		color: Colors.CLOSED,
		fields: [ { name: 'Repository', value: repo.full_name }, { name: 'Visibility', value: 'private' } ]
	}, event.sender);

	if (apiVersion === 'v2') {
		return buildV2Result(baseEmbed, repo.html_url);
	}

	return { embeds: [baseEmbed] };
}
