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
import release from './release';
import workflow_run from './workflow_run';
import pull_request_review from './pull_request_review';
import discussion from './discussion';
import deployment_status from './deployment_status';
import issue_comment from './issue_comment';
import create from './create';
import deleteEvent from './delete';
import commit_comment from './commit_comment';
import member from './member';

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
	release,
	workflow_run,
	pull_request_review,
	discussion,
	deployment_status,
	issue_comment,
	create,
	delete: deleteEvent,
	commit_comment,
	member,
} as Events;
