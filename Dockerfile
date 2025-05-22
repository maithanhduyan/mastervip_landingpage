# Use official Node.js image as the base image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN pnpm build

# Production image, copy built assets and install only production dependencies
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install pnpm
RUN npm install -g pnpm

# Copy only necessary files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.* ./

# Expose port
EXPOSE 3000

# Start the Next.js app
CMD ["pnpm", "start"]
