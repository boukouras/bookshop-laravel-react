export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: Date | null;
    avatar: string;
    telephone: string | null;
    is_admin: boolean;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    cart?: Cart;
    reviews?: Review[];
    wishlists?: Wishlist[];
    wishlist_products?: Product[];
    orders?: Order[];
    addresses?: Address[];
}
export interface Tag {
    id: number;
    name: string;
    slug: string;
    status: 'active' | 'inactive';
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    products?: Product[];
}
export interface Publisher {
    id: number;
    name: string;
    slug: string;
    description: string;
    logo: string;
    status: boolean;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    products?: Product[];
}
export interface PublisherProduct {
    id: number;
    publisher_id: number;
    product_id: number;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    publisher?: Publisher;
    product?: Product;
}
export interface Author {
    id: number;
    name: string;
    slug: string;
    description: string;
    logo: string;
    status: boolean;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    products?: Product[];
}
export interface AuthorProduct {
    id: number;
    author_id: number;
    product_id: number;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    author?: Author;
    product?: Product;
}
export interface Category {
    id: number;
    parent_id: number | null;
    name: string;
    slug: string;
    image: string | null;
    description: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    parent: Category | null;
    status: boolean;
    children?: Category[];
    products?: Product[];
}
export interface Product {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    price: number;
    discount_type: 'percentage' | 'fixed' | null;
    discount_value: number | null;
    stock: number | null;
    isbn: string | null;
    pages: number | null;
    release_date: Date | null;
    is_featured: boolean | null;
    status: 'active' | 'inactive' | 'draft';
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    authors?: Author[];
    publishers?: Publisher[];
    languages?: Language[];
    tags?: Tag[];
    images?: ProductImage[];
    reviews?: Review[];
    categories?: Category[];
    sales?: OrderItem[];
}
export interface ProductTag {
    id: number;
    product_id: number;
    tag_id: number;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    product?: Product;
    tag?: Tag;
}
export interface ProductLanguage {
    id: number;
    product_id: number;
    language_id: number;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    product?: Product;
    language?: Language;
}
export interface ProductCategory {
    id: number;
    product_id: number;
    category_id: number;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    product?: Product;
    category?: Category;
}
export interface ProductImage {
    id: number;
    product_id: number;
    image_url: string;
    sort_order: number;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    product?: Product;
}
export interface Cart {
    id: number;
    user_id: number;
    status: 'active' | 'converted' | 'abandoned';
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    user?: User;
    items?: CartItem[];
}
export interface CartItem {
    id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    cart?: Cart;
    product?: Product;
}
export interface Review {
    id: number;
    user_id: number;
    product_id: number;
    rating: number;
    comment: string;
    verified_purchase: boolean;
    status: 'pending' | 'approved' | 'rejected';
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    user?: User;
    product?: Product;
}
export interface Wishlist {
    id: number;
    user_id: number;
    product_id: number;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    user?: User;
    product?: Product;
}
export interface PaymentMethod {
    id: number;
    name: string;
    slug: string;
    provider: string;
    icon: string | null;
    description: string | null;
    status: 'active' | 'inactive';
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    payments?: Payment[];
}
export interface Payment {
    id: number;
    order_id: number;
    payment_method_id: number;
    transaction_id: string | null;
    amount: number;
    currency: string;
    status: 'pending' | 'paid' | 'failed' | 'refunded';
    paid_at: Date | null;
    provider_response: JSON | null;
    failed_reason: string | null
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    order?: Order;
    payment_method?: PaymentMethod;
}
export interface Coupon {
    id: number;
    code: string;
    description: string | null;
    type: 'percentage' | 'fixed';
    value: number;
    min_order_amount: number | null;
    max_discount: number | null;
    usage_limit: number | null;
    used_count: number;
    per_user_limit: number | null;
    starts_at: Date | null
    expires_at: Date | null
    status: 'active' | 'inactive' | 'expired';
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    orders?: Order[];
}
export interface Order {
    id: number;
    user_id: number;
    coupon_id: number | null;
    shipping_method_id: number | null;
    subtotal_amount: number;
    discount_amount: number;
    shipping_amount: number;
    amount: number;
    currency: string;
    status: 'pending' | 'paid' | 'processing' | 'shipped' | 'completed' | 'cancelled' | 'refunded';
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    user?: User;
    coupon?: Coupon;
    shipping_method?: ShippingMethod;
    items?: OrderItem[];
    payments?: Payment[];
    addresses?: OrderAddress[];
    shipments?: Shipment[];
}
export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number | null;
    product_name: string;
    price: number;
    quantity: number;
    amount: number;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    order?: Order;
    product?: Product;
}
export interface OrderAddress {
    id: number;
    order_id: number;
    country: string;
    city: string;
    address: string;
    number: string;
    postal_code: string;
    type: 'billing' | 'shipping';
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    order?: Order;
}
export interface Address {
    id: number;
    user_id: number;
    name: string;
    country: string;
    city: string;
    address: string;
    number: string;
    postal_code: string;
    type: 'Home' | 'Office' | 'Other';
    is_default: boolean;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    user?: User;
}
export interface Shipment {
    id: number;
    order_id: number;
    carrier: string | null;
    tracking_number: string | null;
    shipped_at: Date | null;
    delivered_at: Date | null;
    type: 'pending' | 'shipped' | 'in_transit' | 'delivered' | 'failed' | 'returned';
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    order?: Order;
}
export interface ShippingMethod {
    id: number;
    name: string;
    slug: string;
    provider: string;
    description: string | null;
    price: number;
    free_from_amount: number | null;
    min_days: number | null;
    max_days: number | null;
    status: 'active' | 'inactive';
    sort_order: number;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    orders?: Order[];
}
export interface Language {
    id: number;
    name: string;
    symbol: string;
    iso: string;
    slug: string;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    products?: Product[];
}
export interface Paginated<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}