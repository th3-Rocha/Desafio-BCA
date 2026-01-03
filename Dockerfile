FROM node:24-alpine

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start:prod"]
