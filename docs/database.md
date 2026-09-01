# Database Structure

## Products

Products represent books available in the store.

A product can belong to multiple:

* Authors
* Publishers
* Categories
* Tags
* Languages

A product can also have multiple images and reviews.

```text
Product
 ├── hasMany ProductImages
 ├── hasMany Reviews
 ├── belongsToMany Authors
 ├── belongsToMany Publishers
 ├── belongsToMany Categories
 ├── belongsToMany Tags
 └── belongsToMany Languages
```

## Product Images

Product images are stored in a separate table.

```text
Product
   ↓
ProductImage
```

Each image belongs to one product.

The `image_url` field stores the image path or URL.

## Orders

Orders belong to users.

```text
User
  ↓
Order
  ↓
OrderItems
```

Order items store a snapshot of the product information at the time of purchase.

Example fields:

```text
product_id
product_name
price
quantity
amount
```

This allows order history to remain accurate even if the product price or name changes later.

## Product Relationships

Many-to-many relationships use pivot tables.

Examples:

```text
author_product
category_product
language_product
publisher_product
product_tag
```
