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
	<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">
	<link rel="canonical" href="https://schlub.star-dev.xyz/">
	<meta name="theme-color" content="#5865F2">

	<!-- Open Graph -->
	<meta property="og:title" content="Schlub — GitHub → Discord Webhooks">
	<meta property="og:description" content="Enhanced GitHub to Discord webhook integration with beautiful embeds, buttons, and more.">
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://schlub.star-dev.xyz">
	<meta property="og:site_name" content="Schlub">
	<meta property="og:locale" content="en_US">
	<meta property="og:image" content="https://schlub.star-dev.xyz/og.png">

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="Schlub — GitHub → Discord Webhooks">
	<meta name="twitter:description" content="Enhanced GitHub to Discord webhook integration with beautiful embeds, buttons, and more.">
	<meta name="twitter:image" content="https://schlub.star-dev.xyz/og.png">

	<!-- Google Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		"name": "Schlub",
		"applicationCategory": "DeveloperApplication",
		"operatingSystem": "Web",
		"url": "https://schlub.star-dev.xyz/",
		"description": "Enhanced GitHub to Discord webhook integration with beautiful embeds, buttons, and more.",
		"offers": {
			"@type": "Offer",
			"price": "0",
			"priceCurrency": "USD"
		},
		"creator": {
			"@type": "Person",
			"name": "Eministar"
		}
	}
	</script>

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

		.builder-layout {
			display: grid;
			grid-template-columns: 1.2fr 0.8fr;
			gap: 1.25rem;
		}

		.builder-controls {
			background: var(--bg-primary);
			border: 1px solid var(--border-color);
			border-radius: 16px;
			padding: 1.25rem;
		}

		.builder-preview {
			background: var(--bg-primary);
			border: 1px solid var(--border-color);
			border-radius: 16px;
			padding: 1.25rem;
		}

		.builder-grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 0.75rem;
			margin-bottom: 1rem;
		}

		.builder-field {
			display: flex;
			flex-direction: column;
			gap: 0.35rem;
		}

		.builder-field label {
			font-size: 0.8rem;
			color: var(--text-secondary);
		}

		.builder-field input, .builder-field select, .builder-field textarea {
			width: 100%;
			background: var(--bg-tertiary);
			border: 1px solid var(--border-color);
			color: var(--text-primary);
			border-radius: 10px;
			padding: 0.65rem 0.75rem;
			font-size: 0.9rem;
		}

		.builder-field textarea {
			min-height: 88px;
			resize: vertical;
			font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
		}

		.builder-actions {
			display: flex;
			gap: 0.75rem;
			flex-wrap: wrap;
			margin-top: 0.75rem;
		}

		.builder-actions button {
			background: linear-gradient(135deg, var(--accent-discord), #4752c4);
			border: 0;
			color: #fff;
			border-radius: 10px;
			padding: 0.65rem 1rem;
			font-weight: 600;
			cursor: pointer;
		}

		.builder-actions button.secondary {
			background: var(--bg-tertiary);
			border: 1px solid var(--border-color);
		}

		.preview-card {
			background: #1f2937;
			border: 1px solid var(--border-color);
			border-left: 5px solid #5865f2;
			border-radius: 12px;
			padding: 1rem;
		}

		.preview-title {
			font-weight: 700;
			margin-bottom: 0.5rem;
		}

		.preview-description {
			color: #d1d5db;
			font-size: 0.9rem;
			margin-bottom: 0.75rem;
		}

		.preview-field {
			font-size: 0.85rem;
			color: #d1d5db;
			margin-bottom: 0.35rem;
		}

		.builder-table {
			margin-top: 1rem;
			max-height: 240px;
			overflow-y: auto;
			border: 1px solid var(--border-color);
			border-radius: 12px;
		}

		.builder-table table {
			width: 100%;
			border-collapse: collapse;
		}

		.builder-table th, .builder-table td {
			padding: 0.45rem 0.6rem;
			font-size: 0.8rem;
			text-align: left;
			border-bottom: 1px solid var(--border-color);
		}

		.builder-table input {
			width: 100%;
			background: var(--bg-tertiary);
			border: 1px solid var(--border-color);
			color: var(--text-primary);
			border-radius: 8px;
			padding: 0.35rem 0.45rem;
			font-size: 0.78rem;
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

			.builder-layout {
				grid-template-columns: 1fr;
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

		<div class="section" id="embed-styler">
			<h2>🎛️ v2 Embed Styler Builder</h2>
			<p style="color: var(--text-secondary); margin-bottom: 1rem;">
				Design color and emoji per GitHub event, preview the result, then copy one long v2 URL with all style attributes.
			</p>
			<div class="builder-layout">
				<div class="builder-controls">
					<div class="builder-grid">
						<div class="builder-field" style="grid-column: 1 / span 2;">
							<label for="builderWebhookInput">Discord Webhook URL or Schlub URL</label>
							<input id="builderWebhookInput" type="text" placeholder="https://discord.com/api/webhooks/{id}/{token}">
						</div>
						<div class="builder-field">
							<label for="builderGlobalEmoji">Global Emoji (all events)</label>
							<input id="builderGlobalEmoji" type="text" placeholder="🚀">
						</div>
						<div class="builder-field">
							<label for="builderGlobalColor">Global Color (hex)</label>
							<input id="builderGlobalColor" type="text" placeholder="#5865F2">
						</div>
						<div class="builder-field">
							<label for="builderPresetSelect">Preset</label>
							<select id="builderPresetSelect"></select>
						</div>
						<div class="builder-field">
							<label for="builderEventSelect">Preview Event</label>
							<select id="builderEventSelect"></select>
						</div>
						<div class="builder-field">
							<label for="builderEventEmoji">Event Emoji</label>
							<input id="builderEventEmoji" type="text" placeholder="🔀">
						</div>
						<div class="builder-field">
							<label for="builderEventColor">Event Color</label>
							<input id="builderEventColor" type="text" placeholder="#8957E5">
						</div>
						<div class="builder-field" style="grid-column: 1 / span 2;">
							<label for="builderOutputUrl">Generated v2 URL</label>
							<textarea id="builderOutputUrl" readonly></textarea>
						</div>
					</div>
					<div class="builder-actions">
						<button id="builderApplyPreset" class="secondary" type="button">Apply Preset</button>
						<button id="builderParseWebhook" type="button">Parse Webhook</button>
						<button id="builderCopyUrl" type="button">Copy URL</button>
						<button id="builderReset" class="secondary" type="button">Reset Styles</button>
					</div>
					<div class="builder-table">
						<table>
							<thead>
								<tr>
									<th>Event</th>
									<th>Emoji</th>
									<th>Color</th>
								</tr>
							</thead>
							<tbody id="builderEventTableBody"></tbody>
						</table>
					</div>
				</div>
				<div class="builder-preview">
					<div id="builderPreviewCard" class="preview-card">
						<div id="builderPreviewTitle" class="preview-title"></div>
						<div id="builderPreviewDescription" class="preview-description"></div>
						<div id="builderPreviewFields"></div>
					</div>
				</div>
			</div>
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
	<script>
		(() => {
			const events = [
				{ key: 'push', label: 'Push', emoji: '📤', color: '#238636', title: 'Pushed 3 commits to owner/repo', description: '[\`a1b2c3d\`](#) \`fix ci pipeline\` — dev-user' },
				{ key: 'pull_request', label: 'Pull Request', emoji: '🔀', color: '#238636', title: 'Opened PR #42: Add embed styler', description: 'New pull request with preview controls' },
				{ key: 'issues', label: 'Issues', emoji: '🟢', color: '#238636', title: 'Opened issue owner/repo#128', description: 'Issue report with context and labels' },
				{ key: 'issue_comment', label: 'Issue Comment', emoji: '💬', color: '#539BF5', title: 'New comment on PR #42', description: 'Looks good, but we should improve error handling.' },
				{ key: 'commit_comment', label: 'Commit Comment', emoji: '💻', color: '#539BF5', title: 'New comment on commit 1a2b3c4', description: 'Comment on a specific commit line.' },
				{ key: 'release', label: 'Release', emoji: '🎉', color: '#1F6FEB', title: 'Published release v2.0.0', description: 'Major update with new builder and SEO.' },
				{ key: 'workflow_run', label: 'Workflow Run', emoji: '✅', color: '#238636', title: 'Workflow \"CI\" Success', description: 'Build and tests completed successfully.' },
				{ key: 'pull_request_review', label: 'PR Review', emoji: '📝', color: '#238636', title: 'Review Approved on PR #42', description: 'Review includes notes and follow-ups.' },
				{ key: 'discussion', label: 'Discussion', emoji: '💬', color: '#539BF5', title: 'New discussion: Embed Styling Ideas', description: 'Collecting ideas for custom theming.' },
				{ key: 'deployment_status', label: 'Deployment', emoji: '🚀', color: '#1F6FEB', title: 'Deployment to production', description: 'State: \`Success\`' },
				{ key: 'repository', label: 'Repository', emoji: '📁', color: '#1F6FEB', title: 'Repository updated', description: 'Visibility or metadata changed.' },
				{ key: 'package', label: 'Package', emoji: '📦', color: '#1F6FEB', title: 'Package published', description: 'New package revision is available.' },
				{ key: 'create', label: 'Create', emoji: '✨', color: '#238636', title: 'Created branch feature/embed-styler', description: 'A new branch or tag was created.' },
				{ key: 'delete', label: 'Delete', emoji: '🗑️', color: '#DA3633', title: 'Deleted branch legacy-v1', description: 'Cleanup action in repository refs.' },
				{ key: 'member', label: 'Member', emoji: '👥', color: '#238636', title: 'Member added to repository', description: 'New collaborator permissions granted.' },
				{ key: 'star', label: 'Star', emoji: '⭐', color: '#E3B341', title: 'Repository starred', description: 'Someone starred this project.' },
				{ key: 'watch', label: 'Watch', emoji: '👀', color: '#F0883E', title: 'Repository watched', description: 'Someone subscribed to notifications.' },
				{ key: 'fork', label: 'Fork', emoji: '🍴', color: '#768390', title: 'Repository forked', description: 'A new fork was created.' },
				{ key: 'ping', label: 'Ping', emoji: '🔔', color: '#5865F2', title: 'Webhook ping', description: 'Webhook handshake succeeded.' },
			];

			const byId = (id) => document.getElementById(id);
			const STORAGE_KEY = 'schlub_v2_builder_state';
			const webhookInput = byId('builderWebhookInput');
			const globalEmojiInput = byId('builderGlobalEmoji');
			const globalColorInput = byId('builderGlobalColor');
			const presetSelect = byId('builderPresetSelect');
			const eventSelect = byId('builderEventSelect');
			const eventEmojiInput = byId('builderEventEmoji');
			const eventColorInput = byId('builderEventColor');
			const outputUrl = byId('builderOutputUrl');
			const eventTableBody = byId('builderEventTableBody');
			const previewCard = byId('builderPreviewCard');
			const previewTitle = byId('builderPreviewTitle');
			const previewDescription = byId('builderPreviewDescription');
			const previewFields = byId('builderPreviewFields');

			const eventStyles = {};
			for (const event of events) {
				eventStyles[event.key] = { emoji: '', color: '' };
			}

			const presets = {
				custom: { label: 'Custom', globalEmoji: '', globalColor: '', events: {} },
				github_classic: {
					label: 'GitHub Classic',
					globalEmoji: '',
					globalColor: '#5865F2',
					events: {
						pull_request: { emoji: '🔀', color: '#238636' },
						issues: { emoji: '🟢', color: '#238636' },
						workflow_run: { emoji: '✅', color: '#238636' },
						deployment_status: { emoji: '🚀', color: '#1F6FEB' },
						delete: { emoji: '🗑️', color: '#DA3633' },
					},
				},
				neon: {
					label: 'Neon',
					globalEmoji: '⚡',
					globalColor: '#00E5FF',
					events: {
						push: { emoji: '⚡', color: '#00E5FF' },
						pull_request: { emoji: '🧪', color: '#39FF14' },
						issues: { emoji: '🎯', color: '#FF00A8' },
						workflow_run: { emoji: '🛰️', color: '#8B5CF6' },
						release: { emoji: '🌈', color: '#F59E0B' },
					},
				},
				minimal: {
					label: 'Minimal',
					globalEmoji: '',
					globalColor: '#9CA3AF',
					events: {
						push: { emoji: '·', color: '#6B7280' },
						pull_request: { emoji: '·', color: '#6B7280' },
						issues: { emoji: '·', color: '#6B7280' },
						release: { emoji: '·', color: '#6B7280' },
					},
				},
			};

			let webhookId = '';
			let webhookToken = '';

			function saveState() {
				try {
					const data = {
						webhookInput: webhookInput.value,
						webhookId: webhookId,
						webhookToken: webhookToken,
						globalEmoji: globalEmojiInput.value,
						globalColor: globalColorInput.value,
						selectedPreset: presetSelect.value,
						selectedEvent: eventSelect.value,
						eventStyles: eventStyles,
					};
					localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
				} catch (error) {}
			}

			function loadState() {
				try {
					const raw = localStorage.getItem(STORAGE_KEY);
					if (!raw) return;
					const data = JSON.parse(raw);
					if (!data || typeof data !== 'object') return;

					if (typeof data.webhookInput === 'string') webhookInput.value = data.webhookInput;
					if (typeof data.webhookId === 'string') webhookId = data.webhookId;
					if (typeof data.webhookToken === 'string') webhookToken = data.webhookToken;
					if (typeof data.globalEmoji === 'string') globalEmojiInput.value = data.globalEmoji;
					if (typeof data.globalColor === 'string') globalColorInput.value = data.globalColor;
					if (typeof data.selectedPreset === 'string' && presets[data.selectedPreset]) presetSelect.value = data.selectedPreset;

					if (data.eventStyles && typeof data.eventStyles === 'object') {
						for (const event of events) {
							const saved = data.eventStyles[event.key];
							if (!saved || typeof saved !== 'object') continue;
							eventStyles[event.key].emoji = typeof saved.emoji === 'string' ? saved.emoji : '';
							eventStyles[event.key].color = typeof saved.color === 'string' ? saved.color : '';
						}
					}

					if (typeof data.selectedEvent === 'string' && eventStyles[data.selectedEvent]) {
						eventSelect.value = data.selectedEvent;
					}
				} catch (error) {}
			}

			function applyPreset(presetKey) {
				const preset = presets[presetKey];
				if (!preset) return;

				globalEmojiInput.value = preset.globalEmoji || '';
				globalColorInput.value = preset.globalColor || '';

				for (const event of events) {
					const style = preset.events[event.key] || {};
					eventStyles[event.key].emoji = style.emoji || '';
					eventStyles[event.key].color = style.color || '';
				}

				renderEventTable();
				syncEventInputs();
				buildUrl();
				updatePreview();
				saveState();
			}

			function parseWebhookSource(raw) {
				const value = (raw || '').trim();
				if (!value) return null;

				const webhookMatch = value.match(/\\/api\\/webhooks\\/([^\\/\\s]+)\\/([^\\/?\\s]+)/i);
				if (webhookMatch) {
					return { id: webhookMatch[1], token: webhookMatch[2] };
				}

				const schlubMatch = value.match(/\\/(?:v1|v2)\\/([^\\/\\s]+)\\/([^\\/?\\s]+)/i);
				if (schlubMatch) {
					return { id: schlubMatch[1], token: schlubMatch[2] };
				}

				return null;
			}

			function validColor(value) {
				return /^#?[0-9a-fA-F]{6}$/.test((value || '').trim());
			}

			function normalizeColor(value) {
				const raw = (value || '').trim();
				if (!raw) return '';
				if (!validColor(raw)) return '';
				return raw.startsWith('#') ? raw : '#' + raw;
			}

			function buildQuery() {
				const params = new URLSearchParams();
				const globalEmoji = globalEmojiInput.value.trim();
				const globalColor = normalizeColor(globalColorInput.value);

				if (globalEmoji) params.set('style_all_emoji', globalEmoji);
				if (globalColor) params.set('style_all_color', globalColor);

				for (const event of events) {
					const style = eventStyles[event.key];
					const emoji = (style.emoji || '').trim();
					const color = normalizeColor(style.color || '');
					if (emoji) params.set('style_' + event.key + '_emoji', emoji);
					if (color) params.set('style_' + event.key + '_color', color);
				}

				return params.toString();
			}

			function buildUrl() {
				const base = window.location.origin;
				if (!webhookId || !webhookToken) {
					outputUrl.value = base + '/v2/{webhookId}/{webhookToken}';
					return;
				}

				const query = buildQuery();
				outputUrl.value = base + '/v2/' + webhookId + '/' + webhookToken + (query ? '?' + query : '');
			}

			function updatePreview() {
				const eventKey = eventSelect.value;
				const event = events.find((entry) => entry.key === eventKey) || events[0];
				const style = eventStyles[event.key];

				const emoji = (style.emoji || '').trim() || globalEmojiInput.value.trim() || event.emoji;
				const color = normalizeColor(style.color || '') || normalizeColor(globalColorInput.value) || event.color;

				previewCard.style.borderLeftColor = color;
				previewTitle.textContent = emoji + ' ' + event.title;
				previewDescription.textContent = event.description;

				previewFields.innerHTML = [
					'<div class=\"preview-field\"><strong>Status:</strong> \`Open\`</div>',
					'<div class=\"preview-field\"><strong>Branch:</strong> \`main\`</div>',
					'<div class=\"preview-field\"><strong>Commit:</strong> [\`abc1234\`](#) \`refactor embed builder\`</div>',
				].join('');
			}

			function syncEventInputs() {
				const style = eventStyles[eventSelect.value];
				eventEmojiInput.value = style.emoji || '';
				eventColorInput.value = style.color || '';
			}

			function renderEventTable() {
				eventTableBody.innerHTML = events.map((event) => {
					const emojiValue = (eventStyles[event.key].emoji || '').replace(/\"/g, '&quot;');
					const colorValue = (eventStyles[event.key].color || '').replace(/\"/g, '&quot;');
					return '<tr>'
						+ '<td>' + event.label + '</td>'
						+ '<td><input data-key=\"' + event.key + '\" data-field=\"emoji\" value=\"' + emojiValue + '\"></td>'
						+ '<td><input data-key=\"' + event.key + '\" data-field=\"color\" value=\"' + colorValue + '\" placeholder=\"#5865F2\"></td>'
						+ '</tr>';
				}).join('');
			}

			function attachTableListeners() {
				eventTableBody.addEventListener('input', (event) => {
					const target = event.target;
					if (!(target instanceof HTMLInputElement)) return;

					const key = target.dataset.key;
					const field = target.dataset.field;
					if (!key || !field || !eventStyles[key]) return;

					presetSelect.value = 'custom';
					eventStyles[key][field] = target.value;
					if (key === eventSelect.value) {
						syncEventInputs();
					}
					buildUrl();
					updatePreview();
					saveState();
				});
			}

			function bootstrapEventSelect() {
				eventSelect.innerHTML = events.map((event) => '<option value=\"' + event.key + '\">' + event.label + '</option>').join('');
				eventSelect.addEventListener('change', () => {
					syncEventInputs();
					updatePreview();
					saveState();
				});
			}

			function installHandlers() {
				byId('builderApplyPreset').addEventListener('click', () => {
					applyPreset(presetSelect.value);
				});

				byId('builderParseWebhook').addEventListener('click', () => {
					const parsed = parseWebhookSource(webhookInput.value);
					if (!parsed) return;
					webhookId = parsed.id;
					webhookToken = parsed.token;
					buildUrl();
					saveState();
				});

				byId('builderCopyUrl').addEventListener('click', async () => {
					try {
						await navigator.clipboard.writeText(outputUrl.value);
					} catch (error) {
						outputUrl.select();
						document.execCommand('copy');
					}
				});

				byId('builderReset').addEventListener('click', () => {
					globalEmojiInput.value = '';
					globalColorInput.value = '';
					presetSelect.value = 'custom';
					for (const event of events) {
						eventStyles[event.key].emoji = '';
						eventStyles[event.key].color = '';
					}
					renderEventTable();
					syncEventInputs();
					buildUrl();
					updatePreview();
					saveState();
				});

				webhookInput.addEventListener('input', () => {
					const parsed = parseWebhookSource(webhookInput.value);
					if (parsed) {
						webhookId = parsed.id;
						webhookToken = parsed.token;
					} else if (!webhookInput.value.trim()) {
						webhookId = '';
						webhookToken = '';
					}
					buildUrl();
					saveState();
				});

				globalEmojiInput.addEventListener('input', () => {
					buildUrl();
					updatePreview();
					saveState();
				});

				globalColorInput.addEventListener('input', () => {
					buildUrl();
					updatePreview();
					saveState();
				});

				presetSelect.addEventListener('change', () => {
					if (presetSelect.value !== 'custom') {
						applyPreset(presetSelect.value);
						return;
					}
					saveState();
				});

				eventEmojiInput.addEventListener('input', () => {
					presetSelect.value = 'custom';
					eventStyles[eventSelect.value].emoji = eventEmojiInput.value;
					renderEventTable();
					buildUrl();
					updatePreview();
					saveState();
				});

				eventColorInput.addEventListener('input', () => {
					presetSelect.value = 'custom';
					eventStyles[eventSelect.value].color = eventColorInput.value;
					renderEventTable();
					buildUrl();
					updatePreview();
					saveState();
				});
			}

			function bootstrapPresetSelect() {
				const keys = Object.keys(presets);
				presetSelect.innerHTML = keys.map((key) => '<option value=\"' + key + '\">' + presets[key].label + '</option>').join('');
				presetSelect.value = 'custom';
			}

			bootstrapEventSelect();
			bootstrapPresetSelect();
			loadState();
			renderEventTable();
			attachTableListeners();
			installHandlers();
			syncEventInputs();
			buildUrl();
			updatePreview();
			saveState();
		})();
	</script>
</body>
</html>`;
}
