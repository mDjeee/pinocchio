#stage 1
FROM 134.209.25.249/frontend/images:node-20 as node
WORKDIR /app
ADD package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

#stage 2
FROM 134.209.25.249/frontend/images:nginx-alpine
COPY --from=node /app/dist/pinocchio/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 4200

#dev
#docker build -t 10.226.99.100:5050/uz.tenge.tune/tune_root/tengefront:latest .
#prod
#docker build -t 10.226.99.100:5050/uz.tenge.tune/tune_root/tengefront:prod.0.0.xx .
