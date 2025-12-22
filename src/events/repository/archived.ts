import { RepositoryArchivedEvent, RepositoryUnarchivedEvent } from '@octokit/webhooks-types';
import { Env } from '../..';
import { withUserAuthor, buildV2Result } from '../../lib/embed';
import { Colors } from '../../constants';
import { GeneratorResult } from '..';

export default function generate(event: RepositoryArchivedEvent | RepositoryUnarchivedEvent, _env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const repo = event.repository;
	const action = event.action; // 'archived' or 'unarchived'
	const title = action === 'archived' ? `Archived repository ${repo.full_name}` : `Unarchived repository ${repo.full_name}`;
	const color = action === 'archived' ? Colors.DRAFT : Colors.OPEN;

	const baseEmbed = withUserAuthor({
		title,
		url: repo.html_url,
		color,
	}, event.sender);

	if (apiVersion === 'v2') {
		const embed = { ...baseEmbed, fields: [ { name: 'Repository', value: repo.full_name } ] };
		return buildV2Result(embed, repo.html_url);
	}

	return { embeds: [baseEmbed] };
}
