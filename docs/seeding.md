# Database Seeding

The application supports two types of seed data.

## Factory Data

Factories generate random data for development.

Examples:

- Users
- Reviews
- Addresses
- Orders
- Coupons

## Real Book Data

Real book data is stored in:

database/data/data.php

The DatabaseSeeder reads this file and creates:

- Authors
- Publishers
- Languages
- Categories
- Tags
- Products
- Product Images

Each product is connected with its relationships after creation.

## Seeding Order

The seeding process follows this order:

1. Authors
2. Publishers
3. Languages
4. Categories
5. Tags
6. Products
7. Product Images
8. Product Relationships
9. Reviews
10. Users
11. Addresses
12. Wishlists
13. Carts
14. Orders
15. Payments
16. Shipments

## Running the Seeder

php artisan db:seed

To recreate the entire database:

php artisan migrate:fresh --seed