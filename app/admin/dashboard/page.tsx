"use client";

import { useEffect, useState } from 'react';
import { Trash2, Users, Shield, Package, Boxes,  PenBox,  Edit3Icon, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

export default function Dashboard() {
  // Pagination state for assigned permissions in Manage Permissions modal
  const [assignedPermPage, setAssignedPermPage] = useState(0);
  // Manage Permissions modal state for roles
  const [showManagePermissionsModal, setShowManagePermissionsModal] = useState(false);

  // Ensure permissions are loaded when opening Manage Permissions modal
  useEffect(() => {
    if (showManagePermissionsModal && permissions.length === 0 && !permissionsLoading) {
      setPermissionsLoading(true);
      fetch('/api/admin/permissions')
        .then(res => res.json())
        .then(data => {
          setPermissions(Array.isArray(data) ? data : []);
          setPermissionsLoading(false);
        })
        .catch(() => setPermissionsLoading(false));
    }
  }, [showManagePermissionsModal]);
  // Pagination state for add permissions modal
  const [addPermPage, setAddPermPage] = useState(0);

  // Loading states for actions
  const [addLoading, setAddLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  // Add modal state
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Modal state and selected user
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  
  // Roles state for roles tab
  const [roles, setRoles] = useState<any[]>([]);
  const [rolesLoading, setRolesLoading] = useState(false);
  
  // Add Role modal state
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [addRoleLoading, setAddRoleLoading] = useState(false);
  
  // Update Role modal state
  const [showEditRoleModal, setShowEditRoleModal] = useState(false);
  const [editRoleLoading, setEditRoleLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<any>(null);
  
  // Delete Role modal state
  const [showDeleteRoleModal, setShowDeleteRoleModal] = useState(false);
  const [deleteRoleLoading, setDeleteRoleLoading] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<any>(null);
  
  // Permissions state and modals
  const [permissions, setPermissions] = useState<any[]>([]);
  const [permissionsLoading, setPermissionsLoading] = useState(false);
  const [showAddPermissionModal, setShowAddPermissionModal] = useState(false);
  const [addPermissionLoading, setAddPermissionLoading] = useState(false);
  const [showEditPermissionModal, setShowEditPermissionModal] = useState(false);
  const [editPermissionLoading, setEditPermissionLoading] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<any>(null);
  const [showDeletePermissionModal, setShowDeletePermissionModal] = useState(false);
  const [deletePermissionLoading, setDeletePermissionLoading] = useState(false);
  const [permissionToDelete, setPermissionToDelete] = useState<any>(null);

  // Ensure permissions are loaded when opening Manage Permissions modal
  useEffect(() => {
    if (showManagePermissionsModal && permissions.length === 0 && !permissionsLoading) {
      setPermissionsLoading(true);
      fetch('/api/admin/permissions')
        .then(res => res.json())
        .then(data => {
          setPermissions(Array.isArray(data) ? data : []);
          setPermissionsLoading(false);
        })
        .catch(() => setPermissionsLoading(false));
    }
  }, [showManagePermissionsModal]);
  // State for manage permissions modal tables (must be before any usage)
  const [showAddPermissionsTable, setShowAddPermissionsTable] = useState(false);
  // Selected permission IDs for bulk assign/unassign
  const [selectedUnassignPermissions, setSelectedUnassignPermissions] = useState<string[]>([]);
  const [selectedAssignPermissions, setSelectedAssignPermissions] = useState<string[]>([]);
    // Move pagination variables below all useState declarations
  // Pagination for add permissions modal (must be after permissions and addPermPage are defined)
  const pageSize = 10;
  const totalPages = Math.ceil(permissions.length / pageSize);
  const paginatedPermissions = permissions.slice(addPermPage * pageSize, (addPermPage + 1) * pageSize);

  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const tabs = [
  { label: 'Users', key: 'users', icon: <Users className="inline-block mr-2 h-5 w-5" /> },
  { label: 'Roles', key: 'roles', icon: <Shield className="inline-block mr-2 h-5 w-5" /> },
  { label: 'Permissions', key: 'permissions', icon: <PenBox className="inline-block mr-2 h-5 w-5" /> },
  { label: 'Products', key: 'products', icon: <Package className="inline-block mr-2 h-5 w-5" /> },
  { label: 'Inventory', key: 'inventory', icon: <Boxes className="inline-block mr-2 h-5 w-5" /> },
  ];
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<any[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

      // Products CRUD state (must be before any usage)
      const [products, setProducts] = useState<any[]>([]);
      const [productsLoading, setProductsLoading] = useState(false);
      const [showAddProductModal, setShowAddProductModal] = useState(false);
      const [addProductLoading, setAddProductLoading] = useState(false);
      const [showEditProductModal, setShowEditProductModal] = useState(false);
      const [editProductLoading, setEditProductLoading] = useState(false);
      const [selectedProduct, setSelectedProduct] = useState<any>(null);
      const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
      const [deleteProductLoading, setDeleteProductLoading] = useState(false);
      const [productToDelete, setProductToDelete] = useState<any>(null);
      const [productPage, setProductPage] = useState(0);
      const productPageSize = 10;
      const productTotalPages = Math.ceil(products.length / productPageSize);
      // Categories for product form
      const [categories, setCategories] = useState<any[]>([]);
  // Inventory state
  const [inventory, setInventory] = useState<any[]>([]);
  const [inventoryLoading, setInventoryLoading] = useState(false);
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [inventoryActionLoading, setInventoryActionLoading] = useState(false);
  const [inventoryProduct, setInventoryProduct] = useState<any>(null);
  const [inventoryQuantity, setInventoryQuantity] = useState(0);
  const [inventoryAction, setInventoryAction] = useState<'add'|'remove'>('add');
  // Inventory movements state
  const [inventoryMovements, setInventoryMovements] = useState<any[]>([]);
  const [inventoryMovementsLoading, setInventoryMovementsLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'products') {
      setProductsLoading(true);
      fetch('/api/admin/products')
        .then(res => res.json())
        .then(data => {
          setProducts(Array.isArray(data) ? data : []);
          setProductsLoading(false);
        })
        .catch(() => setProductsLoading(false));
      // Fetch categories for product form from backend
      fetch('/api/admin/categories')
        .then(res => res.json())
        .then(data => setCategories(Array.isArray(data) ? data : []));
      // Fetch inventory for products
      setInventoryLoading(true);
      fetch('/api/admin/inventory')
        .then(res => res.json())
        .then(data => {
          setInventory(Array.isArray(data) ? data : []);
          setInventoryLoading(false);
        })
        .catch(() => setInventoryLoading(false));
    }
    if (activeTab === 'inventory') {
      setInventoryMovementsLoading(true);
      fetch('/api/admin/inventory/movements')
        .then(res => res.json())
        .then(data => {
          setInventoryMovements(Array.isArray(data) ? data : []);
          setInventoryMovementsLoading(false);
        })
        .catch(() => setInventoryMovementsLoading(false));
    }
  }, [activeTab]);
  
    // Permission actions state
  const [permissionActions, setPermissionActions] = useState<string[]>([]);
  useEffect(() => {
    fetch('/api/admin/permissions/actions')
      .then(res => res.json())
      .then(data => {
        setPermissionActions(Array.isArray(data) ? data : []);
      });
  }, []);

  useEffect(() => {
    if (activeTab === 'permissions') {
      setPermissionsLoading(true);
      fetch('/api/admin/permissions')
        .then(res => res.json())
        .then(data => {
          setPermissions(Array.isArray(data) ? data : []);
          setPermissionsLoading(false);
        })
        .catch(() => setPermissionsLoading(false));
    }
    if (activeTab === 'roles') {
      setRolesLoading(true);
      fetch('/api/admin/roles')
        .then(res => res.json())
        .then(data => {
          setRoles(Array.isArray(data) ? data : []);
          setRolesLoading(false);
        })
        .catch(() => setRolesLoading(false));
    }
  }, [activeTab]);



  // TanStack Table columns - always at top level
  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Role',
      cell: ({ row }: any) => row.original.role?.name || 'No role',
    },
    {
      header: 'Active',
      cell: ({ row }: any) => (
        <span className={row.original.isActive 
          ? 'bg-green-200 px-3 py-2 rounded text-green-600 text-[14px]' 
          : 'bg-red-200 px-3 py-2 rounded text-red-600 text-[14px]'}>
          {row.original.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      header: 'Actions',
      cell: ({ row }: any) => (
        <div className="flex gap-2">
            <button
              className="text-gray-600 bg-blue-200 hover:bg-blue-100 px-3 py-2 rounded flex text-[14px]"
              title="Update"
              onClick={() => {
                setSelectedUser(row.original);
                setShowModal(true);
              }}
              >
              <span className="sr-only">Update</span>
              <Edit3Icon className="h-3 w-3 mr-1 mt-1" /> Update
            </button>
            
            <button
              className="text-gray-600 bg-red-200 hover:bg-red-100 px-3 py-2 rounded flex text-[14px]"
              title="Delete"
              onClick={() => {
                setUserToDelete(row.original);
                setShowDeleteModal(true);
              }}
              >
              <span className="sr-only">Delete</span>
              <Trash2 className="h-3 w-3 mr-1 mt-1" /> Delete
            </button>
        </div>
      ),
    },
  ];

  // Table instance - always at top level
  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/admin/login');
        return;
      }
      try {
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          router.push('/admin/login');
          return;
        }
        const data = await res.json();
        if (data.role !== 'superuser') {
          alert('Access denied. Superuser role is required.');
          router.push('/admin/login');
          return;
        }
        setUser(data);
        setLoading(false);
      } catch (error) {
        router.push('/admin/login');
      }
    }
    fetchUser();
  }, [router]);

  useEffect(() => {
    if (activeTab === 'users') {
      setUsersLoading(true);
      const token = localStorage.getItem('token');
      fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          setUsers(Array.isArray(data) ? data : []);
          setUsersLoading(false);
        })
        .catch(() => setUsersLoading(false));
    }
  }, [activeTab]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-bridal-health pb-8">
      {/* Navbar */}
      <nav className="border-b border-gray-200 px-8 py-6 flex items-center justify-between">
        <div className="flex gap-4">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`px-2 py-1 rounded transition-colors flex items-center gap-2 ${activeTab === tab.key ? 'bg-gray-900 text-gray-100 border border-gray-700 shadow-sm' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Tab Content */}
      <main className="flex-grow p-8">
        {activeTab === 'permissions' && (
          <div>
            <div className="flex items-center mb-0">
              <div>
                <h2 className="text-xl font-bold">Permissions</h2>
                <p className="text-gray-600 mb-4">Manage permissions independently from roles.</p>
              </div>
              <button
                className="px-3 py-2 rounded text-gray-600 bg-blue-200 hover:bg-blue-100 flex items-center gap-2 ml-auto"
                onClick={() => setShowAddPermissionModal(true)}
                title="Add Permission"
              >
                <span className="text-lg">+</span> Add Permission
              </button>
            </div>
            {permissionsLoading ? (
              <div>Loading permissions...</div>
            ) : (
              <table className="min-w-full border border-gray-300 rounded">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left border-b">Name</th>
                    <th className="px-4 py-2 text-left border-b">Description</th>
                    <th className="px-4 py-2 text-left border-b">Module</th>
                    <th className="px-4 py-2 text-left border-b">Action</th>
                    <th className="px-4 py-2 text-left border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {permissions.map(permission => (
                    <tr key={permission.id} className="bg-white hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">{permission.name}</td>
                      <td className="px-4 py-2 border-b">{permission.description}</td>
                      <td className="px-4 py-2 border-b">{permission.module}</td>
                      <td className="px-4 py-2 border-b">{permission.action}</td>
                      <td className="px-4 py-2 border-b flex gap-2">
                        <button
                          className="text-gray-600 bg-blue-200 hover:bg-blue-100 px-3 py-2 rounded flex text-[14px]"
                          title="Edit"
                          onClick={() => { setSelectedPermission(permission); setShowEditPermissionModal(true); }}
                        >
                          <Edit3Icon className="h-3 w-3 mr-1 mt-1" /> Edit
                        </button>
                        <button
                          className="text-gray-600 bg-red-200 hover:bg-red-100 px-3 py-2 rounded flex text-[14px]"
                          title="Delete"
                          onClick={() => { setPermissionToDelete(permission); setShowDeletePermissionModal(true); }}
                        >
                          <Trash2 className="h-3 w-3 mr-1 mt-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Add Permission Modal */}
            {showAddPermissionModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                    onClick={() => setShowAddPermissionModal(false)}
                    title="Close"
                  >
                    <XCircle className="h-5 w-5 text-gray-400 hover:text-gray-700" />
                  </button>
                  <h3 className="text-lg font-bold mb-4">Add Permission</h3>
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setAddPermissionLoading(true);
                      const formData = new FormData(e.currentTarget);
                      const newPermission = {
                        name: formData.get('name'),
                        description: formData.get('description'),
                        module: formData.get('module'),
                        action: formData.get('action'),
                      };
                      try {
                        const token = localStorage.getItem('token');
                        const res = await fetch('/api/admin/permissions', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(newPermission),
                        });
                        if (res.ok) {
                          const permissionData = await res.json();
                          setPermissions(perms => [...perms, permissionData]);
                        }
                      } catch (err) {}
                      setAddPermissionLoading(false);
                      setShowAddPermissionModal(false);
                    }}
                  >
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Name</span>
                      <input name="name" className="border rounded px-3 py-2" required />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Description</span>
                      <input name="description" className="border rounded px-3 py-2" required />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Module</span>
                      <input name="module" className="border rounded px-3 py-2" required />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Action</span>
                      <select name="action" className="border rounded px-3 py-2" required>
                        <option value="" disabled>Select an action</option>
                        {permissionActions.map(action => (
                          <option key={action} value={action}>{action}</option>
                        ))}
                      </select>
                    </label>
                    <div className="flex gap-2 justify-end mt-4">
                      <button type="button" className="px-4 py-2 rounded bg-gray-200 text-gray-700" onClick={() => setShowAddPermissionModal(false)}>Cancel</button>
                      <button type="submit" className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold flex items-center justify-center ${addPermissionLoading ? 'opacity-70 cursor-not-allowed' : ''}`} disabled={addPermissionLoading}>
                        {addPermissionLoading ? (
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                          </svg>
                        ) : null}
                        {addPermissionLoading ? 'Creating...' : 'Create'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Edit Permission Modal */}
            {showEditPermissionModal && selectedPermission && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                  <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setShowEditPermissionModal(false)} title="Close">
                    <XCircle className="h-5 w-5 text-gray-400 hover:text-gray-700" />
                  </button>
                  <h3 className="text-lg font-bold mb-4">Edit Permission</h3>
                  <form className="flex flex-col gap-4" onSubmit={async (e) => {
                    e.preventDefault();
                    setEditPermissionLoading(true);
                    const formData = new FormData(e.currentTarget);
                    const updatedPermission = {
                      name: formData.get('name'),
                      description: formData.get('description'),
                      module: formData.get('module'),
                      action: formData.get('action'),
                    };
                    try {
                      const token = localStorage.getItem('token');
                      const res = await fetch(`/api/admin/permissions/${selectedPermission.id}`, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(updatedPermission),
                      });
                      if (res.ok) {
                        const permissionData = await res.json();
                        setPermissions(perms => perms.map(p => p.id === permissionData.id ? permissionData : p));
                      }
                    } catch (err) {}
                    setEditPermissionLoading(false);
                    setShowEditPermissionModal(false);
                    setSelectedPermission(null);
                  }}>
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Name</span>
                      <input name="name" defaultValue={selectedPermission.name} className="border rounded px-3 py-2" required />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Description</span>
                      <input name="description" defaultValue={selectedPermission.description} className="border rounded px-3 py-2" required />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Module</span>
                      <input name="module" defaultValue={selectedPermission.module} className="border rounded px-3 py-2" required />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Action</span>
                      <select name="action" defaultValue={selectedPermission.action} className="border rounded px-3 py-2" required>
                        <option value="" disabled>Select an action</option>
                        {permissionActions.map(action => (
                          <option key={action} value={action}>{action}</option>
                        ))}
                      </select>
                    </label>
                    <div className="flex gap-2 justify-end mt-4">
                      <button type="button" className="px-4 py-2 rounded bg-gray-200 text-gray-700" onClick={() => { setShowEditPermissionModal(false); setSelectedPermission(null); }}>Cancel</button>
                      <button type="submit" className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold flex items-center justify-center ${editPermissionLoading ? 'opacity-70 cursor-not-allowed' : ''}`} disabled={editPermissionLoading}>
                        {editPermissionLoading ? (
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                          </svg>
                        ) : null}
                        {editPermissionLoading ? 'Updating...' : 'Update'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Delete Permission Modal */}
            {showDeletePermissionModal && permissionToDelete && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                  <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setShowDeletePermissionModal(false)} title="Close">
                    <XCircle className="h-5 w-5 text-gray-400 hover:text-gray-700" />
                  </button>
                  <h3 className="text-lg font-bold mb-4">Delete Permission</h3>
                  <p className="mb-6">Are you sure you want to delete <span className="font-semibold">{permissionToDelete.name}</span>? This action cannot be undone.</p>
                  <div className="flex gap-2 justify-end mt-4">
                    <button type="button" className="px-4 py-2 rounded bg-gray-200 text-gray-700" onClick={() => setShowDeletePermissionModal(false)}>Cancel</button>
                    <button type="button" className={`px-4 py-2 rounded bg-red-600 text-white font-semibold flex items-center justify-center ${deletePermissionLoading ? 'opacity-70 cursor-not-allowed' : ''}`} disabled={deletePermissionLoading} onClick={async () => {
                      setDeletePermissionLoading(true);
                      const token = localStorage.getItem('token');
                      const res = await fetch(`/api/admin/permissions/${permissionToDelete.id}`, {
                        method: 'DELETE',
                        headers: { Authorization: `Bearer ${token}` },
                      });
                      if (res.ok) {
                        setPermissions(perms => perms.filter(p => p.id !== permissionToDelete.id));
                      }
                      setDeletePermissionLoading(false);
                      setShowDeletePermissionModal(false);
                      setPermissionToDelete(null);
                    }}>
                      {deletePermissionLoading ? (
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                      ) : null}
                      {deletePermissionLoading ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'users' && (
        <div>
          <div className="flex items-center mb-0">
            <div>
              <h2 className="text-xl font-bold">User Management</h2>
              <p className="text-gray-600 mb-4">Manage user accounts and permissions.</p>
            </div>

            <button
              className="px-3 py-2 rounded text-gray-600 bg-blue-200 hover:bg-blue-100 flex items-center gap-2 ml-auto"
              onClick={() => setShowAddModal(true)}
              title="Add User"
            >
              <span className="text-lg">+</span> Add User
            </button>            
          </div>

          {usersLoading ? (
            <div>Loading users...</div>
          ) : (
            <table className="min-w-full border border-gray-300 rounded">
              <thead className="bg-gray-100">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th key={header.id} className="px-4 py-2 text-left border-b">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="bg-white hover:bg-gray-50">
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-4 py-2 border-b">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        )}

        {/* Add User Modal */}
        {typeof showAddModal !== 'undefined' && showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                onClick={() => setShowAddModal(false)}
                title="Close"
              >
                <XCircle className="h-5 w-5 text-gray-400 hover:text-gray-700" />
              </button>
              <h3 className="text-lg font-bold mb-4">Add User</h3>
              <form
                className="flex flex-col gap-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setAddLoading(true);
                  const formData = new FormData(e.currentTarget);
                  const newUser = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                    roleId: formData.get('roleId'),
                  };
                  try {
                    const token = localStorage.getItem('token');
                    const res = await fetch('/api/admin/users', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify(newUser),
                    });
                    if (res.ok) {
                      const userData = await res.json();
                      setUsers(users => [...users, userData]);
                    } else {
                      // Optionally handle error
                    }
                  } catch (err) {
                    // Optionally handle error
                  }
                  setAddLoading(false);
                  setShowAddModal(false);
                }}
              >
                <label className="flex flex-col gap-1">
                  <span className="font-medium">Name</span>
                  <input
                    name="name"
                    className="border rounded px-3 py-2"
                    required
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="font-medium">Email</span>
                  <input
                    name="email"
                    type="email"
                    className="border rounded px-3 py-2"
                    required
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="font-medium">Password</span>
                  <input
                    name="password"
                    type="password"
                    className="border rounded px-3 py-2"
                    required
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="font-medium">Role</span>
                  {rolesLoading ? (
                    <span className="text-xs text-gray-500">Loading roles...</span>
                  ) : (
                    <select
                      name="roleId"
                      className="border rounded px-3 py-2"
                      required
                    >
                      <option value="" disabled>Select a role</option>
                      {roles.map((role: any) => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </select>
                  )}
                </label>
                <div className="flex gap-2 justify-end mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold flex items-center justify-center ${addLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={addLoading}
                  >
                    {addLoading ? (
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                    ) : null}
                    {addLoading ? 'Creating...' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}        

        {/* Update User Modal */}
        {showModal && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                onClick={() => setShowModal(false)}
                title="Close"
              >
                <XCircle className="h-5 w-5 text-gray-400 hover:text-gray-700" />
              </button>
              <h3 className="text-lg font-bold mb-4">Update User</h3>
              <form
                className="flex flex-col gap-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setUpdateLoading(true);
                  const formData = new FormData(e.currentTarget);
                  const updatedUser = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    isActive: formData.get('isActive') === 'true',
                    roleId: formData.get('roleId'),
                  };
                  try {
                    const token = localStorage.getItem('token');
                    const res = await fetch(`/api/admin/users/${selectedUser.id}`, {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify(updatedUser),
                    });
                    if (res.ok) {
                      const userData = await res.json();
                      setUsers(users => users.map(u => u.id === userData.id ? userData : u));
                    } else {
                      // Optionally handle error
                    }
                  } catch (err) {
                    // Optionally handle error
                  }
                  setUpdateLoading(false);
                  setShowModal(false);
                }}
              >
                <label className="flex flex-col gap-1">
                  <span className="font-medium">Name</span>
                  <input
                    name="name"
                    defaultValue={selectedUser.name}
                    className="border rounded px-3 py-2"
                    required
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="font-medium">Email</span>
                  <input
                    name="email"
                    type="email"
                    defaultValue={selectedUser.email}
                    className="border rounded px-3 py-2"
                    required
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="font-medium">Status</span>
                  <select
                    name="isActive"
                    defaultValue={selectedUser.isActive ? 'true' : 'false'}
                    className="border rounded px-3 py-2"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </label>
                <label className="flex flex-col gap-1">
                  <span className="font-medium">Role</span>
                  {rolesLoading ? (
                    <span className="text-xs text-gray-500">Loading roles...</span>
                  ) : (
                    <select
                      name="roleId"
                      defaultValue={selectedUser.roleId || ''}
                      className="border rounded px-3 py-2"
                      required
                    >
                      <option value="" disabled>Select a role</option>
                      {roles.map((role: any) => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </select>
                  )}
                </label>
                <div className="flex gap-2 justify-end mt-4">
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold flex items-center justify-center ${updateLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={updateLoading}
                  >
                    {updateLoading ? (
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                    ) : null}
                    {updateLoading ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete User Modal */}
        {showDeleteModal && userToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                onClick={() => setShowDeleteModal(false)}
                title="Close"
              >
                <XCircle className="h-5 w-5 text-gray-400 hover:text-gray-700" />
              </button>
              <h3 className="text-lg font-bold mb-4">Delete User</h3>
              <p className="mb-6">Are you sure you want to delete <span className="font-semibold">{userToDelete.name}</span>? This action cannot be undone.</p>
              <div className="flex gap-2 justify-end mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                  onClick={() => setShowDeleteModal(false)}
                >Cancel</button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded bg-red-600 text-white font-semibold flex items-center justify-center ${deleteLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={deleteLoading}
                  onClick={async () => {
                    setDeleteLoading(true);
                    const token = localStorage.getItem('token');
                    const res = await fetch(`/api/admin/users/${userToDelete.id}`, {
                      method: 'DELETE',
                      headers: { Authorization: `Bearer ${token}` },
                    });
                    if (res.ok) {
                      setUsers(users => users.filter(u => u.id !== userToDelete.id));
                    }
                    setDeleteLoading(false);
                    setShowDeleteModal(false);
                    setUserToDelete(null);
                  }}
                >
                  {deleteLoading ? (
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                  ) : null}
                  {deleteLoading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ...existing code for other tabs... */}
        {activeTab === 'roles' && (
          <div>
            <div className="flex items-center mb-0">
              <div>
                <h2 className="text-xl font-bold">Roles & Permissions</h2>
                <p className="text-gray-600 mb-4">Manage roles and permissions for users.</p>
              </div>
              <button
                className="px-3 py-2 rounded text-gray-600 bg-blue-200 hover:bg-blue-100 flex items-center gap-2 ml-auto"
                onClick={() => setShowAddRoleModal(true)}
                title="Add Role"
              >
                <span className="text-lg">+</span> Add Role
              </button>
            </div>
            {rolesLoading ? (
              <div>Loading roles...</div>
            ) : (
              <table className="min-w-full border border-gray-300 rounded">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left border-b">Name</th>
                    <th className="px-4 py-2 text-left border-b">Description</th>
                    <th className="px-4 py-2 text-left border-b"># Permissions</th>
                    <th className="px-4 py-2 text-left border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map(role => (
                    <tr key={role.id} className="bg-white hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">{role.name}</td>
                      <td className="px-4 py-2 border-b">{role.description}</td>
                      <td className="px-4 py-2 border-b">{role.permissionsCount} assigned </td>
                      <td className="px-4 py-2 border-b flex gap-2">
                        <button
                          className="text-gray-600 bg-purple-200 hover:bg-purple-100 px-3 py-2 rounded flex text-[14px]"
                          title="Manage Permissions"
                          onClick={() => { setSelectedRole(role); setShowManagePermissionsModal(true); }}
                        >
                          <PenBox className="h-3 w-3 mr-1 mt-1" /> Permissions
                        </button>
                        <button
                          className="text-gray-600 bg-blue-200 hover:bg-blue-100 px-3 py-2 rounded flex text-[14px]"
                          title="Edit"
                          onClick={() => { setSelectedRole(role); setShowEditRoleModal(true); }}
                        >
                          <Edit3Icon className="h-3 w-3 mr-1 mt-1" /> Edit
                        </button>
                        <button
                          className="text-gray-600 bg-red-200 hover:bg-red-100 px-3 py-2 rounded flex text-[14px]"
                          title="Delete"
                          onClick={() => { setRoleToDelete(role); setShowDeleteRoleModal(true); }}
                        >
                          <Trash2 className="h-3 w-3 mr-1 mt-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Manage Permissions Modal */}
            {typeof showManagePermissionsModal !== 'undefined' && showManagePermissionsModal && selectedRole && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative">
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                    onClick={() => { setShowManagePermissionsModal(false); setSelectedRole(null); setShowAddPermissionsTable(false); }}
                    title="Close"
                  >
                    <XCircle className="h-5 w-5 text-gray-400 hover:text-gray-700" />
                  </button>
                  <h3 className="text-lg font-bold mb-4">Manage Permissions for {selectedRole.name}</h3>
                  {/* Toggle between assigned and all permissions tables */}
                  {!showAddPermissionsTable ? (
                    <>
                      {/* Assigned Permissions Pagination State */}
                      {/* Assigned Permissions Pagination State */}
                      {/* Pagination variables for assigned permissions */}
                      {(() => {
                        const assignedPageSize = 10;
                        const assignedTotalPages = Math.ceil(selectedRole.permissions.length / assignedPageSize);
                        const paginatedAssignedPermissions = selectedRole.permissions.slice(
                          assignedPermPage * assignedPageSize,
                          (assignedPermPage + 1) * assignedPageSize
                        );
                        return (
                          <>
                            <div className="mb-4 flex items-center justify-between">
                              <strong>Assigned Permissions</strong>
                              <button
                                className="px-3 py-2 rounded text-gray-600 bg-blue-200 hover:bg-blue-100 flex items-center gap-2"
                                onClick={() => { setShowAddPermissionsTable(true); setSelectedAssignPermissions([]); }}
                              >
                                <span className="text-lg">+</span> Add Permissions
                              </button>
                            </div>
                            <form
                              onSubmit={async (e) => {
                                e.preventDefault();
                                if (selectedUnassignPermissions.length === 0) return;
                                try {
                                  const token = localStorage.getItem('token');
                                  const res = await fetch(`/api/admin/roles/${selectedRole.id}/permissions`, {
                                    method: 'DELETE',
                                    headers: {
                                      'Content-Type': 'application/json',
                                      Authorization: `Bearer ${token}`,
                                    },
                                    body: JSON.stringify({ permissionIds: selectedUnassignPermissions }),
                                  });
                                  if (res.ok) {
                                    setRolesLoading(true);
                                    fetch('/api/admin/roles')
                                      .then(res => res.json())
                                      .then(data => {
                                        setRoles(Array.isArray(data) ? data : []);
                                        setRolesLoading(false);
                                      })
                                      .catch(() => setRolesLoading(false));
                                    setSelectedUnassignPermissions([]);
                                  }
                                } catch (err) {}
                              }}
                            >
                              <table className="min-w-full border border-gray-300 rounded mb-4">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="px-2 py-2 text-left border-b w-8">
                                      {/* Bulk select checkbox */}
                                      <input
                                        type="checkbox"
                                        checked={paginatedAssignedPermissions.length > 0 && paginatedAssignedPermissions.every((p: any) => selectedUnassignPermissions.includes(p.id))}
                                        onChange={e => {
                                          if (e.target.checked) {
                                            setSelectedUnassignPermissions(prev => [...prev, ...paginatedAssignedPermissions.filter((p: any) => !prev.includes(p.id)).map((p: any) => p.id)]);
                                          } else {
                                            setSelectedUnassignPermissions(prev => prev.filter(id => !paginatedAssignedPermissions.some((p: any) => p.id === id)));
                                          }
                                        }}
                                      />
                                    </th>
                                    <th className="px-4 py-2 text-left border-b">Name</th>
                                    <th className="px-4 py-2 text-left border-b">Module</th>
                                    <th className="px-4 py-2 text-left border-b">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {paginatedAssignedPermissions.length === 0 ? (
                                    <tr><td colSpan={4} className="text-gray-500 px-4 py-2">No permissions assigned.</td></tr>
                                  ) : (
                                    paginatedAssignedPermissions.map((perm: any) => (
                                      <tr key={perm.id} className="bg-white hover:bg-gray-50">
                                        <td className="px-2 py-2 border-b w-8">
                                          <input
                                            type="checkbox"
                                            checked={selectedUnassignPermissions.includes(perm.id)}
                                            onChange={e => {
                                              if (e.target.checked) {
                                                setSelectedUnassignPermissions(prev => [...prev, perm.id]);
                                              } else {
                                                setSelectedUnassignPermissions(prev => prev.filter(id => id !== perm.id));
                                              }
                                            }}
                                          />
                                        </td>
                                        <td className="px-4 py-2 border-b">{perm.name}</td>
                                        <td className="px-4 py-2 border-b">{perm.module}</td>
                                        <td className="px-4 py-2 border-b">{perm.action}</td>
                                      </tr>
                                    ))
                                  )}
                                </tbody>
                              </table>
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  Page {assignedPermPage + 1} of {assignedTotalPages}
                                </div>
                                <div className="flex gap-2">
                                  <button type="button" className="px-2 py-1 rounded bg-gray-200 text-gray-700" disabled={assignedPermPage === 0} onClick={() => setAssignedPermPage(assignedPermPage - 1)}>Prev</button>
                                  <button type="button" className="px-2 py-1 rounded bg-gray-200 text-gray-700" disabled={assignedPermPage === assignedTotalPages - 1} onClick={() => setAssignedPermPage(assignedPermPage + 1)}>Next</button>
                                </div>
                              </div>
                              <div className="flex gap-2 justify-end mt-2">
                                <button type="button" className="px-4 py-2 rounded bg-gray-200 text-gray-700" onClick={() => { setShowManagePermissionsModal(false); setSelectedRole(null); setShowAddPermissionsTable(false); }}>Close</button>
                                <button type="submit" className="px-4 py-2 rounded bg-red-600 text-white font-semibold" disabled={selectedUnassignPermissions.length === 0}>Unassign Selected</button>
                              </div>
                            </form>
                          </>
                        );
                      })()}
                    </>
                  ) : (
                    <>
                      <div className="mb-4 flex items-center justify-between">
                        <strong>Assign Permissions</strong>
                        <button
                          className="px-3 py-2 rounded text-gray-600 bg-gray-200 hover:bg-gray-100 flex items-center gap-2"
                          onClick={() => setShowAddPermissionsTable(false)}
                        >
                          Back
                        </button>
                      </div>
                      {/* Pagination state for add permissions table */}
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          if (selectedAssignPermissions.length === 0) return;
                          try {
                            const token = localStorage.getItem('token');
                            const res = await fetch(`/api/admin/roles/${selectedRole.id}/permissions`, {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                              },
                              body: JSON.stringify({ permissionIds: selectedAssignPermissions }),
                            });
                            if (res.ok) {
                              setRolesLoading(true);
                              fetch('/api/admin/roles')
                                .then(res => res.json())
                                .then(data => {
                                  setRoles(Array.isArray(data) ? data : []);
                                  setRolesLoading(false);
                                })
                                .catch(() => setRolesLoading(false));
                              setShowAddPermissionsTable(false);
                              setSelectedAssignPermissions([]);
                            }
                          } catch (err) {}
                        }}
                      >
                        <table className="min-w-full border border-gray-300 rounded mb-4">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-2 py-2 text-left border-b w-8">
                                {/* Bulk select checkbox for current page */}
                                <input
                                  type="checkbox"
                                  checked={paginatedPermissions.length > 0 && paginatedPermissions.every((p: any) => selectedAssignPermissions.includes(p.id))}
                                  onChange={e => {
                                    if (e.target.checked) {
                                      setSelectedAssignPermissions(prev => [...prev, ...paginatedPermissions.filter(p => !prev.includes(p.id)).map(p => p.id)]);
                                    } else {
                                      setSelectedAssignPermissions(prev => prev.filter(id => !paginatedPermissions.some(p => p.id === id)));
                                    }
                                  }}
                                />
                              </th>
                              <th className="px-4 py-2 text-left border-b">Name</th>
                              <th className="px-4 py-2 text-left border-b">Module</th>
                              <th className="px-4 py-2 text-left border-b">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedPermissions.length === 0 ? (
                              <tr><td colSpan={4} className="text-gray-500 px-4 py-2">No permissions available.</td></tr>
                            ) : (
                              paginatedPermissions.map((perm: any) => (
                                <tr key={perm.id} className="bg-white hover:bg-gray-50">
                                  <td className="px-2 py-2 border-b w-8">
                                    <input
                                      type="checkbox"
                                      checked={selectedAssignPermissions.includes(perm.id)}
                                      onChange={e => {
                                        if (e.target.checked) {
                                          setSelectedAssignPermissions(prev => [...prev, perm.id]);
                                        } else {
                                          setSelectedAssignPermissions(prev => prev.filter(id => id !== perm.id));
                                        }
                                      }}
                                    />
                                  </td>
                                  <td className="px-4 py-2 border-b">{perm.name}</td>
                                  <td className="px-4 py-2 border-b">{perm.module}</td>
                                  <td className="px-4 py-2 border-b">{perm.action}</td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            Page {addPermPage + 1} of {totalPages}
                          </div>
                          <div className="flex gap-2">
                            <button type="button" className="px-2 py-1 rounded bg-gray-200 text-gray-700" disabled={addPermPage === 0} onClick={() => setAddPermPage(addPermPage - 1)}>Prev</button>
                            <button type="button" className="px-2 py-1 rounded bg-gray-200 text-gray-700" disabled={addPermPage === totalPages - 1} onClick={() => setAddPermPage(addPermPage + 1)}>Next</button>
                          </div>
                        </div>
                        <div className="flex gap-2 justify-end mt-8">
                          <button type="button" className="px-4 py-2 rounded bg-gray-200 text-gray-700" onClick={() => setShowAddPermissionsTable(false)}>Cancel</button>
                          <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold" disabled={selectedAssignPermissions.length === 0}>Assign Selected</button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Add Role Modal */}
            {/* Delete Role Modal */}
            {showDeleteRoleModal && roleToDelete && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                    onClick={() => setShowDeleteRoleModal(false)}
                    title="Close"
                  >
                    <XCircle className="h-5 w-5 text-gray-400 hover:text-gray-700" />
                  </button>
                  <h3 className="text-lg font-bold mb-4">Delete Role</h3>
                  <p className="mb-6">Are you sure you want to delete <span className="font-semibold">{roleToDelete.name}</span>? This action cannot be undone.</p>
                  <div className="flex gap-2 justify-end mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                      onClick={() => setShowDeleteRoleModal(false)}
                    >Cancel</button>
                    <button
                      type="button"
                      className={`px-4 py-2 rounded bg-red-600 text-white font-semibold flex items-center justify-center ${deleteRoleLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                      disabled={deleteRoleLoading}
                      onClick={async () => {
                        setDeleteRoleLoading(true);
                        const token = localStorage.getItem('token');
                        const res = await fetch(`/api/admin/roles/${roleToDelete.id}`, {
                          method: 'DELETE',
                          headers: { Authorization: `Bearer ${token}` },
                        });
                        if (res.ok) {
                          setRoles(roles => roles.filter(r => r.id !== roleToDelete.id));
                        }
                        setDeleteRoleLoading(false);
                        setShowDeleteRoleModal(false);
                        setRoleToDelete(null);
                      }}
                    >
                      {deleteRoleLoading ? (
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                      ) : null}
                      {deleteRoleLoading ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Edit Role Modal */}
            {showEditRoleModal && selectedRole && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                    onClick={() => setShowEditRoleModal(false)}
                    title="Close"
                  >
                    <XCircle className="h-5 w-5 text-gray-400 hover:text-gray-700" />
                  </button>
                  <h3 className="text-lg font-bold mb-4">Edit Role</h3>
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setEditRoleLoading(true);
                      const formData = new FormData(e.currentTarget);
                      const updatedRole = {
                        name: formData.get('name'),
                        description: formData.get('description'),
                        isActive: formData.get('isActive') === 'true',
                      };
                      try {
                        const token = localStorage.getItem('token');
                        const res = await fetch(`/api/admin/roles/${selectedRole.id}`, {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(updatedRole),
                        });
                        if (res.ok) {
                          const roleData = await res.json();
                          setRoles(roles => roles.map(r => r.id === roleData.id ? roleData : r));
                        } else {
                          // Optionally handle error
                        }
                      } catch (err) {
                        // Optionally handle error
                      }
                      setEditRoleLoading(false);
                      setShowEditRoleModal(false);
                      setSelectedRole(null);
                    }}
                  >
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Name</span>
                      <input
                        name="name"
                        defaultValue={selectedRole.name}
                        className="border rounded px-3 py-2"
                        required
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Description</span>
                      <input
                        name="description"
                        defaultValue={selectedRole.description}
                        className="border rounded px-3 py-2"
                        required
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Status</span>
                      <select
                        name="isActive"
                        defaultValue={selectedRole.isActive ? 'true' : 'false'}
                        className="border rounded px-3 py-2"
                      >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </select>
                    </label>
                    <div className="flex gap-2 justify-end mt-4">
                      <button
                        type="button"
                        className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                        onClick={() => { setShowEditRoleModal(false); setSelectedRole(null); }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold flex items-center justify-center ${editRoleLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={editRoleLoading}
                      >
                        {editRoleLoading ? (
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                          </svg>
                        ) : null}
                        {editRoleLoading ? 'Updating...' : 'Update'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {typeof showAddRoleModal !== 'undefined' && showAddRoleModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                    onClick={() => setShowAddRoleModal(false)}
                    title="Close"
                  >
                    <XCircle className="h-5 w-5 text-gray-400 hover:text-gray-700" />
                  </button>
                  <h3 className="text-lg font-bold mb-4">Add Role</h3>
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setAddRoleLoading(true);
                      const formData = new FormData(e.currentTarget);
                      const newRole = {
                        name: formData.get('name'),
                        description: formData.get('description'),
                      };
                      try {
                        const token = localStorage.getItem('token');
                        const res = await fetch('/api/admin/roles', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(newRole),
                        });
                        if (res.ok) {
                          const roleData = await res.json();
                          setRoles(roles => [...roles, roleData]);
                        } else {
                          // Optionally handle error
                        }
                      } catch (err) {
                        // Optionally handle error
                      }
                      setAddRoleLoading(false);
                      setShowAddRoleModal(false);
                    }}
                  >
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Name</span>
                      <input
                        name="name"
                        className="border rounded px-3 py-2"
                        required
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Description</span>
                      <input
                        name="description"
                        className="border rounded px-3 py-2"
                        required
                      />
                    </label>
                    <div className="flex gap-2 justify-end mt-4">
                      <button
                        type="button"
                        className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                        onClick={() => setShowAddRoleModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold flex items-center justify-center ${addRoleLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={addRoleLoading}
                      >
                        {addRoleLoading ? (
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                          </svg>
                        ) : null}
                        {addRoleLoading ? 'Creating...' : 'Create'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'products' && (
          <div>
            <div className="flex items-center mb-0">
              <div>
                <h2 className="text-xl font-bold">Products</h2>
                <p className="text-gray-600 mb-4">Manage your coffee and merchandise products for the storefront.</p>
              </div>
              <button
                className="px-3 py-2 rounded text-gray-600 bg-blue-200 hover:bg-blue-100 flex items-center gap-2 ml-auto"
                onClick={() => setShowAddProductModal(true)}
                title="Add Product"
              >
                <span className="text-lg">+</span> Add Product
              </button>
            </div>
            {productsLoading ? (
              <div className="text-gray-500">Loading products...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left border-b">Name</th>
                      <th className="px-4 py-2 text-left border-b">Category</th>
                      <th className="px-4 py-2 text-left border-b">Price</th>
                      <th className="px-4 py-2 text-left border-b">SKU</th>
                      <th className="px-4 py-2 text-left border-b">Stock</th>
                      <th className="px-4 py-2 text-left border-b">Active</th>
                      <th className="px-4 py-2 text-left border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.slice(productPage * productPageSize, (productPage + 1) * productPageSize).map(product => {
                      const inv = inventory.find((i: any) => i.productId === product.id);
                      return (
                        <tr key={product.id} className="bg-white hover:bg-gray-50">
                          <td className="px-4 py-2 border-b">{product.name}</td>
                          <td className="px-4 py-2 border-b">{product.category?.name || '-'}</td>
                          <td className="px-4 py-2 border-b">${product.price}</td>
                          <td className="px-4 py-2 border-b">{product.sku}</td>
                          <td className="px-4 py-2 border-b">{inv ? inv.quantity : 0}</td>
                          <td className="px-4 py-2 border-b">
                            <span className={product.isActive
                              ? 'bg-green-200 px-3 py-2 rounded text-green-600 text-[14px]'
                              : 'bg-red-200 px-3 py-2 rounded text-red-600 text-[14px]'}>
                              {product.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-4 py-2 border-b flex gap-2">
                            <button
                              className="text-gray-600 bg-blue-200 hover:bg-blue-100 px-3 py-2 rounded flex text-[14px]"
                              title="Edit"
                              onClick={() => { setSelectedProduct(product); setShowEditProductModal(true); }}
                            >
                              <Edit3Icon className="h-3 w-3 mr-1 mt-1" /> Edit
                            </button>
                            <button
                              className="text-gray-600 bg-red-200 hover:bg-red-100 px-3 py-2 rounded flex text-[14px]"
                              title="Delete"
                              onClick={() => { setProductToDelete(product); setShowDeleteProductModal(true); }}
                            >
                              <Trash2 className="h-3 w-3 mr-1 mt-1" /> Delete
                            </button>
                            <button
                              className="text-gray-600 bg-yellow-200 hover:bg-yellow-100 px-3 py-2 rounded flex text-[14px]"
                              title="Manage Stock"
                              onClick={() => {
                                setInventoryProduct(product);
                                setInventoryQuantity(0);
                                setInventoryAction('add');
                                setShowInventoryModal(true);
                              }}
                            >
                              <span className="font-bold mr-1">↕</span> Stock
                            </button>
                          </td>
                        </tr>
                      );
                    })}
            {/* Inventory Modal */}
            {showInventoryModal && inventoryProduct && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                    onClick={() => setShowInventoryModal(false)}
                    title="Close"
                  >
                    <XCircle className="h-5 w-5 text-gray-400 hover:text-gray-700" />
                  </button>
                  <h3 className="text-lg font-bold mb-4">Manage Stock for {inventoryProduct.name}</h3>
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setInventoryActionLoading(true);
                      const quantityChange = inventoryAction === 'add' ? inventoryQuantity : -inventoryQuantity;
                      try {
                        const res = await fetch('/api/admin/inventory', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ productId: inventoryProduct.id, quantityChange }),
                        });
                        if (res.ok) {
                          const updated = await res.json();
                          setInventory(inv => {
                            const idx = inv.findIndex(i => i.productId === inventoryProduct.id);
                            if (idx !== -1) {
                              const newInv = [...inv];
                              newInv[idx] = updated;
                              return newInv;
                            } else {
                              return [...inv, updated];
                            }
                          });
                        }
                      } catch (err) {}
                      setInventoryActionLoading(false);
                      setShowInventoryModal(false);
                    }}
                  >
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Action</span>
                      <select value={inventoryAction} onChange={e => setInventoryAction(e.target.value as 'add'|'remove')} className="border rounded px-3 py-2">
                        <option value="add">Add Stock</option>
                        <option value="remove">Remove Stock</option>
                      </select>
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Quantity</span>
                      <input type="number" min={1} value={inventoryQuantity} onChange={e => setInventoryQuantity(Number(e.target.value))} className="border rounded px-3 py-2" required />
                    </label>
                    <div className="flex gap-2 justify-end mt-4">
                      <button
                        type="button"
                        className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                        onClick={() => setShowInventoryModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={`px-4 py-2 rounded bg-yellow-600 text-white font-semibold flex items-center justify-center ${inventoryActionLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={inventoryActionLoading}
                      >
                        {inventoryActionLoading ? 'Processing...' : 'Update Stock'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
                  </tbody>
                </table>
                <div className="flex justify-between items-center mt-4">
                  <button
                    className="px-2 py-1 rounded bg-gray-200 text-gray-700"
                    disabled={productPage === 0}
                    onClick={() => setProductPage(p => Math.max(0, p - 1))}
                  >Prev</button>
                  <span>Page {productPage + 1} of {productTotalPages || 1}</span>
                  <button
                    className="px-2 py-1 rounded bg-gray-200 text-gray-700"
                    disabled={productPage >= productTotalPages - 1}
                    onClick={() => setProductPage(p => Math.min(productTotalPages - 1, p + 1))}
                  >Next</button>
                </div>
              </div>
            )}

            {/* Add Product Modal */}
            {showAddProductModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                    onClick={() => setShowAddProductModal(false)}
                    title="Close"
                  >
                    <XCircle className="h-5 w-5 text-gray-400 hover:text-gray-700" />
                  </button>
                  <h3 className="text-lg font-bold mb-4">Add Product</h3>
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setAddProductLoading(true);
                      const formData = new FormData(e.currentTarget);
                      const newProduct = {
                        name: formData.get('name'),
                        description: formData.get('description'),
                        price: parseFloat(formData.get('price') as string),
                        sku: formData.get('sku'),
                        categoryId: formData.get('categoryId'),
                        isActive: formData.get('isActive') === 'on',
                      };
                      try {
                        const token = localStorage.getItem('token');
                        const res = await fetch('/api/admin/products', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(newProduct),
                        });
                        if (res.ok) {
                          const productData = await res.json();
                          setProducts(products => [...products, productData]);
                        }
                      } catch (err) {}
                      setAddProductLoading(false);
                      setShowAddProductModal(false);
                    }}
                  >
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Name</span>
                      <input name="name" className="border rounded px-3 py-2" required />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Description</span>
                      <input name="description" className="border rounded px-3 py-2" required />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Price</span>
                      <input name="price" type="number" step="0.01" className="border rounded px-3 py-2" required />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">SKU</span>
                      <input name="sku" className="border rounded px-3 py-2" required />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Category</span>
                      <select name="categoryId" className="border rounded px-3 py-2" required>
                        <option value="">Select category</option>
                        {categories.map((cat: any) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" name="isActive" defaultChecked />
                      <span className="font-medium">Active</span>
                    </label>
                    <div className="flex gap-2 justify-end mt-4">
                      <button
                        type="button"
                        className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                        onClick={() => setShowAddProductModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold flex items-center justify-center ${addProductLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={addProductLoading}
                      >
                        {addProductLoading ? (
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                          </svg>
                        ) : null}
                        {addProductLoading ? 'Creating...' : 'Create'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Edit Product Modal */}
            {showEditProductModal && selectedProduct && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                    onClick={() => { setShowEditProductModal(false); setSelectedProduct(null); }}
                    title="Close"
                  >
                    <XCircle className="h-5 w-5 text-gray-400 hover:text-gray-700" />
                  </button>
                  <h3 className="text-lg font-bold mb-4">Edit Product</h3>
                  <form
                    className="flex flex-col gap-4"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setEditProductLoading(true);
                      const formData = new FormData(e.currentTarget);
                      const updatedProduct = {
                        name: formData.get('name'),
                        description: formData.get('description'),
                        price: parseFloat(formData.get('price') as string),
                        sku: formData.get('sku'),
                        categoryId: formData.get('categoryId'),
                        isActive: formData.get('isActive') === 'on',
                      };
                      try {
                        const token = localStorage.getItem('token');
                        const res = await fetch(`/api/admin/products/${selectedProduct.id}`, {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(updatedProduct),
                        });
                        if (res.ok) {
                          const productData = await res.json();
                          setProducts(products => products.map(p => p.id === selectedProduct.id ? productData : p));
                        }
                      } catch (err) {}
                      setEditProductLoading(false);
                      setShowEditProductModal(false);
                      setSelectedProduct(null);
                    }}
                  >
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Name</span>
                      <input name="name" className="border rounded px-3 py-2" defaultValue={selectedProduct.name} required />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Description</span>
                      <input name="description" className="border rounded px-3 py-2" defaultValue={selectedProduct.description} required />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Price</span>
                      <input name="price" type="number" step="0.01" className="border rounded px-3 py-2" defaultValue={selectedProduct.price} required />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">SKU</span>
                      <input name="sku" className="border rounded px-3 py-2" defaultValue={selectedProduct.sku} required />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span className="font-medium">Category</span>
                      <select name="categoryId" className="border rounded px-3 py-2" defaultValue={selectedProduct.categoryId} required>
                        <option value="">Select category</option>
                        {categories.map((cat: any) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" name="isActive" defaultChecked={selectedProduct.isActive} />
                      <span className="font-medium">Active</span>
                    </label>
                    <div className="flex gap-2 justify-end mt-4">
                      <button
                        type="button"
                        className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                        onClick={() => { setShowEditProductModal(false); setSelectedProduct(null); }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={`px-4 py-2 rounded bg-blue-600 text-white font-semibold flex items-center justify-center ${editProductLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={editProductLoading}
                      >
                        {editProductLoading ? (
                          <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                          </svg>
                        ) : null}
                        {editProductLoading ? 'Updating...' : 'Update'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Delete Product Modal */}
            {showDeleteProductModal && productToDelete && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                    onClick={() => { setShowDeleteProductModal(false); setProductToDelete(null); }}
                    title="Close"
                  >
                    <XCircle className="h-5 w-5 text-gray-400 hover:text-gray-700" />
                  </button>
                  <h3 className="text-lg font-bold mb-4">Delete Product</h3>
                  <div className="mb-4">Are you sure you want to delete <span className="font-semibold">{productToDelete.name}</span>?</div>
                  <div className="flex gap-2 justify-end mt-4">
                    <button
                      type="button"
                      className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                      onClick={() => { setShowDeleteProductModal(false); setProductToDelete(null); }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 rounded bg-red-600 text-white font-semibold flex items-center justify-center ${deleteProductLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                      disabled={deleteProductLoading}
                      onClick={async () => {
                        setDeleteProductLoading(true);
                        try {
                          const token = localStorage.getItem('token');
                          const res = await fetch(`/api/admin/products/${productToDelete.id}`, {
                            method: 'DELETE',
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          });
                          if (res.ok) {
                            setProducts(products => products.filter(p => p.id !== productToDelete.id));
                          }
                        } catch (err) {}
                        setDeleteProductLoading(false);
                        setShowDeleteProductModal(false);
                        setProductToDelete(null);
                      }}
                    >
                      {deleteProductLoading ? (
                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                      ) : null}
                      {deleteProductLoading ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'inventory' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Inventory Movements</h2>
            {inventoryMovementsLoading ? (
              <div className="text-gray-500">Loading inventory movements...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left border-b">Date</th>
                      <th className="px-4 py-2 text-left border-b">Product</th>
                      <th className="px-4 py-2 text-left border-b">Type</th>
                      <th className="px-4 py-2 text-left border-b">Quantity</th>
                      <th className="px-4 py-2 text-left border-b">Previous</th>
                      <th className="px-4 py-2 text-left border-b">New</th>
                      <th className="px-4 py-2 text-left border-b">Reason</th>
                      <th className="px-4 py-2 text-left border-b">User</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryMovements.map((tx: any) => (
                      <tr key={tx.id} className="bg-white hover:bg-gray-50">
                        <td className="px-4 py-2 border-b">{new Date(tx.createdAt).toLocaleString()}</td>
                        <td className="px-4 py-2 border-b">{tx.inventoryItem?.product?.name || '-'}</td>
                        <td className="px-4 py-2 border-b">{tx.type}</td>
                        <td className="px-4 py-2 border-b">{tx.quantity}</td>
                        <td className="px-4 py-2 border-b">{tx.previousQuantity}</td>
                        <td className="px-4 py-2 border-b">{tx.newQuantity}</td>
                        <td className="px-4 py-2 border-b">{tx.reason}</td>
                        <td className="px-4 py-2 border-b">{tx.createdBy?.name || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}