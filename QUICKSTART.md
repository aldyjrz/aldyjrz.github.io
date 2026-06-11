# 🚀 Cloudflare Wrangler Deployment - Quick Start

## 5 Menit Setup

### 1. Install Wrangler Globally
```bash
npm install -g wrangler
```

### 2. Login ke Cloudflare
```bash
wrangler login
```

### 3. Create KV Namespaces
```bash
# Untuk development
wrangler kv:namespace create portfolio-data --preview

# Catat ID-nya dan update di wrangler.toml
```

### 4. Create R2 Buckets
```bash
# Untuk development
wrangler r2 bucket create portfolio-uploads-preview
```

### 5. Update `wrangler.toml`
Ganti ID-nya dengan yang didapat:
```toml
[[kv_namespaces]]
binding = "DB"
id = "YOUR_KV_ID_HERE"
preview_id = "YOUR_KV_PREVIEW_ID_HERE"

[[r2_buckets]]
binding = "BUCKET"
bucket_name = "portfolio-uploads"
preview_bucket_name = "portfolio-uploads-preview"
```

### 6. Install Dependencies
```bash
npm install
```

### 7. Test Locally
```bash
npm run dev:server
# Buka http://localhost:8787
```

### 8. Deploy
```bash
npm run deploy
```

## Struktur File

```
📦 server/src/index.js
├─ Workers handler utama
├─ Semua API endpoints
└─ KV + R2 integration

📄 wrangler.toml
├─ Konfigurasi Workers
├─ KV namespaces
└─ R2 buckets

📄 package.json
├─ npm scripts untuk dev/deploy
└─ Dependencies (itty-router)
```

## API Endpoints

Setelah deploy, gunakan:
```
https://your-project.your-account.workers.dev/api/...
```

## Deployment Otomatis (GitHub Actions)

1. Add secrets di GitHub:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`

2. Push ke main branch, workflow jalan otomatis

## Troubleshooting

### KV tidak terisi?
```bash
# Check KV contents
wrangler kv:key list --namespace-id=YOUR_ID
```

### Mau reset data?
```bash
wrangler kv:key delete portfolio --namespace-id=YOUR_ID
```

### Perlu test production config?
```bash
npm run deploy:prod
```

## Dokumentasi Lengkap

Lihat `CLOUDFLARE_DEPLOYMENT.md` untuk guide detail
