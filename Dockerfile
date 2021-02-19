FROM electronuserland/builder:wine

WORKDIR /app
COPY package*.json ./
RUN npm i

COPY . ./

CMD ["npm","run","eb:wl"]