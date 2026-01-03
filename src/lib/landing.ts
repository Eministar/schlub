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

	<!-- Google Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

	<style>
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}

		:root {
			--bg-primary: #0a0a0f;
			--bg-secondary: #12121a;
			--bg-tertiary: #1a1a25;
			--bg-card: rgba(255, 255, 255, 0.03);
			--text-primary: #ffffff;
			--text-secondary: #a1a1aa;
			--text-muted: #71717a;
			--accent-purple: #a855f7;
			--accent-pink: #ec4899;
			--accent-blue: #3b82f6;
			--accent-cyan: #22d3ee;
			--accent-green: #22c55e;
			--accent-discord: #5865F2;
			--border-color: rgba(255, 255, 255, 0.08);
			--border-hover: rgba(255, 255, 255, 0.15);
			--glow-purple: rgba(168, 85, 247, 0.4);
			--glow-pink: rgba(236, 72, 153, 0.4);
		}

		@keyframes float {
			0%, 100% { transform: translateY(0px) rotate(0deg); }
			50% { transform: translateY(-20px) rotate(5deg); }
		}

		@keyframes pulse-glow {
			0%, 100% { opacity: 0.5; transform: scale(1); }
			50% { opacity: 0.8; transform: scale(1.05); }
		}

		@keyframes gradient-shift {
			0% { background-position: 0% 50%; }
			50% { background-position: 100% 50%; }
			100% { background-position: 0% 50%; }
		}

		@keyframes fade-in-up {
			from {
				opacity: 0;
				transform: translateY(30px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

		@keyframes fade-in {
			from { opacity: 0; }
			to { opacity: 1; }
		}

		@keyframes slide-in-left {
			from {
				opacity: 0;
				transform: translateX(-20px);
			}
			to {
				opacity: 1;
				transform: translateX(0);
			}
		}

		@keyframes bounce {
			0%, 100% { transform: translateY(0); }
			50% { transform: translateY(-10px); }
		}

		@keyframes shimmer {
			0% { background-position: -200% 0; }
			100% { background-position: 200% 0; }
		}

		@keyframes rotate {
			from { transform: rotate(0deg); }
			to { transform: rotate(360deg); }
		}

		body {
			font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
			background: var(--bg-primary);
			color: var(--text-primary);
			min-height: 100vh;
			line-height: 1.7;
			overflow-x: hidden;
		}

		/* Animated Background */
		.bg-gradient {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background:
				radial-gradient(ellipse 80% 50% at 50% -20%, rgba(168, 85, 247, 0.15), transparent),
				radial-gradient(ellipse 60% 40% at 100% 0%, rgba(236, 72, 153, 0.1), transparent),
				radial-gradient(ellipse 60% 40% at 0% 100%, rgba(59, 130, 246, 0.1), transparent);
			pointer-events: none;
			z-index: 0;
		}

		.floating-orb {
			position: fixed;
			border-radius: 50%;
			filter: blur(80px);
			pointer-events: none;
			z-index: 0;
		}

		.orb-1 {
			width: 400px;
			height: 400px;
			background: var(--glow-purple);
			top: -100px;
			right: -100px;
			animation: float 8s ease-in-out infinite;
		}

		.orb-2 {
			width: 300px;
			height: 300px;
			background: var(--glow-pink);
			bottom: -50px;
			left: -50px;
			animation: float 10s ease-in-out infinite reverse;
		}

		.orb-3 {
			width: 200px;
			height: 200px;
			background: rgba(59, 130, 246, 0.3);
			top: 50%;
			left: 50%;
			animation: pulse-glow 6s ease-in-out infinite;
		}

		.container {
			max-width: 1000px;
			margin: 0 auto;
			padding: 2rem;
			position: relative;
			z-index: 1;
		}

		header {
			text-align: center;
			padding: 6rem 0 4rem;
			animation: fade-in-up 1s ease-out;
		}

		.logo-container {
			position: relative;
			display: inline-block;
			margin-bottom: 1.5rem;
		}

		.logo {
			font-size: 5rem;
			animation: bounce 3s ease-in-out infinite;
			filter: drop-shadow(0 0 30px var(--glow-purple));
		}


		h1 {
			font-size: 4rem;
			font-weight: 800;
			background: linear-gradient(135deg, #fff 0%, var(--accent-purple) 50%, var(--accent-pink) 100%);
			background-size: 200% 200%;
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
			animation: gradient-shift 5s ease infinite;
			margin-bottom: 0.75rem;
			letter-spacing: -0.02em;
		}

		.tagline {
			font-size: 1.35rem;
			color: var(--text-secondary);
			margin-bottom: 2.5rem;
			font-weight: 400;
		}

		.tagline span {
			background: linear-gradient(90deg, var(--accent-purple), var(--accent-pink));
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
			font-weight: 600;
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
			gap: 0.6rem;
			padding: 0.9rem 1.8rem;
			border-radius: 12px;
			text-decoration: none;
			font-weight: 600;
			font-size: 0.95rem;
			transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
			border: 1px solid transparent;
			position: relative;
			overflow: hidden;
		}

		.btn::before {
			content: '';
			position: absolute;
			top: 0;
			left: -100%;
			width: 100%;
			height: 100%;
			background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
			transition: left 0.5s;
		}

		.btn:hover::before {
			left: 100%;
		}

		.btn-primary {
			background: linear-gradient(135deg, var(--accent-discord), #4752c4);
			color: white;
			box-shadow: 0 4px 20px rgba(88, 101, 242, 0.4);
		}

		.btn-primary:hover {
			transform: translateY(-3px) scale(1.02);
			box-shadow: 0 8px 30px rgba(88, 101, 242, 0.5);
		}

		.btn-secondary {
			background: var(--bg-card);
			color: var(--text-primary);
			border-color: var(--border-color);
			backdrop-filter: blur(10px);
		}

		.btn-secondary:hover {
			background: var(--bg-tertiary);
			border-color: var(--border-hover);
			transform: translateY(-3px);
			box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
		}

		.features {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
			gap: 1.5rem;
			margin: 4rem 0;
		}

		.feature {
			background: var(--bg-card);
			border: 1px solid var(--border-color);
			border-radius: 20px;
			padding: 2rem;
			transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
			backdrop-filter: blur(10px);
			position: relative;
			overflow: hidden;
			animation: fade-in-up 0.8s ease-out backwards;
		}

		.feature:nth-child(1) { animation-delay: 0.1s; }
		.feature:nth-child(2) { animation-delay: 0.2s; }
		.feature:nth-child(3) { animation-delay: 0.3s; }
		.feature:nth-child(4) { animation-delay: 0.4s; }
		.feature:nth-child(5) { animation-delay: 0.5s; }
		.feature:nth-child(6) { animation-delay: 0.6s; }

		.feature::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 2px;
			background: linear-gradient(90deg, var(--accent-purple), var(--accent-pink), var(--accent-blue));
			opacity: 0;
			transition: opacity 0.3s;
		}

		.feature:hover {
			border-color: var(--border-hover);
			transform: translateY(-8px);
			box-shadow:
				0 20px 40px rgba(0, 0, 0, 0.3),
				0 0 60px rgba(168, 85, 247, 0.1);
		}

		.feature:hover::before {
			opacity: 1;
		}

		.feature-icon {
			font-size: 2.5rem;
			margin-bottom: 1rem;
			display: inline-block;
			animation: bounce 2s ease-in-out infinite;
			animation-play-state: paused;
		}

		.feature:hover .feature-icon {
			animation-play-state: running;
		}

		.feature h3 {
			font-size: 1.15rem;
			font-weight: 700;
			margin-bottom: 0.5rem;
			color: var(--text-primary);
		}

		.feature p {
			font-size: 0.9rem;
			color: var(--text-secondary);
			line-height: 1.6;
		}

		.section {
			background: var(--bg-card);
			border: 1px solid var(--border-color);
			border-radius: 24px;
			padding: 2.5rem;
			margin: 2.5rem 0;
			backdrop-filter: blur(10px);
			animation: fade-in-up 0.8s ease-out backwards;
			position: relative;
			overflow: hidden;
		}

		.section::after {
			content: '';
			position: absolute;
			top: -50%;
			right: -50%;
			width: 100%;
			height: 100%;
			background: radial-gradient(circle, rgba(168, 85, 247, 0.05), transparent 70%);
			pointer-events: none;
		}

		.section h2 {
			font-size: 1.6rem;
			font-weight: 700;
			margin-bottom: 1.5rem;
			display: flex;
			align-items: center;
			gap: 0.75rem;
		}

		.section h2 .emoji {
			font-size: 1.8rem;
		}

		.code-block {
			background: var(--bg-primary);
			border: 1px solid var(--border-color);
			border-radius: 12px;
			padding: 1.25rem 1.5rem;
			font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
			font-size: 0.9rem;
			overflow-x: auto;
			color: var(--accent-cyan);
			position: relative;
		}

		.code-block::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: 100%;
			background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.03), transparent);
			background-size: 200% 100%;
			animation: shimmer 3s linear infinite;
			pointer-events: none;
		}

		.step {
			display: flex;
			gap: 1.25rem;
			margin: 1.75rem 0;
			animation: slide-in-left 0.5s ease-out backwards;
		}

		.step:nth-child(1) { animation-delay: 0.1s; }
		.step:nth-child(2) { animation-delay: 0.2s; }
		.step:nth-child(3) { animation-delay: 0.3s; }

		.step-number {
			width: 40px;
			height: 40px;
			background: linear-gradient(135deg, var(--accent-purple), var(--accent-pink));
			border-radius: 12px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: 700;
			flex-shrink: 0;
			box-shadow: 0 4px 15px rgba(168, 85, 247, 0.3);
		}

		.step-content h4 {
			font-weight: 600;
			margin-bottom: 0.3rem;
			font-size: 1.05rem;
		}

		.step-content p {
			color: var(--text-secondary);
			font-size: 0.9rem;
		}

		.step-content code {
			background: var(--bg-tertiary);
			padding: 0.2rem 0.5rem;
			border-radius: 6px;
			font-size: 0.85rem;
			color: var(--accent-cyan);
		}

		.events-grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
			gap: 0.75rem;
			margin-top: 1.25rem;
		}

		.event-badge {
			background: var(--bg-primary);
			border: 1px solid var(--border-color);
			border-radius: 10px;
			padding: 0.75rem 1rem;
			font-size: 0.85rem;
			text-align: center;
			transition: all 0.3s ease;
			cursor: default;
		}

		.event-badge:hover {
			border-color: var(--accent-purple);
			transform: scale(1.05);
			box-shadow: 0 0 20px rgba(168, 85, 247, 0.2);
		}

		.version-badge {
			display: inline-block;
			background: linear-gradient(135deg, var(--accent-green), #16a34a);
			color: white;
			padding: 0.3rem 0.75rem;
			border-radius: 20px;
			font-size: 0.75rem;
			font-weight: 600;
			margin-left: 0.75rem;
			box-shadow: 0 2px 10px rgba(34, 197, 94, 0.3);
		}

		.comparison-table {
			width: 100%;
			border-collapse: collapse;
			margin-top: 1.5rem;
		}

		.comparison-table th,
		.comparison-table td {
			padding: 1rem 0.75rem;
			text-align: left;
			border-bottom: 1px solid var(--border-color);
		}

		.comparison-table th {
			font-weight: 600;
			color: var(--text-primary);
		}

		.comparison-table td {
			color: var(--text-secondary);
		}

		.comparison-table tr {
			transition: background 0.2s;
		}

		.comparison-table tbody tr:hover {
			background: rgba(255, 255, 255, 0.02);
		}

		.check {
			color: var(--accent-green);
			font-size: 1.2rem;
		}

		.cross {
			color: var(--text-muted);
			font-size: 1.2rem;
		}

		.tip-box {
			margin-top: 1.5rem;
			padding: 1rem 1.25rem;
			background: rgba(168, 85, 247, 0.1);
			border: 1px solid rgba(168, 85, 247, 0.2);
			border-radius: 12px;
			color: var(--text-secondary);
			font-size: 0.9rem;
			display: flex;
			gap: 0.75rem;
			align-items: flex-start;
		}

		.tip-box .tip-icon {
			font-size: 1.2rem;
			flex-shrink: 0;
		}

		footer {
			text-align: center;
			padding: 4rem 0 3rem;
			color: var(--text-secondary);
			font-size: 0.9rem;
			animation: fade-in 1s ease-out;
		}

		footer a {
			color: var(--text-primary);
			text-decoration: none;
			transition: color 0.2s;
		}

		footer a:hover {
			color: var(--accent-purple);
		}

		.footer-links {
			display: flex;
			gap: 2.5rem;
			justify-content: center;
			margin-bottom: 1.5rem;
			flex-wrap: wrap;
		}

		.footer-links a {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			padding: 0.5rem 1rem;
			border-radius: 8px;
			transition: all 0.2s;
		}

		.footer-links a:hover {
			background: var(--bg-card);
		}

		.made-with {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;
		}

		.made-with .heart {
			color: #ef4444;
			animation: pulse-glow 1.5s ease-in-out infinite;
		}

		/* Scrollbar Styling */
		::-webkit-scrollbar {
			width: 8px;
			height: 8px;
		}

		::-webkit-scrollbar-track {
			background: var(--bg-secondary);
		}

		::-webkit-scrollbar-thumb {
			background: var(--border-color);
			border-radius: 4px;
		}

		::-webkit-scrollbar-thumb:hover {
			background: var(--border-hover);
		}

		@media (max-width: 600px) {
			header {
				padding: 4rem 0 2rem;
			}

			h1 {
				font-size: 2.5rem;
			}

			.logo {
				font-size: 3.5rem;
			}

			.tagline {
				font-size: 1.1rem;
			}

			.buttons {
				flex-direction: column;
			}

			.btn {
				width: 100%;
				justify-content: center;
			}

			.section {
				padding: 1.5rem;
			}

			.footer-links {
				gap: 1rem;
			}
		}
	</style>
</head>
<body>
	<div class="bg-gradient"></div>
	<div class="floating-orb orb-1"></div>
	<div class="floating-orb orb-2"></div>
	<div class="floating-orb orb-3"></div>

	<div class="container">
		<header>
			<div class="logo-container">
				<div class="logo">🔗</div>
			</div>
			<h1>Schlub</h1>
			<p class="tagline">Beautiful <span>GitHub → Discord</span> webhook integration</p>
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
					📚 Documentation
				</a>
			</div>
		</header>

		<div class="features">
			<div class="feature">
				<div class="feature-icon">✨</div>
				<h3>Beautiful Embeds</h3>
				<p>Rich Discord embeds with vibrant colors, custom fields, and expressive emojis.</p>
			</div>
			<div class="feature">
				<div class="feature-icon">🔘</div>
				<h3>Interactive Buttons</h3>
				<p>One-click access to PRs, commits, releases, and more — right from Discord.</p>
			</div>
			<div class="feature">
				<div class="feature-icon">⚡</div>
				<h3>Lightning Fast</h3>
				<p>Powered by Cloudflare Workers at the edge. Global. Instant. Reliable.</p>
			</div>
			<div class="feature">
				<div class="feature-icon">🎨</div>
				<h3>Smart Colors</h3>
				<p>Automatic color coding based on event type, status, and outcome.</p>
			</div>
			<div class="feature">
				<div class="feature-icon">🔒</div>
				<h3>Privacy First</h3>
				<p>Zero data storage. Your webhooks are processed and forwarded instantly.</p>
			</div>
			<div class="feature">
				<div class="feature-icon">💎</div>
				<h3>100% Free & Open</h3>
				<p>Open source forever. Self-host or use our public instance.</p>
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
			<h2>📦 Supported Events <span class="version-badge">19 Events</span></h2>
			<div class="events-grid">
				<div class="event-badge">📤 Push</div>
				<div class="event-badge">🔀 Pull Request</div>
				<div class="event-badge">🟢 Issues</div>
				<div class="event-badge">💬 Comments</div>
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
				<div class="event-badge">🌿 Branch</div>
				<div class="event-badge">🏷️ Tag</div>
				<div class="event-badge">👥 Member</div>
				<div class="event-badge">💻 Commit</div>
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
				<a href="https://github.com/Eministar/schlub" target="_blank">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
					GitHub
				</a>
				<a href="https://github.com/Eministar/schlub/tree/main/docs" target="_blank">
					📚 Docs
				</a>
				<a href="https://discord.gg/JRqg6ebaas" target="_blank">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z"/></svg>
					Discord
				</a>
				<a href="https://github.com/Eministar/schlub/issues" target="_blank">
					🐛 Issues
				</a>
			</div>
			<p class="made-with">
				Made with <span class="heart">❤️</span> by <a href="https://star-dev.xyz/" target="_blank">Eministar</a> •
				<a href="https://github.com/Eministar/schlub?tab=License-1-ov-file" target="_blank">GNU License</a>
			</p>
		</footer>
	</div>
</body>
</html>`;
}

