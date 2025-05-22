# Уеб приложение за организиране на групови екскурзии и пътувания

### Увод



### Файлова структура
```html
backend/
├── node_modules/
├── src/
│   ├── config/         // Конфигурация (БД, .env зареждане)
│   │   └── db.ts
│   ├── controllers/    // Контролери (обработка на заявки)
│   │   └── trip.controller.ts
│   ├── entities/       // TypeORM Entities (модели на данни)
│   │   ├── User.ts
│   │   └── Trip.ts
│   ├── middlewares/    // Middleware функции (auth, error handling)
│   │   └── auth.middleware.ts
│   ├── routes/         // Дефиниции на API маршрути
│   │   ├── trip.routes.ts
│   │   └── index.ts    // Главен рутер
│   ├── services/       // Бизнес логика
│   │   └── trip.service.ts
│   ├── utils/          // Помощни функции
│   └── server.ts       // Главен файл на сървъра (или index.ts, app.ts)
├── .env                // Променливи на средата (ДОБАВИ В .gitignore!)
├── .gitignore
├── nodemon.json        // (Ако си го създал)
├── package.json
├── package-lock.json
└── tsconfig.json
```


