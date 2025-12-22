import { RepositoryEvent } from '@octokit/webhooks-types';
import actionGenerator from '../../lib/utils/actionGenerator';

import created from './created';
import deleted from './deleted';
import renamed from './renamed';
import archived from './archived';
import edited from './edited';
import transferred from './transferred';
import publicized from './publicized';
import privatized from './privatized';

export default actionGenerator<RepositoryEvent>({
	created,
	deleted,
	renamed,
	archived,
	unarchived: archived,
	edited,
	transferred,
	publicized,
	privatized,
});
