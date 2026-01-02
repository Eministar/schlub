import { Commit, Committer, PushEvent, Repository } from '@octokit/webhooks-types';
import { Env } from '..';
import { withUserAuthor, buildEnhancedV2Result, withEmoji } from '../lib/embed';
import { GITHUB_URL, RefType, getBranchOrTag, getRefType } from '../lib/github';
import pluralize from '../lib/utils/pluralize';
import { GeneratorResult } from '.';
import { Colors } from '../constants';

const GITHUB_USER_URL = (username: string) => `${GITHUB_URL}/${username}`;
const GITHUB_REPO_COMMIT_URL = (repository: Repository, commit: Commit) => `${repository.html_url}/commit/${commit.id}`;

function generateCommiterString(commiter: Committer): string {
	if (commiter.username) return `[${commiter.username}](${GITHUB_USER_URL(commiter.username)})`;
	else return `${commiter.name}`;
}

function generateCommitString(commit: Commit, repository: Repository): string {
	const trimmedId = commit.id.slice(0, 7);
	const commitUrl = GITHUB_REPO_COMMIT_URL(repository, commit);

	const trimmedMessage = commit.message.split('\n')[0].slice(0, 50);
	const message = trimmedMessage !== commit.message.split('\n')[0] ? `${trimmedMessage}...` : trimmedMessage;

	return `[\`${trimmedId}\`](${commitUrl}) ${message} — ${generateCommiterString(commit.author)}`;
}

function generateCommitsString(commits: Commit[], repository: Repository, maxCommits = 8): string {
	const displayedCommits = commits.slice(0, maxCommits);
	const remaining = commits.length - maxCommits;

	let result = displayedCommits.map((commit) => generateCommitString(commit, repository)).join('\n');

	if (remaining > 0) {
		result += `\n... and ${remaining} more commit${remaining > 1 ? 's' : ''}`;
	}

	return result;
}

function generateTitle(event: PushEvent): string {
	return `Pushed ${pluralize(event.commits.length, "commit", "commits")} to ${event.repository.full_name}`;
}

function getUrl(event: PushEvent): string {
	return event.compare;
}

function generateFilesChanged(commits: Commit[]): { added: number; modified: number; removed: number; total: number } {
	const added = new Set(commits.flatMap((commit) => commit.added));
	const modified = new Set(commits.flatMap((commit) => commit.modified));
	const removed = new Set(commits.flatMap((commit) => commit.removed));
	const total = new Set([...added, ...modified, ...removed]).size;

	return { added: added.size, modified: modified.size, removed: removed.size, total };
}

function generateRefString(refType: RefType, branchOrTag: string): string {
	switch (refType) {
		case "heads":
			return `${branchOrTag} branch`;
		case "tags":
			return `tag ${branchOrTag}`;
	}
}

function generateFooter(event: PushEvent): string {
	const branchOrTag = getBranchOrTag(event.ref);
	const refType = getRefType(event.ref);

	const ref = generateRefString(refType, branchOrTag);
	const filesChanged = generateFilesChanged(event.commits);

	return `${ref} • ${pluralize(filesChanged.total, "file", "files")} changed`;
}

export default function generate(event: PushEvent, env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const branchOrTag = getBranchOrTag(event.ref);
	const refType = getRefType(event.ref);
	const filesChanged = generateFilesChanged(event.commits);

	const embedBase = {
		title: generateTitle(event),
		url: getUrl(event),
		description: generateCommitsString(event.commits, event.repository),
		footer: {
			text: generateFooter(event),
		},
	};

	if (apiVersion === 'v2') {
		const v2Title = withEmoji(generateTitle(event), refType === 'tags' ? 'TAG' : 'PUSH');

		const fields = [
			{ name: 'Commits', value: `${event.commits.length}`, inline: true },
			{ name: refType === 'tags' ? 'Tag' : 'Branch', value: `\`${branchOrTag}\``, inline: true },
			{ name: 'Files Changed', value: `+${filesChanged.added} ~${filesChanged.modified} -${filesChanged.removed}`, inline: true },
		];

		// Forced push indicator
		if (event.forced) {
			fields.push({ name: '⚠️ Force Push', value: 'Yes', inline: true });
		}

		const embed = withUserAuthor({
			...embedBase,
			title: v2Title,
			color: event.forced ? Colors.CLOSED : Colors.OPEN,
			fields,
		}, event.sender);

		return buildEnhancedV2Result(embed, {
			footerText: `${event.repository.full_name} • ${branchOrTag}`,
			buttons: [
				{ label: 'Compare', url: getUrl(event), emoji: '🔍' },
				{ label: 'View Branch', url: `${event.repository.html_url}/tree/${branchOrTag}`, emoji: '🌿' },
			],
		});
	}

	const embed = withUserAuthor(embedBase as any, event.sender);

	return { embeds: [embed] };
}
