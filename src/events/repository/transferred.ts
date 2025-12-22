import { RepositoryTransferredEvent } from '@octokit/webhooks-types';
import { Env } from '../..';
import { withUserAuthor, buildV2Result } from '../../lib/embed';
import { Colors } from '../../constants';
import { GeneratorResult } from '..';

export default function generate(event: RepositoryTransferredEvent, _env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const repo = event.repository;
	const newOwner = (event as any).new_owner ?? (event as any).newOwner ?? null;
	const ownerLogin = newOwner ? newOwner.login ?? String(newOwner) : 'unknown';

	const baseEmbed = withUserAuthor({
		title: `Transferred repository ${repo.full_name} to ${ownerLogin}`,
		url: repo.html_url,
		color: Colors.DRAFT,
		description: `New owner: ${ownerLogin}`,
		fields: [ { name: 'New owner', value: ownerLogin } ]
	}, event.sender);

	if (apiVersion === 'v2') {
		return buildV2Result(baseEmbed, repo.html_url);
	}

	return { embeds: [baseEmbed] };
}
