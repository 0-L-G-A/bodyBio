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

# Відкриваємо порт 3000
EXPOSE 3000

# Запускаємо сервер, використовуючи змінну PORT
CMD ["npm", "run", "start:prod"]
