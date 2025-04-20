## 📦 Product Management System

A modern full-stack application built with **Laravel API**, **Vue.js 3**, **Pinia**, **PrimeVue**, and **Tailwind CSS**. It supports user authentication, product CRUD operations, image uploads, searching, and pagination—all within a clean, component-based architecture.

---

## 🚀 Features

- 🔐 **Authentication** (Register, Login, Logout) using Laravel Sanctum
- 📦 **Product Management** (Create, Read, Update, Delete)
- 📸 **Image Uploads** with file preview, storage, and cleanup logic
- 🔍 **Search & Pagination** powered by Laravel backend and PrimeVue DataTable
- 💾 **Lazy Loading & API Integration** with Pinia Store
- 🎨 **Responsive UI** with PrimeVue components and Tailwind CSS
- 📁 **Reusable Components** for Forms (used for both Create and Edit via Drawer)
- 🖼️ **Single Product Page** with details and image preview

---

## 🛠️ Tech Stack

| Frontend                 | Backend         |
|--------------------------|------------------|
| Vue 3 (Composition API)  | Laravel 10       |
| Pinia (State Management) | Sanctum (Auth)   |
| PrimeVue (UI Components) | RESTful API      |
| Tailwind CSS             | Eloquent ORM     |
| TypeScript               | SQLite/MySQL/PostgreSQL |

---

## 📂 Folder Structure Highlights

```
├── backend/
│   ├── app/
│   │   └── Http/Controllers/ProductController.php
│   ├── routes/api.php
│   ├── app/Models/Product.php
│   ├── app/Http/Resources/ProductResource.php
│   └── storage/app/public/uploads/
├── frontend/
│   ├── src/
│   │   ├── components/ProductForm.vue
│   │   ├── pages/Home.vue
│   │   ├── pages/ProductShow.vue
│   │   ├── stores/product.ts
│   │   ├── stores/auth.ts
│   │   └── router/index.ts
```

---

## 🖼️ Image Upload Logic

- Image is selected using `FileUpload` from PrimeVue.
- Stored via Laravel’s `Storage::disk('public')->put()` method.
- Mutated with an **accessor** in `Product.php` to generate a full URL.
- On update:
  - If new image exists → delete old + save new
  - If no image + no image_url → delete old
  - If only `image_url` exists → skip file handling

---

## 📄 API Endpoints

| Method | Endpoint           | Description                  |
|--------|--------------------|------------------------------|
| GET    | `/api/products`    | List products (with search & pagination) |
| GET    | `/api/products/{id}` | View single product         |
| POST   | `/api/products`    | Create product (with image) |
| POST   | `/api/products/{id}` | Update product              |
| DELETE | `/api/products/{id}` | Delete product              |

---

## 🔧 Setup Instructions

### 1. Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan storage:link
php artisan serve
```

### 2. Frontend (Vue)
```bash
cd frontend
npm install
npm run dev
```

---

## ✅ To Do (Future Scope)

- Role-based permissions (admin/user)
- Product categories/tags
- Export products to CSV/PDF
- Unit & feature tests
- Drag-and-drop image support

---

## 👨‍💻 Author

Developed by **Suman** with ❤️ using modern full-stack tools.

---

Let me know if you want this auto-pushed to GitHub with `README.md`, `.gitignore`, etc. Or want a logo/cover image suggestion!