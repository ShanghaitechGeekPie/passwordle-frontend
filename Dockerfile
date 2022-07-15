FROM node:18 as build-deps
WORKDIR /usr/src/app
COPY . ./
RUN yarn && yarn build

FROM nginx:alpine
COPY --from=build-deps /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]