// Generates public/sitemap.xml from the static route list + every project id
// in src/data/portfolioData.ts. Runs on plain Node (no TS transpile needed —
// project ids are pulled out with a small regex) so it's safe to run as a
// `prebuild` step on every `npm run build` without adding a dependency.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const BASE_URL = 'https://usmankhatri.dev'
const TODAY = new Date().toISOString().split('T')[0]

const dataSource = readFileSync(resolve(root, 'src/data/portfolioData.ts'), 'utf-8')

// Pull every `id: "some-id"` inside the `projects:` array. This intentionally
// stays a light regex rather than a full TS parse — it only needs to track
// the id field, and portfolioData.ts is the single source of truth either way.
const projectsBlockMatch = dataSource.match(/projects:\s*\[([\s\S]*?)\n\s*\],\n\s*services:/)
const projectsBlock = projectsBlockMatch ? projectsBlockMatch[1] : dataSource
const idMatches = [...projectsBlock.matchAll(/id:\s*"([^"]+)"/g)].map((m) => m[1])

if (idMatches.length === 0) {
  console.warn('[generate-sitemap] No project ids found — check the regex against portfolioData.ts shape.')
}

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/works', priority: '0.9', changefreq: 'weekly' },
  { path: '/services', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'yearly' },
]

const projectRoutes = idMatches.map((id) => ({
  path: `/works/${id}`,
  priority: '0.8',
  changefreq: 'monthly',
}))

const allRoutes = [...staticRoutes, ...projectRoutes]

const urlEntries = allRoutes
  .map(
    ({ path, priority, changefreq }) => `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`

writeFileSync(resolve(root, 'public/sitemap.xml'), xml)
console.log(`[generate-sitemap] Wrote ${allRoutes.length} URLs to public/sitemap.xml (${projectRoutes.length} project routes).`)
