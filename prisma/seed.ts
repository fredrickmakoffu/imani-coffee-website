import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// Default permissions for our coffee shop system
const defaultPermissions = [
  // User Management (Superuser only)
  { name: 'view_users', description: 'Can view user list', module: 'users', action: 'read' },
  { name: 'create_users', description: 'Can create new users', module: 'users', action: 'create' },
  { name: 'edit_users', description: 'Can edit existing users', module: 'users', action: 'update' },
  { name: 'delete_users', description: 'Can delete/deactivate users', module: 'users', action: 'delete' },
  { name: 'manage_users', description: 'Full user management access', module: 'users', action: 'manage' },
  
  // Role Management (Superuser only)
  { name: 'view_roles', description: 'Can view roles', module: 'roles', action: 'read' },
  { name: 'create_roles', description: 'Can create new roles', module: 'roles', action: 'create' },
  { name: 'edit_roles', description: 'Can edit existing roles', module: 'roles', action: 'update' },
  { name: 'delete_roles', description: 'Can delete roles', module: 'roles', action: 'delete' },
  { name: 'manage_roles', description: 'Can manage roles and permissions', module: 'roles', action: 'manage' },
  
  // Category Management
  { name: 'view_categories', description: 'Can view categories', module: 'categories', action: 'read' },
  { name: 'create_categories', description: 'Can create new categories', module: 'categories', action: 'create' },
  { name: 'edit_categories', description: 'Can edit existing categories', module: 'categories', action: 'update' },
  { name: 'delete_categories', description: 'Can delete categories', module: 'categories', action: 'delete' },
  { name: 'manage_categories', description: 'Full category management', module: 'categories', action: 'manage' },
  
  // Product Management
  { name: 'view_products', description: 'Can view product list', module: 'products', action: 'read' },
  { name: 'create_products', description: 'Can create new products', module: 'products', action: 'create' },
  { name: 'edit_products', description: 'Can edit existing products', module: 'products', action: 'update' },
  { name: 'delete_products', description: 'Can delete products', module: 'products', action: 'delete' },
  { name: 'manage_products', description: 'Full product management access', module: 'products', action: 'manage' },
  
  // Inventory Management
  { name: 'view_inventory', description: 'Can view inventory levels', module: 'inventory', action: 'read' },
  { name: 'edit_inventory', description: 'Can modify stock quantities', module: 'inventory', action: 'update' },
  { name: 'manage_inventory', description: 'Full inventory management', module: 'inventory', action: 'manage' },
  
  // Alert/Threshold Management
  { name: 'view_alerts', description: 'Can view alerts and thresholds', module: 'alerts', action: 'read' },
  { name: 'manage_alerts', description: 'Can create and modify alerts', module: 'alerts', action: 'manage' },
]

// Default roles with their permissions
const defaultRoles = [
  {
    name: 'Superuser',
    description: 'Full system access - can manage everything including users and roles',
    permissions: defaultPermissions.map(p => p.name) // All permissions
  },
  {
    name: 'Store Manager',
    description: 'Can manage products, categories, and inventory but not users/roles',
    permissions: [
      'view_categories', 'create_categories', 'edit_categories', 'delete_categories', 'manage_categories',
      'view_products', 'create_products', 'edit_products', 'delete_products', 'manage_products',
      'view_inventory', 'edit_inventory', 'manage_inventory',
      'view_alerts', 'manage_alerts'
    ]
  },
  {
    name: 'Product Manager',
    description: 'Can manage products and categories, view inventory (read-only)',
    permissions: [
      'view_categories', 'create_categories', 'edit_categories', 'manage_categories',
      'view_products', 'create_products', 'edit_products', 'manage_products',
      'view_inventory',
      'view_alerts'
    ]
  },
  {
    name: 'Inventory Manager',
    description: 'Can manage inventory and view products, but cannot create/edit products',
    permissions: [
      'view_categories',
      'view_products',
      'view_inventory', 'edit_inventory', 'manage_inventory',
      'view_alerts', 'manage_alerts'
    ]
  },
  {
    name: 'Viewer',
    description: 'Read-only access to products, categories, and inventory',
    permissions: [
      'view_categories',
      'view_products',
      'view_inventory',
      'view_alerts'
    ]
  }
]

// Default categories for coffee shop
const defaultCategories = [
  {
    name: 'Coffee',
    description: 'All coffee products including beans and grounds',
    slug: 'coffee',
    sortOrder: 1
  },
  {
    name: 'Equipment',
    description: 'Coffee brewing equipment and accessories',
    slug: 'equipment',
    sortOrder: 2
  },
  {
    name: 'Merchandise',
    description: 'Branded merchandise and accessories',
    slug: 'merchandise',
    sortOrder: 3
  }
]

// Subcategories
const defaultSubcategories = [
  // Coffee subcategories
  {
    name: 'Single Origin',
    description: 'Coffee from a single farm or region',
    slug: 'single-origin',
    parentSlug: 'coffee',
    sortOrder: 1
  },
  {
    name: 'Blends',
    description: 'Carefully crafted coffee blends',
    slug: 'blends',
    parentSlug: 'coffee',
    sortOrder: 2
  },
  {
    name: 'Decaf',
    description: 'Decaffeinated coffee options',
    slug: 'decaf',
    parentSlug: 'coffee',
    sortOrder: 3
  },
  // Equipment subcategories
  {
    name: 'Grinders',
    description: 'Coffee grinders and mills',
    slug: 'grinders',
    parentSlug: 'equipment',
    sortOrder: 1
  },
  {
    name: 'Brewing Tools',
    description: 'Pour over drippers, French presses, and brewing accessories',
    slug: 'brewing-tools',
    parentSlug: 'equipment',
    sortOrder: 2
  },
  // Merchandise subcategories
  {
    name: 'Apparel',
    description: 'T-shirts, hoodies, and branded clothing',
    slug: 'apparel',
    parentSlug: 'merchandise',
    sortOrder: 1
  },
  {
    name: 'Mugs & Cups',
    description: 'Coffee mugs, cups, and drinkware',
    slug: 'mugs-cups',
    parentSlug: 'merchandise',
    sortOrder: 2
  }
]

async function seed() {
  try {
    console.log('🌱 Starting database seeding...')

    // Create permissions
    console.log('📋 Creating permissions...')
    for (const permission of defaultPermissions) {
      await prisma.permission.upsert({
        where: { name: permission.name },
        update: {},
        create: permission
      })
    }
    console.log(`✅ Created ${defaultPermissions.length} permissions`)

    // Create roles and assign permissions
    console.log('👥 Creating roles...')
    for (const roleData of defaultRoles) {
      const role = await prisma.role.upsert({
        where: { name: roleData.name },
        update: { description: roleData.description },
        create: {
          name: roleData.name,
          description: roleData.description
        }
      })

      // Clear existing permissions and add new ones
      await prisma.rolePermission.deleteMany({
        where: { roleId: role.id }
      })

      // Add permissions to role
      for (const permissionName of roleData.permissions) {
        const permission = await prisma.permission.findUnique({
          where: { name: permissionName }
        })
        
        if (permission) {
          await prisma.rolePermission.create({
            data: {
              roleId: role.id,
              permissionId: permission.id
            }
          })
        }
      }
    }
    console.log(`✅ Created ${defaultRoles.length} roles with permissions`)

    // Create superuser
    console.log('👤 Creating superuser...')
    const superuserRole = await prisma.role.findUnique({
      where: { name: 'Superuser' }
    })

    if (!superuserRole) {
      throw new Error('Superuser role not found')
    }

    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const superuser = await prisma.user.upsert({
      where: { email: 'admin@imanicoffee.com' },
      update: {},
      create: {
        email: 'admin@imanicoffee.com',
        passwordHash: hashedPassword,
        name: 'Super Admin',
        isSuperuser: true,
        roleId: superuserRole.id
      }
    })
    console.log(`✅ Created superuser: ${superuser.email}`)

    // Create default categories
    console.log('📁 Creating categories...')
    for (const categoryData of defaultCategories) {
      await prisma.category.upsert({
        where: { slug: categoryData.slug },
        update: {},
        create: {
          ...categoryData,
          createdById: superuser.id
        }
      })
    }

    // Create subcategories
    for (const subcategoryData of defaultSubcategories) {
      const parentCategory = await prisma.category.findUnique({
        where: { slug: subcategoryData.parentSlug }
      })

      if (parentCategory) {
        await prisma.category.upsert({
          where: { slug: subcategoryData.slug },
          update: {},
          create: {
            name: subcategoryData.name,
            description: subcategoryData.description,
            slug: subcategoryData.slug,
            sortOrder: subcategoryData.sortOrder,
            parentCategoryId: parentCategory.id,
            createdById: superuser.id
          }
        })
      }
    }
    console.log(`✅ Created ${defaultCategories.length + defaultSubcategories.length} categories`)

    console.log('🎉 Database seeding completed successfully!')
    console.log('')
    console.log('📋 Summary:')
    console.log(`   👤 Superuser: admin@imanicoffee.com (password: admin123)`)
    console.log(`   📋 Permissions: ${defaultPermissions.length}`)
    console.log(`   👥 Roles: ${defaultRoles.length}`)
    console.log(`   📁 Categories: ${defaultCategories.length + defaultSubcategories.length}`)
    console.log('')
    console.log('🔐 Login credentials:')
    console.log('   Email: admin@imanicoffee.com')
    console.log('   Password: admin123')
    console.log('   (Please change this password in production!)')

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seed function
seed()