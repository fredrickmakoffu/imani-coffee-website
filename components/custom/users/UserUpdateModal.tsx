import React, { useState, useEffect } from 'react';
import { Trash2, Users, Shield, Package, Boxes, Edit3Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

// Removed hardcoded ROLE_OPTIONS. Roles will be fetched from backend.

export default function UserUpdateModal() {
  // Roles state
  const [roles, setRoles] = useState<any[]>([]);
  const [rolesLoading, setRolesLoading] = useState(true);

  useEffect(() => {
    async function fetchRoles() {
      setRolesLoading(true);
      try {
        const res = await fetch('/api/admin/roles');
        if (res.ok) {
          const data = await res.json();
          setRoles(data);
        }
      } catch (err) {
        // Optionally handle error
      }
      setRolesLoading(false);
    }
    fetchRoles();
  }, []);

  // Modal state and selected user
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const tabs = [
    { label: 'Users', key: 'users', icon: <Users className="inline-block mr-2 h-5 w-5" /> },
    { label: 'Roles & Permissions', key: 'roles', icon: <Shield className="inline-block mr-2 h-5 w-5" /> },
    { label: 'Products', key: 'products', icon: <Package className="inline-block mr-2 h-5 w-5" /> },
    { label: 'Inventory', key: 'inventory', icon: <Boxes className="inline-block mr-2 h-5 w-5" /> },
  ];
  const [users, setUsers] = useState<any[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

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
      header: 'Roles',
      cell: ({ row }: any) => row.original.isSuperuser ? 'Superuser' : 'User',
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

  return (
        <div>
          <h2 className="text-xl font-bold mb-0">User Management</h2>
          <p className="text-gray-600 mb-4">Manage user accounts and permissions.</p>

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

        {/* Update User Modal */}
        {showModal && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                onClick={() => setShowModal(false)}
                title="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h3 className="text-lg font-bold mb-4">Update User</h3>
              <form
                className="flex flex-col gap-4"
                onSubmit={async (e) => {
                  e.preventDefault();
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
                      setUsers(users => users.map((u: any) => u.id === userData.id ? userData : u));
                    } else {
                      // Optionally handle error
                    }
                  } catch (err) {
                    // Optionally handle error
                  }
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
                      {roles.map(role => (
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
                    className="px-4 py-2 rounded bg-blue-600 text-white font-semibold"
                  >
                    Update
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
                <Trash2 className="h-6 w-6" />
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
                  className="px-4 py-2 rounded bg-red-600 text-white font-semibold"
                  onClick={async () => {
                    const token = localStorage.getItem('token');
                    const res = await fetch(`/api/admin/users/${userToDelete.id}`, {
                      method: 'DELETE',
                      headers: { Authorization: `Bearer ${token}` },
                    });
                    if (res.ok) {
                      setUsers(users => users.filter(u => u.id !== userToDelete.id));
                    }
                    setShowDeleteModal(false);
                    setUserToDelete(null);
                  }}
                >Delete</button>
              </div>
            </div>
          </div>
        )}
  );
}
