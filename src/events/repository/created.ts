import { RepositoryCreatedEvent } from '@octokit/webhooks-types';
import { Env } from '../..';
import { withUserAuthor, buildV2Result } from '../../lib/embed';
import { Colors } from '../../constants';
import { GeneratorResult } from '..';

export default function generate(event: RepositoryCreatedEvent, _env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const repo = event.repository;
	const title = `Created repository ${repo.full_name}`;

	const baseEmbed = withUserAuthor({
		title,
		url: repo.html_url,
		color: Colors.OPEN,
		description: repo.description ?? undefined,
	}, event.sender);

	if (apiVersion === 'v2') {
		const embed = { ...baseEmbed, fields: [
			{ name: 'Default branch', value: repo.default_branch ?? 'unknown', inline: true },
			{ name: 'Visibility', value: repo.private ? 'private' : 'public', inline: true }
		] };
		return buildV2Result(embed, repo.html_url);
	}

	return { embeds: [baseEmbed] };
}
