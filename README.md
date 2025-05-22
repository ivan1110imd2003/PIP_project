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
```tree
frontend/
├── node_modules/
├── public/             // Статични файлове (favicon, robots.txt)
├── src/
│   ├── api/            // Функции за API заявки (e.g., tripService.ts)
│   ├── assets/         // Изображения, шрифтове
│   ├── components/     // Преизползваеми UI компоненти
│   │   ├── common/     // Общи компоненти (бутони, инпути)
│   │   └── trips/      // Компоненти, свързани с екскурзии (TripCard.tsx)
│   ├── contexts/       // React Contexts за управление на състоянието
│   ├── hooks/          // Персонализирани React Hooks
│   ├── layouts/        // Компоненти за оформление (MainLayout.tsx)
│   ├── pages/          // Компоненти за "страници" (HomePage.tsx, TripDetailsPage.tsx)
│   ├── router/         // Конфигурация на React Router (index.tsx)
│   ├── services/       // Подобно на api/, може да съдържа по-сложна логика
│   ├── styles/         // Глобални стилове, CSS модули
│   ├── types/          // TypeScript интерфейси и типове за фронтенда
│   │   └── index.ts
│   ├── utils/          // Помощни функции
│   ├── App.tsx         // Главен компонент на приложението
│   └── main.tsx        // Входна точка, рендира App.tsx
├── .env.development    // Променливи на средата за разработка (ДОБАВИ В .gitignore!)
├── .env.production     // Променливи на средата за продукция (ДОБАВИ В .gitignore!)
├── .gitignore
├── index.html          // Главният HTML файл
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.node.json  // Vite специфичен tsconfig
└── vite.config.ts      // Конфигурация на Vite
```


