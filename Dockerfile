# syntax=docker/dockerfile:1

# Google Cloud Run 배포용 Next.js standalone 이미지.
FROM node:22-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# 1) 의존성 설치: package 파일이 바뀔 때만 다시 실행된다.
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# 2) 빌드: 공개 도메인은 src/config/brand.ts에 있으므로 빌드 인자가 필요 없다.
FROM base AS builder
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3) 실행: standalone 산출물만 담은 최소 런타임.
FROM base AS runner
ENV NODE_ENV=production
# Cloud Run이 주입하는 PORT를 그대로 따르되, 로컬 실행용 기본값을 둔다.
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs && adduser -u 1001 -S nextjs -G nodejs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 8080

CMD ["node", "server.js"]
