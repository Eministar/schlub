import { PackageEvent } from '@octokit/webhooks-types';
import { Env } from '..';
import { withUserAuthor } from '../lib/embed';
import { Colors } from '../constants';
import { GeneratorResult } from '.';

export default function generate(event: PackageEvent, env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const { package: pkg } = event;

	const baseEmbed: any = withUserAuthor({
		url: pkg.html_url,
		color: Colors.OPEN,
	}, event.sender);

	switch (event.action) {
		case "published":
			baseEmbed.title = `Published ${pkg.name}`
			break
		case "updated":
			baseEmbed.title = `Updated ${pkg.name}`
			break
	}

	if (apiVersion === 'v2') {
		baseEmbed.fields = [ { name: 'Package', value: pkg.name } ];
		return { embeds: [baseEmbed], components: [ { type: 1, components: [ { type: 2, style: 5, label: 'Open', url: pkg.html_url } ] } ] };
	}

	return { embeds: [baseEmbed] };
}
