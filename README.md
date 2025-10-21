This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load fonts.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) for more information.

## Docker Deployment

Use the provided script to build and redeploy the production container locally or on your server:

```bash
./scripts/deploy.sh
```

The script will:

- build the Docker image defined in `Dockerfile`
- stop and remove any existing container with the same name
- start a fresh container that exposes port `3000`

You can override defaults with environment variables:

```bash
IMAGE_NAME=my-portfolio HOST_PORT=8080 ./scripts/deploy.sh
```

The script requires Docker to be installed and available in `PATH`.

### GitHub Actions

The workflow in `.github/workflows/deploy.yml` connects to your VPS via SSH (using the
`VPS_HOST`, `VPS_USERNAME`, and `VPS_SSH_KEY` secrets) and runs `scripts/deploy.sh` after
pulling the latest changes on the `main` branch. Update the remote path (`~/billymrx-portfolio`)
or environment variables in the workflow if your server layout differs.
