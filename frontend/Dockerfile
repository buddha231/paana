
# Use an official Node.js runtime as the base image
FROM node:14 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all application files to the container
COPY . .

# Build the React app
RUN npm run build

# Use a smaller base image for the runtime environment
FROM nginx:alpine

# Copy the built React app from the previous stage to the Nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
