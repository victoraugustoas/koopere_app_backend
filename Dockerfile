# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN yarn build

# Expose the application port (default is 3000 for NestJS)
EXPOSE 3000

# Set the environment variable to production
ENV NODE_ENV=production

# Run the application
CMD ["node", "dist/src/main"]
