import { RepositoryDispatchEvent, WebhookEvent } from '@octokit/webhooks-types';
import { EmbedGenerator } from '../../events';
import { Env } from '../..';

type WebhookEventsWithAction = Exclude<Extract<WebhookEvent, { action: string }>, RepositoryDispatchEvent>;

export type WebhookActionToGenerator<T extends WebhookEventsWithAction> = {
	[K in T['action']]: EmbedGenerator<Extract<T, { action: K }>>;
};

export function actionGenerator<T extends WebhookEventsWithAction>(
	actionEmbedGenerators: Partial<WebhookActionToGenerator<T>>
) {
	return async function (event: T, env: Env, hookId: string, apiVersion?: string) {
		const generator = (actionEmbedGenerators as any)[event.action];
		if (!generator) return undefined;
		return generator(event, env, hookId, apiVersion) as ReturnType<EmbedGenerator<T>>;
	};
}

export default actionGenerator;
