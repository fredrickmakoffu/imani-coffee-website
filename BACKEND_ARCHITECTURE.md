# Backend Architecture Design for Imani Coffee Website

## 🏗️ Technical Stack

**Database**: PostgreSQL (production/development)
**ORM**: Prisma (excellent TypeScript integration)
**Authentication**: NextAuth.js (integrates perfectly with Next.js)
**API**: Next.js API Routes (app/api directory)
**Session Management**: JWT + Database sessions
**File Storage**: Vercel Blob or AWS S3 (for product images)

## 📊 Database Schema Design

### Core Tables Structure

```sql
-- Users & Authentication
User {
  id: String (UUID)
  email: String (unique)
  passwordHash: String
  name: String
  createdAt: DateTime
  updatedAt: DateTime
  lastLoginAt: DateTime?
  roleId: String (foreign key)
}

Role {
  id: String (UUID)
  name: String (unique) // e.g., "Inventory Manager", "Product Manager", "Viewer"
  description: String?
  isActive: Boolean (default: true)
  createdAt: DateTime
  updatedAt: DateTime
}

Permission {
  id: String (UUID)
  name: String (unique) // e.g., "manage_products", "view_inventory", "edit_categories"
  description: String
  module: String // e.g., "products", "inventory", "users", "categories"
  action: String // e.g., "create", "read", "update", "delete", "manage"
}

RolePermission {
  id: String (UUID)
  roleId: String (foreign key)
  permissionId: String (foreign key)
  createdAt: DateTime
}

-- Product Management
Category {
  id: String (UUID)
  name: String (unique)
  description: String?
  slug: String (unique)
  isActive: Boolean (default: true)
  parentCategoryId: String? (foreign key - for subcategories)
  createdAt: DateTime
  updatedAt: DateTime
  createdBy: String (foreign key to User)
}

Product {
  id: String (UUID)
  name: String
  description: String
  price: Decimal
  sku: String (unique)
  categoryId: String (foreign key)
  origin: String? // for coffee products
  process: String? // for coffee products  
  roast: String? // for coffee products
  isActive: Boolean (default: true)
  metadata: Json // flexible field for additional product data
  createdAt: DateTime
  updatedAt: DateTime
  createdBy: String (foreign key to User)
  updatedBy: String (foreign key to User)
}

ProductImage {
  id: String (UUID)
  productId: String (foreign key to Product)
  imageUrl: String // Full URL or path to image
  altText: String? // Alt text for accessibility
  isPrimary: Boolean (default: false) // Only one primary image per product
  sortOrder: Int (default: 0) // Display order for image gallery
  createdAt: DateTime
  updatedAt: DateTime
  createdBy: String (foreign key to User)
}

-- Inventory Management
InventoryItem {
  id: String (UUID)
  productId: String (foreign key)
  quantity: Int
  reservedQuantity: Int (default: 0) // for pending orders
  availableQuantity: Int (computed: quantity - reservedQuantity)
  cost: Decimal? // wholesale cost
  supplier: String?
  lastStockDate: DateTime?
  createdAt: DateTime
  updatedAt: DateTime
}

-- Flexible Threshold & Alert System
ThresholdAlert {
  id: String (UUID)
  entityType: String // "product", "category", "user", "sales", etc.
  entityId: String // ID of the entity being monitored, nullable
  alertType: String // "inventory_low", "inventory_critical", "sales_target", etc.
  priority: String // "LOW", "MEDIUM", "HIGH", "CRITICAL"
  thresholdValue: Decimal // The trigger value
  comparisonOperator: String // "LESS_THAN", "GREATER_THAN", "EQUALS", "LESS_THAN_OR_EQUAL"
  actionValue: Decimal? // Suggested action value (e.g., reorder quantity)
  title: String // Alert title for display
  description: String? // Detailed alert description
  isActive: Boolean (default: true)
  metadata: Json // Flexible field for alert-specific data
  createdAt: DateTime
  updatedAt: DateTime
  createdBy: String (foreign key to User)
}

InventoryTransaction {
  id: String (UUID)
  inventoryItemId: String (foreign key)
  type: String // "STOCK_IN", "STOCK_OUT", "ADJUSTMENT", "SALE", "RETURN"
  quantity: Int // positive for additions, negative for reductions
  previousQuantity: Int
  newQuantity: Int
  reason: String
  reference: String? // order ID, supplier invoice, etc.
  notes: String?
  createdAt: DateTime
  createdBy: String (foreign key to User)
}

-- Session Management
Session {
  id: String (UUID)
  userId: String (foreign key)
  token: String (unique)
  expiresAt: DateTime
  createdAt: DateTime
  lastAccessAt: DateTime
  ipAddress: String?
  userAgent: String?
}
```

## 🔌 API Endpoints Structure

### Authentication Endpoints
```
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
GET  /api/auth/me
POST /api/auth/change-password
```

### User Management (Superuser only)
```
GET    /api/admin/users              // List all users with pagination
POST   /api/admin/users              // Create new user
GET    /api/admin/users/[id]         // Get user details
PUT    /api/admin/users/[id]         // Update user
DELETE /api/admin/users/[id]         // Deactivate user
PUT    /api/admin/users/[id]/role    // Assign role to user
```

### Role & Permission Management (Superuser only)
```
GET    /api/admin/roles              // List all roles
POST   /api/admin/roles              // Create new role
GET    /api/admin/roles/[id]         // Get role with permissions
PUT    /api/admin/roles/[id]         // Update role
DELETE /api/admin/roles/[id]         // Delete role
POST   /api/admin/roles/[id]/permissions // Assign permissions to role

GET    /api/admin/permissions        // List all available permissions
```

### Category Management (Requires 'manage_categories' permission)
```
GET    /api/admin/categories         // List categories
POST   /api/admin/categories         // Create category
GET    /api/admin/categories/[id]    // Get category
PUT    /api/admin/categories/[id]    // Update category
DELETE /api/admin/categories/[id]    // Delete category
```

### Product Management (Requires 'manage_products' permission)
```
GET    /api/admin/products           // List products with filters
POST   /api/admin/products           // Create product
GET    /api/admin/products/[id]      // Get product details
PUT    /api/admin/products/[id]      // Update product
DELETE /api/admin/products/[id]      // Delete product
POST   /api/admin/products/[id]/images // Upload product images
```

### Inventory Management (Requires 'manage_inventory' permission)
```
GET    /api/admin/inventory          // List inventory items
GET    /api/admin/inventory/[id]     // Get inventory item details
PUT    /api/admin/inventory/[id]     // Update stock quantities
POST   /api/admin/inventory/stock-in // Add stock
POST   /api/admin/inventory/stock-out// Remove stock
GET    /api/admin/inventory/transactions // Get transaction history
GET    /api/admin/inventory/low-stock   // Get low stock alerts
```

### Dashboard & Analytics (Various permissions)
```
GET    /api/admin/dashboard/stats    // Get dashboard statistics
GET    /api/admin/dashboard/recent   // Get recent activities
```

## 🎨 Admin UI Design & Flow

### Design Aesthetic
Following your existing website's minimal, nature-inspired design:
- **Colors**: Same palette (`bg-bridal-health`, `text-trace-ash`, etc.)
- **Typography**: Consistent with main site
- **Layout**: Clean, spacious, minimal navigation
- **Components**: Reuse existing UI components from `components/ui/`

### Admin Routes Structure
```
/admin/login                 // Login page
/admin/dashboard            // Main dashboard
/admin/products             // Product management
/admin/products/new         // Create new product
/admin/products/[id]/edit   // Edit product
/admin/categories           // Category management
/admin/inventory            // Inventory overview
/admin/inventory/[id]       // Inventory item details
/admin/users               // User management (superuser only)
/admin/roles               // Role management (superuser only)
/admin/settings            // General settings
```

### Permission-Based Navigation
```typescript
// Navigation items based on user permissions
const navigationItems = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
    permission: null // Available to all authenticated users
  },
  {
    name: 'Products',
    href: '/admin/products',
    icon: Package,
    permission: 'view_products'
  },
  {
    name: 'Categories',
    href: '/admin/categories',
    icon: Tags,
    permission: 'view_categories'
  },
  {
    name: 'Inventory',
    href: '/admin/inventory',
    icon: Warehouse,
    permission: 'view_inventory'
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: Users,
    permission: 'manage_users',
    superuserOnly: true
  },
  {
    name: 'Roles',
    href: '/admin/roles',
    icon: Shield,
    permission: 'manage_roles',
    superuserOnly: true
  }
];
```

## 🔐 Authentication & Authorization Flow

### 1. Login Process
```
1. Admin visits /admin/login
2. Enters email/password
3. System validates credentials
4. Creates session with JWT token
5. Redirects to /admin/dashboard
6. Each request includes JWT for authentication
7. Server validates token + checks permissions for each action
```

### 2. Permission System
```typescript
// Example permission checking
const permissions = {
  // Product Management
  'view_products': 'Can view product list',
  'create_products': 'Can create new products',
  'edit_products': 'Can edit existing products',
  'delete_products': 'Can delete products',
  'manage_products': 'Full product management access',
  
  // Category Management
  'view_categories': 'Can view categories',
  'manage_categories': 'Can create/edit/delete categories',
  
  // Inventory Management
  'view_inventory': 'Can view inventory levels',
  'edit_inventory': 'Can modify stock quantities',
  'manage_inventory': 'Full inventory management',
  
  // User Management (Superuser only)
  'view_users': 'Can view user list',
  'manage_users': 'Can create/edit users',
  'manage_roles': 'Can manage roles and permissions'
};
```

### 3. Predefined Roles
```typescript
const defaultRoles = [
  {
    name: 'Inventory Manager',
    permissions: [
      'view_products',
      'view_categories', 
      'view_inventory',
      'edit_inventory',
      'manage_inventory'
    ]
  },
  {
    name: 'Product Manager',
    permissions: [
      'view_products',
      'create_products',
      'edit_products',
      'manage_products',
      'view_categories',
      'manage_categories',
      'view_inventory'
    ]
  },
  {
    name: 'Store Manager',
    permissions: [
      'view_products',
      'create_products', 
      'edit_products',
      'manage_products',
      'view_categories',
      'manage_categories',
      'view_inventory',
      'edit_inventory',
      'manage_inventory'
    ]
  },
  {
    name: 'Viewer',
    permissions: [
      'view_products',
      'view_categories',
      'view_inventory'
    ]
  }
];
```

## 📋 Implementation Workflow

When ready to implement, here's the recommended order:

1. **Setup Database & ORM** (Prisma setup with schema)
2. **Authentication System** (NextAuth.js configuration)
3. **Permission Middleware** (API route protection)
4. **Admin Login Page** (matching your design aesthetic)
5. **Dashboard Layout** (sidebar navigation, main content area)
6. **User Management** (superuser features first)
7. **Category Management** (foundation for products)
8. **Product Management** (CRUD operations)
9. **Inventory System** (stock tracking and transactions)
10. **Dashboard Analytics** (overview stats and recent activity)

## 🔒 Security Considerations

- **Password hashing**: bcrypt with salt rounds
- **JWT tokens**: Short-lived with refresh token strategy
- **Rate limiting**: Prevent brute force attacks
- **Input validation**: Comprehensive validation on all inputs
- **SQL injection protection**: Prisma ORM provides protection
- **CSRF protection**: NextAuth.js built-in protection
- **Session management**: Automatic cleanup of expired sessions

## 📝 Current Data Migration

### Existing Products Structure
Based on your current `data.js`, we have:
- 12 coffee products with rich metadata (origin, process, roast)
- 6 merchandise items
- Each product has: id, type, name, description, price, rating, reviews, image
- Coffee products include: origin, process, roast level
- All stored in static array format

### Migration Strategy
1. **Create categories first**: "Coffee", "Merchandise", potentially subcategories like "Single Origin", "Blends", "Equipment", "Apparel"
2. **Import existing products**: Map current product data to new schema
3. **Generate SKUs**: Create unique SKUs for each product
4. **Initialize inventory**: Set initial stock levels for each product
5. **Create seed users**: Set up initial superuser and test roles

## 🎯 Key Features Overview

### For Superuser:
- Complete user management (create, edit, deactivate users)
- Role and permission management
- System-wide settings and configuration
- All product and inventory capabilities

### For Inventory Manager:
- View all products and categories
- Full inventory management (add/remove stock, view transactions)
- Access to low-stock alerts and reorder suggestions
- Cannot create new products or manage users

### For Product Manager:
- Full product and category management
- Can create, edit, and organize products
- View inventory levels (read-only)
- Cannot manage stock quantities or user accounts

### Dashboard Features:
- Recent activity feed
- Low stock alerts
- Sales summary (if order system is added later)
- Quick access to most-used functions
- Permission-based widget visibility

This architecture provides a solid foundation that can scale with your business needs while maintaining the elegant simplicity of your existing website design.

## 📝 Additional Architecture Notes

### Category Hierarchy Design Decision

**Chosen Approach: Self-Referencing Categories**

We chose to use a self-referencing `parentCategoryId` in the Category table rather than a separate SuperCategory table for the following reasons:

#### ✅ Advantages of Self-Referencing Categories
1. **Unlimited Depth**: Supports hierarchies of any depth (Coffee → Single Origin → Ethiopian → Yirgacheffe → Specific Farm)
2. **Simpler Schema**: Single table management instead of complex multi-table relationships
3. **Future Flexibility**: Easy to reorganize and restructure categories as business grows
4. **Industry Standard**: Most e-commerce platforms use this pattern for category management
5. **Better Query Performance**: Recursive queries are well-optimized in modern databases

#### Example Category Structure
```javascript
// Root categories
{ id: "1", name: "Coffee", parentCategoryId: null }
{ id: "2", name: "Equipment", parentCategoryId: null }
{ id: "3", name: "Merchandise", parentCategoryId: null }

// Level 2 categories
{ id: "4", name: "Single Origin", parentCategoryId: "1" }
{ id: "5", name: "Blends", parentCategoryId: "1" }
{ id: "6", name: "Grinders", parentCategoryId: "2" }

// Level 3 categories (expandable as needed)
{ id: "7", name: "Ethiopian", parentCategoryId: "4" }
{ id: "8", name: "Colombian", parentCategoryId: "4" }
```

#### Recursive Query Example
```sql
-- Get complete category tree starting from Coffee
WITH RECURSIVE category_tree AS (
  SELECT id, name, parentCategoryId, 0 as level
  FROM Category 
  WHERE name = 'Coffee'
  
  UNION ALL
  
  SELECT c.id, c.name, c.parentCategoryId, ct.level + 1
  FROM Category c
  JOIN category_tree ct ON c.parentCategoryId = ct.id
)
SELECT * FROM category_tree ORDER BY level, name;
```

#### Alternative Rejected: Separate SuperCategory Table
```sql
-- This approach was rejected because:
SuperCategory {
  id: String (UUID)
  name: String
}

Category {
  id: String (UUID) 
  name: String
  superCategoryId: String (foreign key)
}
```

**Why Rejected:**
- ❌ Limited to only 2 levels of hierarchy
- ❌ Rigid structure difficult to modify
- ❌ More complex relationship management
- ❌ Poor scalability for future category needs

### Implementation Benefits for Coffee Shop
This design supports future expansions like:
- Seasonal coffee collections
- Region-specific product groupings
- Roast profile categorization
- Processing method classifications
- Equipment brand hierarchies

The self-referencing pattern ensures maximum flexibility as the product catalog evolves.

### Product Image Management System

**Chosen Approach: Separate ProductImage Table**

We moved from storing images as JSON in the Product table to a dedicated ProductImage table for better image management:

#### ✅ Advantages of Separate ProductImage Table
1. **Better Data Integrity**: Each image has its own record with validation
2. **Primary Image Selection**: Clear designation of which image is the main product image
3. **Image Ordering**: Control the sequence of images in product galleries
4. **Accessibility Support**: Dedicated alt text field for each image
5. **Audit Trail**: Track when images were added and by whom
6. **Easier Queries**: Simple joins to get product images without JSON parsing

#### ProductImage Table Structure
```sql
ProductImage {
  id: String (UUID)
  productId: String (foreign key to Product)
  imageUrl: String // Full URL or path to image
  altText: String? // Alt text for accessibility
  isPrimary: Boolean (default: false) // Only one primary image per product
  sortOrder: Int (default: 0) // Display order for image gallery
  createdAt: DateTime
  updatedAt: DateTime
  createdBy: String (foreign key to User)
}
```

#### Example Product with Multiple Images
```javascript
// Product: Ethiopia Guji Uraga
Product: {
  id: "prod-001",
  name: "Ethiopia Guji Uraga",
  // ... other product fields
}

// Associated Images
ProductImages: [
  {
    id: "img-001",
    productId: "prod-001",
    imageUrl: "/images/ethiopia-guji-main.jpg",
    altText: "Ethiopia Guji Uraga coffee beans close-up",
    isPrimary: true,
    sortOrder: 1
  },
  {
    id: "img-002", 
    productId: "prod-001",
    imageUrl: "/images/ethiopia-guji-packaging.jpg",
    altText: "Ethiopia Guji Uraga package design",
    isPrimary: false,
    sortOrder: 2
  },
  {
    id: "img-003",
    productId: "prod-001", 
    imageUrl: "/images/ethiopia-guji-brewing.jpg",
    altText: "Ethiopia Guji Uraga being brewed in pour over",
    isPrimary: false,
    sortOrder: 3
  }
]
```

#### Database Constraints & Business Rules
1. **One Primary Image Rule**: Only one image per product can have `isPrimary = true`
2. **Automatic Primary Assignment**: First uploaded image automatically becomes primary
3. **Sort Order Management**: Images display in ascending sortOrder
4. **Cascade Deletion**: When product is deleted, all associated images are removed

#### API Endpoints for Image Management
```
GET    /api/admin/products/[id]/images     // Get all images for a product
POST   /api/admin/products/[id]/images     // Upload new image
PUT    /api/admin/products/[id]/images/[imageId]  // Update image details
DELETE /api/admin/products/[id]/images/[imageId]  // Delete image
PUT    /api/admin/products/[id]/images/[imageId]/primary  // Set as primary image
PUT    /api/admin/products/[id]/images/reorder  // Reorder images
```

#### Benefits for Admin Users
- **Drag & Drop Reordering**: Easy image sequence management
- **Primary Image Selection**: One-click to change main product image
- **Bulk Image Upload**: Upload multiple images at once
- **Image Metadata**: Add descriptions and alt text for SEO
- **Visual Management**: Thumbnail previews in admin interface

### Flexible Threshold & Alert System

**Chosen Approach: Universal ThresholdAlert Table**

We replaced hardcoded reorder points with a flexible threshold system that can handle multiple priority levels and work across different entities:

#### ✅ Advantages of Flexible Threshold System
1. **Multi-Priority Support**: Set multiple alert levels per product (high, medium, low)
2. **Entity Agnostic**: Can monitor products, categories, users, sales targets, etc.
3. **Dynamic Configuration**: Add/modify alerts without schema changes
4. **Rich Alert Context**: Detailed descriptions and suggested actions
5. **Extensible**: Easy to add new alert types as business grows

#### ThresholdAlert Table Structure
```sql
ThresholdAlert {
  id: String (UUID)
  entityType: String // "product", "category", "user", "sales", etc.
  entityId: String // ID of the entity being monitored
  alertType: String // "inventory_low", "inventory_critical", "sales_target", etc.
  priority: String // "LOW", "MEDIUM", "HIGH", "CRITICAL"
  thresholdValue: Decimal // The trigger value
  comparisonOperator: String // "LESS_THAN", "GREATER_THAN", "EQUALS"
  actionValue: Decimal? // Suggested action value (e.g., reorder quantity)
  title: String // Alert title for display
  description: String? // Detailed alert description
  isActive: Boolean (default: true)
  metadata: Json // Flexible field for alert-specific data
  createdAt: DateTime
  updatedAt: DateTime
  createdBy: String (foreign key to User)
}
```

#### Real-World Examples

**Multiple Priority Inventory Alerts:**
```javascript
// Critical Priority - Panama Geisha (Premium Product)
{
  id: "alert-001",
  entityType: "product",
  entityId: "prod-panama-geisha",
  alertType: "inventory_critical",
  priority: "CRITICAL",
  thresholdValue: 2,
  comparisonOperator: "LESS_THAN_OR_EQUAL",
  actionValue: 10,
  title: "CRITICAL: Panama Geisha Almost Out of Stock",
  description: "Immediate reorder required to prevent stockout",
  metadata: {
    "supplier": "Panama Coffee Estates",
    "leadTime": "14 days",
    "estimatedCost": 850.00,
    "notificationChannels": ["email", "sms", "dashboard"]
  }
}

// High Priority - Same Product
{
  id: "alert-002",
  entityType: "product", 
  entityId: "prod-panama-geisha",
  alertType: "inventory_low",
  priority: "HIGH",
  thresholdValue: 5,
  comparisonOperator: "LESS_THAN_OR_EQUAL",
  actionValue: 20,
  title: "HIGH: Panama Geisha Low Stock",
  description: "Consider placing order soon to maintain stock levels",
  metadata: {
    "supplier": "Panama Coffee Estates",
    "leadTime": "14 days",
    "estimatedCost": 1700.00
  }
}

// Medium Priority - Regular Product
{
  id: "alert-003",
  entityType: "product",
  entityId: "prod-house-blend",
  alertType: "inventory_low", 
  priority: "MEDIUM",
  thresholdValue: 25,
  comparisonOperator: "LESS_THAN",
  actionValue: 100,
  title: "MEDIUM: House Blend Stock Running Low",
  description: "Popular item needs restocking within next week",
  metadata: {
    "supplier": "Local Coffee Roasters",
    "leadTime": "3 days",
    "estimatedCost": 1200.00
  }
}
```

**Category-Level Alerts:**
```javascript
// Monitor entire coffee category
{
  id: "alert-004",
  entityType: "category",
  entityId: "cat-coffee",
  alertType: "category_low_stock_percentage",
  priority: "HIGH",
  thresholdValue: 30, // 30% of coffee products are low stock
  comparisonOperator: "GREATER_THAN",
  actionValue: null,
  title: "Category Alert: Coffee Section Low Stock",
  description: "30% or more coffee products are running low on inventory"
}
```

**Sales Performance Alerts:**
```javascript
// Daily sales target monitoring
{
  id: "alert-005",
  entityType: "product",
  entityId: "prod-ethiopia-guji",
  alertType: "sales_target_low",
  priority: "MEDIUM",
  thresholdValue: 5, // Less than 5 units sold today
  comparisonOperator: "LESS_THAN",
  actionValue: null,
  title: "Sales Alert: Ethiopia Guji Underperforming",
  description: "Daily sales below expected target - consider promotion"
}
```

**User Activity Monitoring:**
```javascript
// Monitor admin activity
{
  id: "alert-006", 
  entityType: "user",
  entityId: "user-admin-001",
  alertType: "user_inactive",
  priority: "LOW",
  thresholdValue: 7, // 7 days without login
  comparisonOperator: "GREATER_THAN",
  actionValue: null,
  title: "User Inactive: Admin hasn't logged in",
  description: "Admin user hasn't accessed system in over a week"
}
```

#### Alert Priority Levels

**CRITICAL** 🚨
- Immediate action required
- SMS + Email notifications
- Dashboard red alerts
- Auto-escalation to manager

**HIGH** ⚠️
- Action needed within 24 hours
- Email notifications
- Dashboard orange alerts
- Daily summary reports

**MEDIUM** 🔔
- Action needed within week
- Dashboard notifications
- Weekly summary reports

**LOW** ℹ️
- Informational alerts
- Dashboard info panels
- Monthly reports

#### API Endpoints for Threshold Management
```
GET    /api/admin/alerts/thresholds         // List all threshold alerts
POST   /api/admin/alerts/thresholds         // Create new threshold alert
GET    /api/admin/alerts/thresholds/[id]    // Get specific threshold
PUT    /api/admin/alerts/thresholds/[id]    // Update threshold
DELETE /api/admin/alerts/thresholds/[id]    // Delete threshold

GET    /api/admin/alerts/active             // Get currently triggered alerts
GET    /api/admin/alerts/history            // Get alert history
POST   /api/admin/alerts/[id]/acknowledge   // Mark alert as acknowledged
POST   /api/admin/alerts/test               // Test alert configuration
```

#### Dashboard Integration

**Alert Summary Widget:**
```javascript
{
  "criticalAlerts": 2,
  "highAlerts": 5, 
  "mediumAlerts": 12,
  "lowAlerts": 3,
  "recentAlerts": [
    {
      "priority": "CRITICAL",
      "title": "Panama Geisha Almost Out of Stock",
      "triggeredAt": "2025-10-11T14:30:00Z",
      "actionValue": 10,
      "estimatedCost": "$850.00"
    }
  ]
}
```

#### Benefits for Your Coffee Business
1. **Smart Inventory Management**: Different products get appropriate attention levels
2. **Cost Optimization**: Avoid over-ordering low-priority items
3. **Revenue Protection**: Never run out of high-margin products
4. **Scalable Monitoring**: Easy to add new alert types as business grows
5. **Data-Driven Decisions**: Historical alert data helps optimize thresholds

This flexible system grows with your business and can monitor anything you need to track!