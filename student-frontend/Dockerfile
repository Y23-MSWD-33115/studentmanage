# build stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# runtime stage
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# optional: copy a custom nginx.conf if you want to change default settings
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
