FROM node:20-alpine
WORKDIR /app

ENV CI=true

# 1. Install dependencies
COPY package*.json ./
RUN npm ci && npm cache clean --force

# 2. Copy application source and configurations
COPY src/ ./src/
COPY public/ ./public/
COPY index.html vite.config.js ./
COPY tailwind.config.js postcss.config.js ./

EXPOSE 5173
CMD ["sh", "-c", "npm run dev -- --host 0.0.0.0"]
