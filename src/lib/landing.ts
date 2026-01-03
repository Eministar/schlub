/**
 * Beautiful landing page HTML for schlub
 */
export function getLandingPageHTML(): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Schlub — GitHub → Discord Webhooks</title>
	<meta name="description" content="Enhanced GitHub to Discord webhook integration with beautiful embeds, buttons, and more.">
	<meta name="theme-color" content="#5865F2">

	<!-- Open Graph -->
	<meta property="og:title" content="Schlub — GitHub → Discord Webhooks">
	<meta property="og:description" content="Enhanced GitHub to Discord webhook integration with beautiful embeds, buttons, and more.">
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://schlub.star-dev.xyz">

	<style>
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}

		:root {
			--bg-primary: #0d1117;
			--bg-secondary: #161b22;
			--bg-tertiary: #21262d;
			--text-primary: #f0f6fc;
			--text-secondary: #8b949e;
			--accent-purple: #8957e5;
			--accent-blue: #58a6ff;
			--accent-green: #3fb950;
			--accent-discord: #5865F2;
			--accent-github: #238636;
			--border-color: #30363d;
		}

		body {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif;
			background: var(--bg-primary);
			color: var(--text-primary);
			min-height: 100vh;
			line-height: 1.6;
		}

		.container {
			max-width: 900px;
			margin: 0 auto;
			padding: 2rem;
		}

		header {
			text-align: center;
			padding: 4rem 0 3rem;
		}

		.logo {
			font-size: 4rem;
			margin-bottom: 1rem;
		}

		h1 {
			font-size: 3rem;
			background: linear-gradient(135deg, var(--accent-purple), var(--accent-blue));
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
			margin-bottom: 0.5rem;
		}

		.tagline {
			font-size: 1.25rem;
			color: var(--text-secondary);
			margin-bottom: 2rem;
		}

		.buttons {
			display: flex;
			gap: 1rem;
			justify-content: center;
			flex-wrap: wrap;
		}

		.btn {
			display: inline-flex;
			align-items: center;
			gap: 0.5rem;
			padding: 0.75rem 1.5rem;
			border-radius: 8px;
			text-decoration: none;
			font-weight: 600;
			font-size: 1rem;
			transition: all 0.2s ease;
			border: 1px solid transparent;
		}

		.btn-primary {
			background: var(--accent-discord);
			color: white;
		}

		.btn-primary:hover {
			background: #4752c4;
			transform: translateY(-2px);
		}

		.btn-secondary {
			background: var(--bg-tertiary);
			color: var(--text-primary);
			border-color: var(--border-color);
		}

		.btn-secondary:hover {
			background: var(--border-color);
			transform: translateY(-2px);
		}

		.features {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
			gap: 1.5rem;
			margin: 3rem 0;
		}

		.feature {
			background: var(--bg-secondary);
			border: 1px solid var(--border-color);
			border-radius: 12px;
			padding: 1.5rem;
			transition: all 0.2s ease;
		}

		.feature:hover {
			border-color: var(--accent-purple);
			transform: translateY(-4px);
		}

		.feature-icon {
			font-size: 2rem;
			margin-bottom: 0.75rem;
		}

		.feature h3 {
			font-size: 1.1rem;
			margin-bottom: 0.5rem;
			color: var(--text-primary);
		}

		.feature p {
			font-size: 0.9rem;
			color: var(--text-secondary);
		}

		.section {
			background: var(--bg-secondary);
			border: 1px solid var(--border-color);
			border-radius: 12px;
			padding: 2rem;
			margin: 2rem 0;
		}

		.section h2 {
			font-size: 1.5rem;
			margin-bottom: 1rem;
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}

		.code-block {
			background: var(--bg-primary);
			border: 1px solid var(--border-color);
			border-radius: 8px;
			padding: 1rem;
			font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
			font-size: 0.875rem;
			overflow-x: auto;
			color: var(--accent-blue);
		}

		.step {
			display: flex;
			gap: 1rem;
			margin: 1.5rem 0;
		}

		.step-number {
			width: 32px;
			height: 32px;
			background: var(--accent-purple);
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: bold;
			flex-shrink: 0;
		}

		.step-content h4 {
			margin-bottom: 0.25rem;
		}

		.step-content p {
			color: var(--text-secondary);
			font-size: 0.9rem;
		}

		.events-grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
			gap: 0.75rem;
			margin-top: 1rem;
		}

		.event-badge {
			background: var(--bg-primary);
			border: 1px solid var(--border-color);
			border-radius: 6px;
			padding: 0.5rem 0.75rem;
			font-size: 0.85rem;
			text-align: center;
		}

		.version-badge {
			display: inline-block;
			background: var(--accent-green);
			color: white;
			padding: 0.2rem 0.5rem;
			border-radius: 4px;
			font-size: 0.75rem;
			font-weight: 600;
			margin-left: 0.5rem;
		}

		footer {
			text-align: center;
			padding: 3rem 0 2rem;
			color: var(--text-secondary);
			font-size: 0.9rem;
		}

		footer a {
			color: var(--accent-blue);
			text-decoration: none;
		}

		footer a:hover {
			text-decoration: underline;
		}

		.footer-links {
			display: flex;
			gap: 2rem;
			justify-content: center;
			margin-bottom: 1rem;
		}

		@media (max-width: 600px) {
			h1 {
				font-size: 2rem;
			}

			.tagline {
				font-size: 1rem;
			}

			.buttons {
				flex-direction: column;
			}

			.btn {
				width: 100%;
				justify-content: center;
			}
		}
	</style>
</head>
<body>
	<div class="container">
		<header>
			<div class="logo">🔗</div>
			<h1>Schlub</h1>
			<p class="tagline">Enhanced GitHub → Discord webhook integration</p>
			<div class="buttons">
				<a href="https://github.com/Eministar/schlub" class="btn btn-secondary" target="_blank">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
					GitHub
				</a>
				<a href="https://discord.gg/JRqg6ebaas" class="btn btn-primary" target="_blank">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>
					Join Discord
				</a>
				<a href="https://github.com/Eministar/schlub/tree/main/docs" class="btn btn-secondary" target="_blank">
					📚 Docs
				</a>
			</div>
		</header>

		<div class="features">
			<div class="feature">
				<div class="feature-icon">✨</div>
				<h3>Beautiful Embeds</h3>
				<p>Rich Discord embeds with colors, fields, and emojis that make your notifications shine.</p>
			</div>
			<div class="feature">
				<div class="feature-icon">🔘</div>
				<h3>Interactive Buttons</h3>
				<p>Quick-access buttons to open PRs, view commits, releases, and more directly from Discord.</p>
			</div>
			<div class="feature">
				<div class="feature-icon">⚡</div>
				<h3>Lightning Fast</h3>
				<p>Powered by Cloudflare Workers for global edge deployment and instant delivery.</p>
			</div>
			<div class="feature">
				<div class="feature-icon">🎨</div>
				<h3>Smart Colors</h3>
				<p>Automatic color coding based on event type, status, and outcome for visual clarity.</p>
			</div>
			<div class="feature">
				<div class="feature-icon">🔒</div>
				<h3>Privacy Focused</h3>
				<p>No data stored. Your webhook payloads are processed and forwarded instantly.</p>
			</div>
			<div class="feature">
				<div class="feature-icon">🆓</div>
				<h3>100% Free</h3>
				<p>Open source and free to use. Self-host or use our public instance.</p>
			</div>
		</div>

		<div class="section">
			<h2>🚀 Quick Start</h2>

			<div class="step">
				<div class="step-number">1</div>
				<div class="step-content">
					<h4>Get your Discord Webhook URL</h4>
					<p>Go to Server Settings → Integrations → Webhooks → New Webhook</p>
				</div>
			</div>

			<div class="step">
				<div class="step-number">2</div>
				<div class="step-content">
					<h4>Extract the ID and Token</h4>
					<p>From: <code>https://discord.com/api/webhooks/{id}/{token}</code></p>
				</div>
			</div>

			<div class="step">
				<div class="step-number">3</div>
				<div class="step-content">
					<h4>Configure GitHub Webhook</h4>
					<p>Set the Payload URL in your repository settings:</p>
				</div>
			</div>

			<div class="code-block">
https://schlub.star-dev.xyz/v2/{webhookId}/{webhookToken}
			</div>

			<p style="margin-top: 1rem; color: var(--text-secondary); font-size: 0.9rem;">
				💡 <strong>Tip:</strong> Use <code>/v2/</code> for enhanced embeds with buttons and emojis. Use <code>/v1/</code> for basic embeds.
			</p>
		</div>

		<div class="section">
			<h2>📦 Supported Events <span class="version-badge">14 Events</span></h2>
			<div class="events-grid">
				<div class="event-badge">📤 Push</div>
				<div class="event-badge">🔀 Pull Request</div>
				<div class="event-badge">🟢 Issues</div>
				<div class="event-badge">⭐ Star</div>
				<div class="event-badge">👀 Watch</div>
				<div class="event-badge">🍴 Fork</div>
				<div class="event-badge">🎉 Release</div>
				<div class="event-badge">⚙️ Workflow</div>
				<div class="event-badge">📝 Review</div>
				<div class="event-badge">💬 Discussion</div>
				<div class="event-badge">🚀 Deployment</div>
				<div class="event-badge">📁 Repository</div>
				<div class="event-badge">📦 Package</div>
				<div class="event-badge">🔔 Ping</div>
			</div>
		</div>

		<div class="section">
			<h2>🆚 v1 vs v2 API</h2>
			<table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
				<thead>
					<tr style="text-align: left; border-bottom: 1px solid var(--border-color);">
						<th style="padding: 0.75rem 0;">Feature</th>
						<th style="padding: 0.75rem 0;">v1</th>
						<th style="padding: 0.75rem 0;">v2</th>
					</tr>
				</thead>
				<tbody style="color: var(--text-secondary);">
					<tr style="border-bottom: 1px solid var(--border-color);">
						<td style="padding: 0.75rem 0;">Basic Embeds</td>
						<td style="padding: 0.75rem 0;">✅</td>
						<td style="padding: 0.75rem 0;">✅</td>
					</tr>
					<tr style="border-bottom: 1px solid var(--border-color);">
						<td style="padding: 0.75rem 0;">Emoji Indicators</td>
						<td style="padding: 0.75rem 0;">❌</td>
						<td style="padding: 0.75rem 0;">✅</td>
					</tr>
					<tr style="border-bottom: 1px solid var(--border-color);">
						<td style="padding: 0.75rem 0;">Interactive Buttons</td>
						<td style="padding: 0.75rem 0;">❌</td>
						<td style="padding: 0.75rem 0;">✅</td>
					</tr>
					<tr style="border-bottom: 1px solid var(--border-color);">
						<td style="padding: 0.75rem 0;">Detailed Fields</td>
						<td style="padding: 0.75rem 0;">Basic</td>
						<td style="padding: 0.75rem 0;">Enhanced</td>
					</tr>
					<tr style="border-bottom: 1px solid var(--border-color);">
						<td style="padding: 0.75rem 0;">Timestamps</td>
						<td style="padding: 0.75rem 0;">❌</td>
						<td style="padding: 0.75rem 0;">✅</td>
					</tr>
					<tr>
						<td style="padding: 0.75rem 0;">Smart Formatting</td>
						<td style="padding: 0.75rem 0;">❌</td>
						<td style="padding: 0.75rem 0;">✅</td>
					</tr>
				</tbody>
			</table>
		</div>

		<footer>
			<div class="footer-links">
				<a href="https://github.com/Eministar/schlub" target="_blank">GitHub</a>
				<a href="https://github.com/Eministar/schlub/tree/main/docs" target="_blank">Documentation</a>
				<a href="https://discord.gg/JRqg6ebaas" target="_blank">Discord Support</a>
				<a href="https://discord.gg/JRqg6ebaas" target="_blank">Report Issue</a>
			</div>
			<p>
				Made with ❤️ by <a href="https://star-dev.xyz/" target="_blank">Eministar</a> •
				<a href="https://github.com/Eministar/schlub?tab=License-1-ov-file" target="_blank">GNU License</a>
			</p>
		</footer>
	</div>
</body>
</html>`;
}

