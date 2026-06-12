# Deployment

Friday's Fragrances is a Vite + React static SPA. It builds to `dist/` and is
served by nginx. Production currently runs on a DigitalOcean droplet at
`68.183.132.208`.

## Build + publish to the server

```bash
SERVER=root@68.183.132.208 ./deploy/deploy.sh
```

This rsyncs the working tree to `/opt/fridays-src`, runs `npm ci && npm run build`
on the box, and copies `dist/` into `/var/www/fridays`.

## Environment

Firebase config lives in `/opt/fridays-src/.env.local` on the server
(git-ignored, `chmod 600`). The `VITE_FIREBASE_*` values are baked into the
client bundle at build time. The Firebase web API key is public by design;
security comes from the rules below, not from hiding the key.

## nginx

`deploy/nginx-fridays.conf` is the production site config (port 80 + interim
self-signed TLS on 443, security headers, SPA fallback, dotfile deny). It uses
`server_name _` as a placeholder.

### Attaching a domain

1. Point the domain's A record at `68.183.132.208` (and `www`).
2. Set `server_name your-domain www.your-domain;` in the nginx config.
3. `apt install -y certbot python3-certbot-nginx`
4. `certbot --nginx -d your-domain -d www.your-domain` — installs a real
   Let's Encrypt cert, adds HTTP->HTTPS redirect + HSTS, and auto-renews.

## Firebase security rules

Rules are version-controlled in `firestore.rules` and `storage.rules`.

Deploy with the Firebase CLI:

```bash
npm i -g firebase-tools
firebase login
firebase deploy --only firestore:rules,storage
```

Or paste them in the Firebase Console (Firestore -> Rules, Storage -> Rules).

The admin order list (`getAllOrders`) requires an `admin: true` custom claim on
the account, set via the Admin SDK.

## Server hardening applied

- ufw: only 22 / 80 / 443 open
- fail2ban (sshd jail) against brute force
- unattended-upgrades for automatic security patches
- kernel/network sysctl hardening (`/etc/sysctl.d/99-hardening.conf`)
- sshd limits (`/etc/ssh/sshd_config.d/99-hardening.conf`) - password login kept
- nginx `server_tokens off`, security headers, dotfile deny
