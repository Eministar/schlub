import { RepositoryRenamedEvent } from '@octokit/webhooks-types';
import { Env } from '../..';
import { withUserAuthor, buildV2Result } from '../../lib/embed';
import { Colors } from '../../constants';
import { GeneratorResult } from '..';

export default function generate(event: RepositoryRenamedEvent, _env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const repo = event.repository;
	const oldName = (event as any).changes?.repository?.name?.from ?? undefined;
	const title = oldName ? `Renamed repository ${oldName} → ${repo.name}` : `Renamed repository ${repo.full_name}`;

	const baseEmbed = withUserAuthor({
		title,
		url: repo.html_url,
		color: Colors.DRAFT,
	}, event.sender);

	if (apiVersion === 'v2') {
		const embed = { ...baseEmbed, fields: oldName ? [ { name: 'Old name', value: oldName }, { name: 'New name', value: repo.name } ] : undefined };
		return buildV2Result(embed, repo.html_url);
	}

	return { embeds: [baseEmbed] };
}
