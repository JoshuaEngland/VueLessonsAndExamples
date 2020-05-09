FROM node:14.2.0-buster-slim

USER root
ENV DEBIAN_FRONTEND=noninteractive
RUN npm install -g @vue/cli \
    && npm install -g jest 
ENV DEBIAN_FRONTEND=dialog
USER node