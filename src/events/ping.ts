import { PingEvent } from '@octokit/webhooks-types';
import { APIEmbed } from 'discord-api-types/v10';
import { Env } from '..';
import { withUserAuthor, buildV2Result } from '../lib/embed';
import { GeneratorResult } from '.';

export default function generate(event: PingEvent, env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	let embed: APIEmbed = {
		title: `Pong!`,
	};

	if (event.sender) embed = withUserAuthor(embed, event.sender);

	if (apiVersion === 'v2') {
		return buildV2Result(embed);
	}

	return { embeds: [embed] };
}
