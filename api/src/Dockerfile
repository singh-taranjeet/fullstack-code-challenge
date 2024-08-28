FROM node:18

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
ENV NODE_ENV production
EXPOSE 5555
ENV PORT 5555
CMD ["npm","run", "start"]