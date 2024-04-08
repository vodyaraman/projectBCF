# Используем официальный образ Node.js как базовый
FROM node:20.10.0

# Установка директории приложения в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json (если есть) в контейнер
COPY package*.json ./ package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта в контейнер
COPY . .

# Установка Python и других зависимостей, если необходимо
RUN apt-get update && apt-get install -y python3

# Экспортируем порт, который использует Express.js сервер
EXPOSE 3001

# Команда для запуска сервера (может варьироваться в зависимости от вашего проекта)
CMD ["node", "server.js"]