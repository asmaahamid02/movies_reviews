# Movies Reviews System

## Description

This project is a movie reviews system. It allows users to search for movies and add reviews to them.
It allows admins to add movies, view users, movies, user reviews

## Technologies

1. Laravel
2. ReactJs with Vite
3. MySQL

## Packages

1. [Laravel Sanctum](https://laravel.com/docs/9.x/sanctum)
2. [Material UI](https://mui.com/material-ui/getting-started/overview/)
3. [React Router](https://reactrouter.com/en/main/start/overview)
4. [Axios](https://axios-http.com/docs/intro)
5. [Formik](https://formik.org/docs/overview)
6. [Yup](https://www.npmjs.com/package/yup)
7. [TanStack React Query](https://tanstack.com/query/v3/docs/react/overview)

## Installation

Clone the repository

```
git clone https://github.com/asmaahamid02/movies_reviews.git
```

> Run Server

1. Create .env
   ```
   cp .env.example .env
   ```
2. Link the storage folder
   ```
   php artisan storage:link
   ```
3. Migrate the database
   ```
   php artisan migrate
   ```
4. Seed the database
   ```
   php artisan db:seed
   ```
5. Run the server
   ```
   php artisan serve
   ```

> Run Client

1. Install dependencies

   ```
   npm install
   ```

2. Run the client
   ```
   npm run dev
   ```
