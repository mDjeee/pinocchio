#stage 1
FROM node:20-alpine as node
WORKDIR /app
ADD package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/pinocchio/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
