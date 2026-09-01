# Bookshop Laravel E-Commerce

A full-stack e-commerce application for selling books, built with Laravel, Inertia.js, React and TypeScript.

The application provides a complete book catalog system with products, authors, publishers, categories, tags, shopping cart, wishlist, orders, reviews and an administrative dashboard.

## Features

### Catalog

* Products / Books
* Multiple authors per product
* Multiple publishers per product
* Categories
* Tags
* Languages
* Multiple product images
* Product search and filtering
* Product reviews
* Product ratings

### Customer Features

* User authentication
* User profile
* Address management
* Wishlist
* Shopping cart
* Cart items and quantities
* Order history

### E-Commerce

* Products and stock
* Discounts
* Coupons
* Orders
* Order items
* Shipping methods
* Payments
* Shipments

### Administration

* Admin dashboard
* Product management
* Category management
* Author management
* Publisher management
* Order management
* Coupon management
* Shipping management
* Payment management

## Tech Stack

### Backend

* PHP
* Laravel
* Eloquent ORM
* SQLite / MySQL

### Frontend

* React
* TypeScript
* Inertia.js
* Tailwind CSS
* shadcn/ui

## Requirements

Before installing the project, make sure you have:

* PHP
* Composer
* Node.js
* npm
* SQLite or MySQL

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd bookshop
```

Install PHP dependencies:

```bash
composer install
```

Install JavaScript dependencies:

```bash
npm install
```

Create the environment file:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

Configure your database in `.env`.

For SQLite:

```env
DB_CONNECTION=sqlite
```

Create the SQLite database:

```bash
touch database/database.sqlite
```

Run migrations:

```bash
php artisan migrate
```

Create the storage symbolic link:

```bash
php artisan storage:link
```

Seed the database:

```bash
php artisan db:seed
```

Start the Laravel development server:

```bash
php artisan serve
```

Start the frontend development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:8000
```

## Database Seeding

The application includes a custom database seeder that creates:

* Users
* Authors
* Publishers
* Categories
* Languages
* Tags
* Products
* Product images
* Reviews
* Addresses
* Wishlists
* Shopping carts
* Orders
* Payments
* Shipping methods
* Shipments
* Coupons

Book data can be stored in:

```text
database/data/data.php
```

Products are created from the real book data and then connected with their related:

* Authors
* Publishers
* Languages
* Categories
* Tags
* Images

Run the complete database setup with:

```bash
php artisan migrate:fresh --seed
```

## Project Structure

```text
app/
├── Http/
│   └── Controllers/
├── Models/
├── Services/
└── ...

database/
├── data/
│   └── data.php
├── factories/
├── migrations/
└── seeders/

resources/
├── js/
│   ├── components/
│   ├── pages/
│   └── types/
└── ...

docs/
├── architecture.md
├── database.md
├── products.md
└── seeding.md
```

## Documentation

More detailed documentation can be found in the `docs` directory.

* [Installation](docs/installation.md)
* [Architecture](docs/architecture.md)
* [Database](docs/database.md)
* [Seeding](docs/seeding.md)
* [Products](docs/products.md)
* [Orders](docs/orders.md)

```
README.md
docs/
│
├── setup/
│   ├── installation.md
│   └── configuration.md
│
├── architecture/
│   ├── overview.md
│   ├── backend.md
│   └── frontend.md
│
├── features/
│   ├── products.md
│   ├── cart.md
│   ├── wishlist.md
│   ├── orders.md
│   ├── reviews.md
│   ├── coupons.md
│   └── legal-pages.md
│
├── database/
│   ├── database.md
│   ├── relationships.md
│   └── seeding.md
│
└── api/
    └── endpoints.md
```
## License

MIT - This project is created for educational and portfolio purposes.