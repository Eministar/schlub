import { describe, expect, it } from 'vitest';
import { DISCORD_WEBHOOK_URL } from './discord';

describe('DISCORD_WEBHOOK_URL', () => {
	it('omits with_components by default', () => {
		expect(DISCORD_WEBHOOK_URL('1', 'tok', undefined, true)).not.toContain('with_components');
	});

	it('adds with_components so Discord keeps Components V2 payloads', () => {
		expect(DISCORD_WEBHOOK_URL('1', 'tok', undefined, true, true)).toContain('with_components=true');
	});
});
