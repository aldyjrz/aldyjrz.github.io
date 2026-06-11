# Cloudflare Deployment Guide (Wrangler Full-Stack)

## Prerequisites
- Cloudflare account (https://dash.cloudflare.com)
- Node.js 18+ installed
- Wrangler CLI installed (`npm install -g wrangler`)

## Step-by-Step Deployment

### 1. Setup Cloudflare Resources

#### Create KV Namespace (untuk data storage)
```bash
wrangler kv:namespace create portfolio-data
wrangler kv:namespace create portfolio-data --preview
```

Catat namespace ID dan preview ID, kemudian update di `wrangler.toml`:
```toml
[[kv_namespaces]]
binding = "DB"
id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
preview_id = "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy"
```

#### Create R2 Bucket (untuk upload files)
```bash
wrangler r2 bucket create portfolio-uploads
wrangler r2 bucket create portfolio-uploads-preview
```

Update di `wrangler.toml`:
```toml
[[r2_buckets]]
binding = "BUCKET"
bucket_name = "portfolio-uploads"
preview_bucket_name = "portfolio-uploads-preview"
```

### 2. Login ke Cloudflare
```bash
wrangler login
```

### 3. Test Locally
```bash
# Install dependencies
npm install

# Run dev server (akan berjalan di http://localhost:8787)
npm run dev
```

### 4. Deploy ke Production
```bash
npm run deploy
```

## Struktur Project

```
portfolio-monorepo/
├── client/                 # Vue 3 + Vite frontend
│   ├── src/
│   └── vite.config.js
├── server/
│   ├── src/
│   │   └── index.js       # Cloudflare Workers handler
│   ├── package.json
│   └── wrangler.toml (di root)
├── wrangler.toml          # Main Wrangler config
└── package.json           # Root workspace config
```

## API Endpoints

Setelah deploy, API akan tersedia di: `https://your-worker-url.workers.dev/api/`

- `GET /api/portfolio` - Get semua data
- `GET /api/profile` - Get profile data
- `PUT /api/profile` - Update profile
- `POST /api/profile/photo` - Upload profile photo
- `GET /api/projects` - Get projects
- `PUT /api/projects` - Update projects
- `GET /api/skills` - Get skills
- `PUT /api/skills` - Update skills
- `GET /api/experience` - Get experience
- `PUT /api/experience` - Update experience
- `GET /api/contact` - Get contact info
- `PUT /api/contact` - Update contact info
- `GET /health` - Health check

## Update Frontend API URL

Di `client/src/`, update API base URL ke Workers URL:

```javascript
const API_URL = 'https://your-worker-url.workers.dev';

// Contoh di Vue component:
fetch(`${API_URL}/api/portfolio`)
```

## Environment Variables

Untuk production environment, update di `wrangler.toml`:

```toml
[env.production]
name = "portfolio-api-prod"
```

Deploy ke production:
```bash
wrangler deploy --env production
```

## Database Management

Data disimpan di Cloudflare KV. Untuk manage:

```bash
# List semua keys
wrangler kv:key list --namespace-id=YOUR_ID

# Get value
wrangler kv:key get "portfolio" --namespace-id=YOUR_ID

# Delete key
wrangler kv:key delete "portfolio" --namespace-id=YOUR_ID
```

## Troubleshooting

### Port sudah digunakan
```bash
wrangler dev --port 8788
```

### Clear cache
```bash
wrangler deploy --compatibility-flags nodejs_compat
```

### View logs
```bash
wrangler tail
```

## Pricing

- **Workers**: 100,000 requests/day free, $0.50/million requests
- **KV**: 1GB free, $0.50/GB
- **R2**: First 10GB free, $0.015/GB

## Next Steps

1. Update client API URLs
2. Test locally dengan `npm run dev`
3. Deploy dengan `npm run deploy`
4. Update domain/routing di Cloudflare
5. Setup CI/CD dengan GitHub Actions (optional)

## Support

- Docs: https://developers.cloudflare.com/workers
- Community: https://discord.gg/cloudflaredev
