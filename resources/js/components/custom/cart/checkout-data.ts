import { z } from 'zod'

export const countryOptions = [
    { value: 'Greece', label: 'Greece' },
    { value: 'Cyprus', label: 'Cyprus' },
] as const

export const countryLabels: Record<string, string> = Object.fromEntries(
    countryOptions.map(country => [country.value, country.label]),
)

export const checkoutSchema = z.object({
    // Contact information
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address')
        .max(255, 'Email is too long'),

    firstName: z
        .string()
        .min(1, 'First name is required')
        .max(100, 'First name is too long'),

    lastName: z
        .string()
        .min(1, 'Last name is required')
        .max(100, 'Last name is too long'),

    phone: z
        .string()
        .min(10, 'Phone number is required')
        .max(50, 'Phone number is too long'),

    // Shipping address
    shipping_method_id: z
        .number()
        .int()
        .positive('Please select a shipping method'),
    address: z
        .string()
        .min(1, 'Street address is required')
        .max(255, 'Street address is too long'),
    city: z
        .string()
        .min(1, 'City is required')
        .max(100, 'City is too long'),
    number: z
        .string()
        .min(1, 'Street number is required')
        .max(20, 'Street number is too long'),
    state: z
        .string()
        .min(1, 'State/Region is required'),
    postal_code: z
        .string()
        .min(1, 'Postal code is required')
        .max(20, 'Postal code is too long'),
    country: z
        .string()
        .min(1, 'Country is required')
        .max(100, 'Country is too long'),

    // Checkout options
    payment_method_id: z
        .number()
        .int()
        .positive('Please select a payment method'),
    // Coupon
    promo_code: z
        .string()
        .max(50, 'Promo code is too long'),
    // Payment UI state
    cardNumber: z
        .string()
        .optional(),

    expiryDate: z
        .string()
        .optional(),

    cvv: z
        .string()
        .optional(),

    cardName: z
        .string()
        .max(100, 'Cardholder name is too long')
        .optional(),

    saveInfo: z
        .boolean()
        .optional(),

    newsletter: z
        .boolean()
        .optional(),
})

export type CheckoutForm1Data = z.infer<typeof checkoutSchema>

export const initialCheckoutForm1Data: CheckoutForm1Data = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    number: '',
    city: '',
    postal_code: '',
    country: '',
    state: '',
    shipping_method_id: 0,
    payment_method_id: 0,
    promo_code: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    saveInfo: false,
    newsletter: false,
}