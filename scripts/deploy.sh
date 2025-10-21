#!/usr/bin/env bash
set -euo pipefail

# Configuration with sensible defaults; override via environment variables when needed.
IMAGE_NAME=${IMAGE_NAME:-billymrx-portfolio}
CONTAINER_NAME=${CONTAINER_NAME:-billymrx-portfolio}
HOST_PORT=${HOST_PORT:-3000}
APP_PORT=${APP_PORT:-3000}
BUILD_CONTEXT=${BUILD_CONTEXT:-.}

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
PROJECT_ROOT=$(cd "${SCRIPT_DIR}/.." && pwd)

cd "${PROJECT_ROOT}"

if ! command -v docker >/dev/null 2>&1; then
  echo "[deploy] Docker is not installed or not in PATH." >&2
  exit 1
fi

echo "[deploy] Building image '${IMAGE_NAME}' from context '${BUILD_CONTEXT}'..."
docker build -t "${IMAGE_NAME}" "${BUILD_CONTEXT}"

if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
  echo "[deploy] Stopping existing container '${CONTAINER_NAME}'..."
  docker stop "${CONTAINER_NAME}" >/dev/null || true
  echo "[deploy] Removing existing container '${CONTAINER_NAME}'..."
  docker rm "${CONTAINER_NAME}" >/dev/null || true
fi

echo "[deploy] Starting container '${CONTAINER_NAME}' (port ${HOST_PORT}->${APP_PORT})..."
docker run -d \
  --name "${CONTAINER_NAME}" \
  --restart unless-stopped \
  -p "${HOST_PORT}:${APP_PORT}" \
  "${IMAGE_NAME}"

echo "[deploy] Deployment complete. Container '${CONTAINER_NAME}' is running."
