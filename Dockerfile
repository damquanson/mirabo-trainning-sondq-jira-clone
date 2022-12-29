    # Dockerfile  
    FROM node:16.13.2-lpine
    WORKDIR /app  
    COPY package.json /app  
    RUN npm install  
    COPY . /app  
    EXPOSE 3001  
    CMD npm run start:dev