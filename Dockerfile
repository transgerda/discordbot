# Use Node.js LTS image
FROM node:20-bullseye

# Install fortune
RUN apt-get update && apt-get install -y fortune-mod && rm -rf /var/lib/apt/lists/*

# Check installation
RUN which fortune || echo "fortune not found"

# Set working directory
WORKDIR /home/node/app

# Copy package files first (for caching)
COPY botdata/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your bot code
COPY botdata .

# Expose port (optional)
EXPOSE 8080

# Default command
CMD ["node", "src/index.js"]

