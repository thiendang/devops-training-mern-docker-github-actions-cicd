# Pull the Node image from Docker Hub
FROM node:17-alpine

RUN npm install -g nodemon

# Setting Working Directory
WORKDIR /app

# Copying only package.json
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy rest of the code to container
COPY . .

EXPOSE 3080

# Run the React app
CMD ["npm", "run", "dev"]