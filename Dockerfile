FROM node
WORKDIR /src
COPY . .
EXPOSE 4000
CMD node index.js