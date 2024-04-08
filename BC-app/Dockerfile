# Используем минимальный образ nginx для запуска статического сайта
FROM nginx:alpine

# Копируем готовый build из папки BC-app в папку /usr/share/nginx/html внутри контейнера
COPY /build /usr/share/nginx/html

# Указываем порт, который будет слушать контейнер
EXPOSE 80

# Команда для запуска nginx внутри контейнера
CMD ["nginx", "-g", "daemon off;"]