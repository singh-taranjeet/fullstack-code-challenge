FROM node:18

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
ENV NODE_ENV production
EXPOSE 4000
ENV PORT 4000
CMD ["npm","run", "start:prod"]