# =============================================================
# VUNA CALCULATOR — Dockerfile
# David Zasan Elisha · SEN 482 · Set 2025/26
# =============================================================
# Stage 1 · ci    — installs deps, runs ESLint, runs Jest
# Stage 2 · final — copies static files into nginx to serve
# =============================================================

# ─────────────────────────────────────────────────────────────
# STAGE 1 · CI  (Node 22 Alpine)
# ─────────────────────────────────────────────────────────────
FROM node:22-alpine AS ci

# Set working directory inside the container
WORKDIR /app

# Copy dependency manifests first (better Docker layer caching —
# node_modules is only re-installed when package.json changes)
COPY package.json ./

# Install dev dependencies (Jest + ESLint)
RUN npm install --no-audit --no-fund

# Copy the rest of the source code
COPY eslint.config.js ./
COPY script.js        ./
COPY calculator.test.js ./

# ── Lint ──────────────────────────────────────────────────────
# Fails the build (non-zero exit) if any ESLint rule is violated
RUN npm run lint

# ── Test ──────────────────────────────────────────────────────
# Fails the build if any Jest test fails
RUN npm test

# ─────────────────────────────────────────────────────────────
# STAGE 2 · FINAL  (nginx Alpine — tiny production image)
# ─────────────────────────────────────────────────────────────
FROM nginx:alpine AS final

# Remove the default nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy ONLY the static files needed to serve the calculator.
# Nothing from Stage 1 (node_modules, test files) ends up here.
COPY index.html              /usr/share/nginx/html/
COPY assets/css/styles.css   /usr/share/nginx/html/assets/css/
COPY assets/js/script.js     /usr/share/nginx/html/assets/js/

# Expose port 80 (standard HTTP)
EXPOSE 80

# nginx starts automatically as the default CMD in nginx:alpine