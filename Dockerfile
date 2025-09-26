# Step 1: Build React/Vite app
FROM node:18 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve with Tomcat at root URL
FROM tomcat:9-jdk21
RUN rm -rf /usr/local/tomcat/webapps/*

# Copy build output to ROOT so app is at "/"
COPY --from=build-stage /app/dist /usr/local/tomcat/webapps/ROOT

EXPOSE 8082
CMD ["catalina.sh", "run"]
