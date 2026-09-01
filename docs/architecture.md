# Application Architecture

## Overview

The application follows a full-stack Laravel architecture using Inertia.js to connect the Laravel backend with the React frontend.

```text
Browser
   ↓
React + TypeScript
   ↓
Inertia.js
   ↓
Laravel Controllers
   ↓
Services
   ↓
Eloquent Models
   ↓
Database
```

## Backend Architecture

The backend is responsible for:

* Routing
* Authentication
* Authorization
* Validation
* Business logic
* Database operations

### Controllers

Controllers handle incoming requests and return Inertia responses.

Example:

```text
ProductController
AuthorController
PublisherController
CategoryController
CartController
OrderController
```

Controllers should remain focused on request handling and should not contain complex business logic.

## Services

Services contain reusable business logic.

Example:

```text
ProductImageService
CartService
OrderService
```

Services are used when the same functionality needs to be reused by:

* Controllers
* Seeders
* Console commands
* Background jobs

## Models

Eloquent models represent database entities and their relationships.

Main models include:

```text
Product
ProductImage
Author
Publisher
Category
Tag
Language
User
Cart
CartItem
Order
OrderItem
Review
Coupon
Payment
Shipment
```

## Frontend Architecture

The frontend uses React and TypeScript.

```text
resources/js/
│
├── components/
│   ├── custom/
│   └── ui/
│
├── pages/
│   ├── client/
│   └── dashboard/
│
├── layouts/
│
└── types/
```

## Inertia.js

Inertia.js connects Laravel routes and controllers with React pages without requiring a separate REST API.

Example flow:

```text
GET /products
      ↓
Laravel Route
      ↓
Controller
      ↓
Product Query
      ↓
Inertia::render()
      ↓
React Page
```
