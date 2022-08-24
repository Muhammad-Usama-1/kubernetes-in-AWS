FROM node:14-alpine3.15 as todo-app-build
WORKDIR /app
COPY package*.json  ./
RUN npm install
COPY ./public ./public/
COPY ./src ./src/
ENV REACT_APP_baseAPIURL=http://192.168.49.2:31432
RUN npm run build
FROM nginx:latest
LABEL maintainer=usama
COPY --from=todo-app-build /app/build /usr/share/nginx/html/
EXPOSE 80