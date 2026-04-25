FROM node:22-alpine AS build_stage
WORKDIR /app
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit --ignore-scripts
COPY . .
RUN npm run build

FROM caddy:2-alpine
COPY --from=build_stage /app/dist /usr/share/caddy
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
CMD [ "caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile" ]