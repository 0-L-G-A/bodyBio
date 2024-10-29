# Dockerfile для Frontend
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

# Встановлюємо сервер
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Відкриваємо порт 80
EXPOSE 80

# Запускаємо Nginx
CMD ["nginx", "-g", "daemon off;"]