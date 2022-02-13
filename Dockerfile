FROM node:16-alpine

ARG DEV 
ENV DEV=${DEV:-false}

WORKDIR /app

COPY . .

RUN npm install

# Run on CI server / production only
RUN if [ ! "$DEV" = "true" ] ; then npm run build ; fi

CMD npm run server:prod

EXPOSE 8080 