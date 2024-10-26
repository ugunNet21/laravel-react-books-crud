### Screenshoot

![image](https://github.com/user-attachments/assets/8fcd6414-85ac-42d9-b406-011efee8c2dc)

### Install laravel

### 1.
````
composer create-project --prefer-dist laravel/laravel laravel-react-crud
cd laravel-react-crud
````

### 2. Create Moedel
````
php artisan make:model Book -m

````

### 3. Create Controller
````
php artisan make:controller BookController --resource

````
### 4. Install api route if your project laravel 11 and middleware
````
php artisan install:api

php artisan make:middleware EnsureTokenIsValid

````

### 5. Create Routes Api
````
Route::apiResource('books', BookController::class);

````

### 6. Create Seeder
````
php artisan make:seeder BookSeeder
````

### Create React Project
````
npm create vite@latest frontend -- --template react
cd frontend
npm install

````

### 1.1 
````
npm install axios

````

### 1.2 
````
npm install tailwindcss postcss autoprefixer
````

### 1.3
````
npx tailwindcss init -p

````

### 1.4
````
npm run dev

````
