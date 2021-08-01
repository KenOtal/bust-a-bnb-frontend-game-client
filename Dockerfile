# Install dependencies and make production build, then remove non production dependencies
FROM node:12.18.2-alpine3.12 AS builder
WORKDIR /usr/app
COPY package.json .
ENV NEXT_PUBLIC_PLAYER_OPS_URL=http://54.198.135.200:3555
RUN apk update
RUN apk add git
RUN apk add --no-cache python3 py3-pip
RUN apk add --update make
RUN apk add g++
ARG GITHUB_TOKEN
RUN git config --global url."https://${GITHUB_TOKEN}@github.com/".insteadOf ssh://git@github.com/
RUN npm install
COPY . .
RUN npm run build

# Copy build and production dependencies
FROM node:12.18.2-alpine3.12
WORKDIR /usr/app
COPY --from=builder /usr/app/package.json .
COPY --from=builder /usr/app/.next ./.next
COPY --from=builder /usr/app/next.config.js .
COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/public ./public
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
