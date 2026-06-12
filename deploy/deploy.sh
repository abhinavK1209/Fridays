#!/usr/bin/env bash
# Rsync this working tree to the server, build there, and publish to the nginx web root.
# Usage: SERVER=root@68.183.132.208 ./deploy/deploy.sh
set -euo pipefail

SERVER="${SERVER:-root@68.183.132.208}"
SRC_DIR="${SRC_DIR:-/opt/fridays-src}"
WEB_ROOT="${WEB_ROOT:-/var/www/fridays}"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo ">> syncing source to ${SERVER}:${SRC_DIR}"
rsync -az --delete \
  --exclude node_modules --exclude .git --exclude dist \
  "${HERE}/" "${SERVER}:${SRC_DIR}/"

echo ">> building and publishing on server"
ssh "${SERVER}" "set -e
  cd ${SRC_DIR}
  npm ci --no-audit --no-fund
  npm run build
  rm -rf ${WEB_ROOT:?}/*
  cp -r dist/* ${WEB_ROOT}/
  chown -R www-data:www-data ${WEB_ROOT}
  nginx -t && systemctl reload nginx"

echo ">> done: http://${SERVER#*@}/"
