import { RepositoryEditedEvent } from '@octokit/webhooks-types';
import { Env } from '../..';
import { withUserAuthor, buildV2Result } from '../../lib/embed';
import { Colors } from '../../constants';
import { GeneratorResult } from '..';

export default function generate(event: RepositoryEditedEvent, _env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const repo = event.repository;
	const changes = (event as any).changes?.repository ?? null;
	let description: string | undefined;
	let fields: any[] | undefined;
	if (changes) {
		const parts: string[] = [];
		fields = [];
		for (const key of Object.keys(changes)) {
			const from = (changes as any)[key]?.from ?? '';
			const to = (repo as any)[key] ?? '';
			parts.push(`${key}: ${from} → ${to}`);
			fields.push({ name: key, value: `${from} → ${to}`, inline: true });
		}
		if (parts.length) description = `Changes: ${parts.join(', ')}`;
	}

	const baseEmbed = withUserAuthor({
		title: `Edited repository ${repo.full_name}`,
		url: repo.html_url,
		color: Colors.OPEN,
		description: description ?? repo.description ?? undefined,
		fields: fields
	}, event.sender);

	if (apiVersion === 'v2') {
		return buildV2Result(baseEmbed, repo.html_url);
	}

	return { embeds: [baseEmbed] };
}
