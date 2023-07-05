import { loadEnv } from 'vite'
import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import sanity from 'astro-sanity'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'

const {
	PUBLIC_SANITY_PROJECT_ID,
	PUBLIC_SANITY_DATASET,
	PUBLIC_SANITY_API_VERSION,
	PUBLIC_SANITY_API_TOKEN,
	PUBLIC_SITE_URL,
	PUBLIC_ENV,
} = loadEnv(import.meta.env.MODE, process.cwd(), '')

const astroConfig = {
	site: PUBLIC_SITE_URL,
	integrations: [
		sitemap(),
		sanity({
			projectId: PUBLIC_SANITY_PROJECT_ID,
			dataset: PUBLIC_SANITY_DATASET,
			apiVersion: PUBLIC_SANITY_API_VERSION,
			token: PUBLIC_SANITY_API_TOKEN,
			useCdn: PUBLIC_ENV !== 'staging', // must be false for 'previewDrafts'
			perspective: PUBLIC_ENV !== 'staging' ? 'published' : 'previewDrafts', // 'raw' | 'published' | 'previewDrafts'
		}),
		vue(),
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
	],
}

const ssrConfig = {
	...astroConfig,
	output: 'server',
	adapter: vercel(),
}

// https://astro.build/config
export default defineConfig(PUBLIC_ENV === 'staging' ? ssrConfig : astroConfig)
