FROM node:20-alpine
WORKDIR /app

ENV CI=true

# 1. ONLY copy the dependency files first
COPY package*.json ./

# 2. Clean install and aggressively nuke the NPM cache
RUN npm install --include=dev && npm cache clean --force

# 3. SELECTIVELY copy only the modern React files/folders
COPY src/ ./src/
COPY public/ ./public/
COPY index.html vite.config.js ./
COPY tailwind.config.js postcss.config.js ./ 

EXPOSE 5173
CMD sh -c "npm run dev -- --host 0.0.0.0"

