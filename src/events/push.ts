import { Commit, Committer, PushEvent, Repository } from '@octokit/webhooks-types';
import { Env } from '..';
import { withUserAuthor, buildV2Result } from '../lib/embed';
import { GITHUB_URL, RefType, getBranchOrTag, getRefType } from '../lib/github';
import pluralize from '../lib/utils/pluralize';
import { GeneratorResult } from '.';

const GITHUB_USER_URL = (username: string) => `${GITHUB_URL}/${username}`;
const GITHUB_REPO_COMMIT_URL = (repository: Repository, commit: Commit) => `${repository.html_url}/commit/${commit.id}`;

function generateCommiterString(commiter: Committer): string {
	if (commiter.username) return `[${commiter.username}](${GITHUB_USER_URL(commiter.username)})`;
	else return `${commiter.name}`;
}

function generateCommitString(commit: Commit, repository: Repository): string {
	const trimmedId = commit.id.slice(0, 7);
	const commitUrl = GITHUB_REPO_COMMIT_URL(repository, commit);

	const trimmedMessage = commit.message.slice(0, 50);
	const message = trimmedMessage !== commit.message ? `${trimmedMessage}...` : commit.message;

	return `[\`${trimmedId}\`](${commitUrl}) "${message}" by ${generateCommiterString(commit.author)}`;
}

function generateCommitsString(commits: Commit[], repository: Repository): string {
	return commits.map((commit) => generateCommitString(commit, repository)).join('\n');
}

function generateTitle(event: PushEvent): string {
	return `Pushed ${pluralize(event.commits.length, "commit", "commits")} to ${event.repository.full_name}`;
}

function getUrl(event: PushEvent): string {
	return event.compare;
}

function generateFilesChanged(commits: Commit[]): number {
	return [...new Set(commits.flatMap((commit) => commit.added.concat(commit.removed).concat(commit.modified)))].length
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

	const ref = generateRefString(refType, branchOrTag)
	const filesChanged = `${pluralize(generateFilesChanged(event.commits), "file", "files")} changed`

	return `${ref} • ${filesChanged}`;
}

export default function generate(event: PushEvent, env: Env, _hookId?: string, apiVersion?: string): GeneratorResult | undefined {
	const embedBase = {
		title: generateTitle(event),
		url: getUrl(event),
		description: generateCommitsString(event.commits, event.repository),
		footer: {
			text: generateFooter(event),
		},
	};

	if (apiVersion === 'v2') {
		const embed = withUserAuthor({
			...embedBase,
			color: undefined,
			fields: [
				{ name: 'Commits', value: String(event.commits.length), inline: true },
				{ name: 'Files changed', value: String(generateFilesChanged(event.commits)), inline: true }
			]
		}, event.sender);

		return buildV2Result(embed, getUrl(event));
	}

	const embed = withUserAuthor(embedBase as any, event.sender);

	return { embeds: [embed] };
}
