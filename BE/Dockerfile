# Dockerfile для Backend
FROM node:18

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json і package-lock.json
COPY package.json package-lock.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо решту файлів
COPY . .

# Будуємо додаток
RUN npm run build

# Відкриваємо порт 3006
EXPOSE 3006

# Запускаємо сервер
CMD ["npm", "run", "start:prod"]