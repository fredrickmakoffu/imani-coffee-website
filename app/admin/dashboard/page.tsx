"use client";

import { useEffect, useState } from 'react';
import { Trash2, Users, Shield, Package, Boxes,  PenBox,  Edit3Icon, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

export default function Dashboard() {
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
                  </tr>
                </thead>
                <tbody>
                  {roles.map(role => (
                    <tr key={role.id} className="bg-white hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">{role.name}</td>
                      <td className="px-4 py-2 border-b">{role.description}</td>
                      <td className="px-4 py-2 border-b flex gap-2">
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
            <h2 className="text-xl font-bold mb-4">Products</h2>
            <div className="text-gray-600">Product management coming soon...</div>
          </div>
        )}
        {activeTab === 'inventory' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Inventory</h2>
            <div className="text-gray-600">Inventory management coming soon...</div>
          </div>
        )}
      </main>
    </div>
  );
  // ...existing code...
}
