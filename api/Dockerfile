FROM node:18

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
ENV NODE_ENV production
EXPOSE 6000
ENV PORT 6000
CMD ["npm","run", "start:prod"]