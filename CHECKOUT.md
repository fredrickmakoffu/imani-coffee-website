# Checkout/Billing Page

A comprehensive checkout page built for the Imani Store following the design aesthetic of the main site.

## Features

### Multi-Step Checkout Process
1. **Contact Information** - Email and phone number collection
2. **Shipping Details** - Complete address form with shipping method selection
3. **Payment Information** - Secure credit card processing form

### Design Elements
- **Consistent Brand Colors**: Uses the site's warm earth tone palette (bridal-health, swiss-coffee, trace-ash, cod-gray)
- **Typography**: Maintains the Gambetta and General Sans font hierarchy
- **Responsive Layout**: Two-column layout on desktop, stacked on mobile
- **Progress Indicators**: Visual step tracker showing checkout progress

### Cart Management
- **Real-time Updates**: Quantity adjustment with live total calculations
- **Product Display**: Shows product images, names, and types
- **Remove Items**: Easy item removal from cart

### Shipping Options
- **Standard Shipping** (5-7 business days) - $5
- **Express Shipping** (2-3 business days) - $15
- **Overnight Shipping** (Next business day) - $25

### Order Summary
- **Subtotal**: Product total before taxes and shipping
- **Tax Calculation**: 8% tax rate applied
- **Shipping Costs**: Based on selected shipping method
- **Total**: Final amount including all costs

### Security Features
- **Secure Processing**: Visual security indicators
- **Input Validation**: Required field validation
- **Terms Acceptance**: User agreement checkbox
- **Loading States**: Processing feedback during order submission

### Form Components
- **Styled Inputs**: Custom input components matching site design
- **Labels**: Accessible form labels
- **Card Formatting**: Automatic credit card number formatting
- **Expiry Validation**: MM/YY format validation

## Navigation
- **Back to Shop**: Easy return to shopping
- **Breadcrumb Navigation**: Clear path back to previous pages
- **Order Completion**: Success page with next steps

## Usage

The page is accessible at `/checkout` and integrates with the existing shop cart system. Users can proceed from the shop cart to complete their purchase through this secure checkout flow.

## Technical Implementation

- **Next.js 14**: React framework with app router
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **Lucide Icons**: Consistent iconography
- **State Management**: Local React state for checkout process
- **Form Handling**: Controlled components with validation

The checkout page maintains the minimalist, coffee-shop aesthetic while providing a professional e-commerce experience.
