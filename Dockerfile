# I asked ChatGPT to write this, then adjusted the commands as needed.

# Use the official Node.js 20 image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json before running npm install
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the wait-for-it.sh script and set executable permissions
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Copy the rest of the application files
COPY . .

# Expose the port (make sure it matches the one your Express app runs on)
EXPOSE 3000

# Start the server
CMD ["sh", "./wait-for-it.sh", "db:5432", "--", "node", "server.js"]