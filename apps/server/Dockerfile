FROM node:22-slim

WORKDIR /app

ARG NPM_TOKEN
ENV NPM_TOKEN=$NPM_TOKEN

# Create .npmrc with auth
RUN printf '//registry.npmjs.org/:_authToken=%s\n@volley:registry=https://registry.npmjs.org/\nalways-auth=true\n' "$NPM_TOKEN" > /root/.npmrc

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy source
COPY . .

# Build
RUN npm run build

EXPOSE 3001

# Start
CMD ["node", "dist/index.js"]

