# Use the official Bun image without Alpine
FROM node:18

# Set the working directory
WORKDIR /home/bun/app

# Copy the application code
COPY . .
RUN npm i
# Install dependencies in production mode
RUN npm run build

# Set the command to start the application
CMD ["npm", "run", "start"]
