import { WebhookEvent, WebhookEventMap } from '@octokit/webhooks-types';
import { APIActionRowComponent, APIEmbed, APIMessageActionRowComponent } from 'discord-api-types/v10';
import { Env } from '..';

export interface GeneratorResult {
	content?: string,
	embeds?: APIEmbed[],
	components?: APIActionRowComponent<APIMessageActionRowComponent>[]
}

export type EmbedGenerator<K extends WebhookEvent> = (
	event: K,
	env: Env,
	hookId: string,
	apiVersion?: string
) => GeneratorResult | undefined | Promise<GeneratorResult | undefined>;

export type Events = {
	[K in keyof WebhookEventMap]?: EmbedGenerator<WebhookEventMap[K]>;
};

import ping from './ping';
import push from './push';
import star from './star';
import issues from './issues';
import fork from './fork';
import pkg from './package';
import watch from './watch';
import pull_request from './pull_request';
import repository from './repository';

export default {
	ping,
	push,
	star,
	issues,
	fork,
	package: pkg,
	watch,
	pull_request,
	repository,
} as Events;
