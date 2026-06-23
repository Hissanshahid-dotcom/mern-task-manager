FROM node:20-alpine

# Root se backend folder mein jao
WORKDIR /app

# Pehle backend folder ki package files copy karo
COPY backend/package*.json ./

# Dependencies install karo
RUN npm install --production

# Phir poora backend folder copy karo
COPY backend/ .

EXPOSE 5000

CMD ["node", "server.js"]