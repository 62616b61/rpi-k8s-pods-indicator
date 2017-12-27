FROM hypriot/rpi-node

RUN apt-get update && apt-get install -y --no-install-recommends pigpio

RUN mkdir -p /app
WORKDIR /app

ADD package.json /app/
RUN npm install
COPY . /app

CMD ["npm", "start"]
