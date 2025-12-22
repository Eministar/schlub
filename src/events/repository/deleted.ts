import { RepositoryDeletedEvent } from '@octokit/webhooks-types';
import { Env } from '../..';
import { withUserAuthor, buildV2Result } from '../../lib/embed';
import { Colors } from '../../constants';
import { GeneratorResult } from '..';

export default function generate(event: RepositoryDeletedEvent, _env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const repo = event.repository;
	const title = `Deleted repository ${repo.full_name}`;

	const baseEmbed = withUserAuthor({
		title,
		url: repo.html_url,
		color: Colors.CLOSED,
	}, event.sender);

	if (apiVersion === 'v2') {
		const embed = { ...baseEmbed, fields: [
			{ name: 'Repository', value: repo.full_name, inline: true },
			{ name: 'Deleted at', value: new Date().toISOString(), inline: true }
		] };
		return buildV2Result(embed, repo.html_url);
	}

	return { embeds: [baseEmbed] };
}
