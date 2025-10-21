#!/usr/bin/env bash
set -euo pipefail

# Configuration with sensible defaults; override via environment variables when needed.
IMAGE_NAME=${IMAGE_NAME:-billymrx-portfolio}
CONTAINER_NAME=${CONTAINER_NAME:-billymrx-portfolio}
HOST_PORT=${HOST_PORT:-3000}
APP_PORT=${APP_PORT:-3000}
BUILD_CONTEXT=${BUILD_CONTEXT:-.}
ENV_FILE=${ENV_FILE:-.env}
SKIP_BUILD=${SKIP_BUILD:-0}
SKIP_RUN=${SKIP_RUN:-0}

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
PROJECT_ROOT=$(cd "${SCRIPT_DIR}/.." && pwd)

cd "${PROJECT_ROOT}"

# Load environment variables so build args are available
if [ -f "${ENV_FILE}" ]; then
  echo "[deploy] Loading environment from '${ENV_FILE}'"
  set -a
  # shellcheck disable=SC1090
  source "${ENV_FILE}"
  set +a
else
  echo "[deploy] Environment file '${ENV_FILE}' not found. Expecting variables to be pre-set."
fi

REQUIRED_VARS=(
  NEXT_PUBLIC_EMAILJS_SERVICE_ID
  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
)

for var in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!var:-}" ]; then
    echo "[deploy] Missing required environment variable '${var}'." >&2
    exit 1
  fi
done

if ! command -v docker >/dev/null 2>&1; then
  echo "[deploy] Docker is not installed or not in PATH." >&2
  exit 1
fi

if [ "${SKIP_BUILD}" != "1" ]; then
  echo "[deploy] Building image '${IMAGE_NAME}' from context '${BUILD_CONTEXT}'..."
  docker build -t "${IMAGE_NAME}" \
    --build-arg NEXT_PUBLIC_EMAILJS_SERVICE_ID="${NEXT_PUBLIC_EMAILJS_SERVICE_ID}" \
    --build-arg NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="${NEXT_PUBLIC_EMAILJS_TEMPLATE_ID}" \
    --build-arg NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="${NEXT_PUBLIC_EMAILJS_PUBLIC_KEY}" \
    "${BUILD_CONTEXT}"
else
  echo "[deploy] Skipping image build step (SKIP_BUILD=1)."
fi

if [ "${SKIP_RUN}" != "1" ]; then
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
else
  echo "[deploy] Skipping container run step (SKIP_RUN=1)."
fi
