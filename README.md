Сервер запустится здесь: http://localhost:30001/  
но графического интерфейса там не будет, за него отвечает другой репозиторий - [web-client](https://github.com/me-ma-s/web-client)
# Запуск, когда всё уже настроено
> npm run dev
# Быстрый запуск и настройка всего и сразу
> npm install  
npm run dev

В отдельном терминале
> npm run db
# Если предыдущий способ не работает
1. Убедитесь, что у вас установлен npm
> npm -v
2. Убедитесь, что у вас установлен и запущен сервер postgreSQL 
> psql
3. Если что-то не установлено - установите.

# Пересоздать БД
1. Закрыть вкладку браузера с web-клиентом (или даже остановить сервер с веб-клиентом)
2. Убедиться, что сервер работает
3. npm run db
