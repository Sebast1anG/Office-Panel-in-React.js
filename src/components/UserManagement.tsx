import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface User {
    id: number;
    name: string;
    role: 'accountant' | 'worker' | 'boss' | 'admin';
}

const mockUsers: User[] = [
    { id: 1, name: 'Alice', role: 'worker' },
    { id: 2, name: 'Bob', role: 'accountant' },
    { id: 3, name: 'Charlie', role: 'boss' },
];

const UserManagement = () => {
    const { role } = useAuth();
    const [users, setUsers] = useState<User[]>(mockUsers);

    if (role !== 'admin') {
        return <p>Access denied</p>;
    }

    const handleRoleChange = (id: number, newRole: User['role']) => {
        setUsers(users.map(user => (user.id === id ? { ...user, role: newRole } : user)));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-200 px-4 py-2">Name</th>
                        <th className="border border-gray-200 px-4 py-2">Role</th>
                        <th className="border border-gray-200 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="border border-gray-200 px-4 py-2">{user.name}</td>
                            <td className="border border-gray-200 px-4 py-2">{user.role}</td>
                            <td className="border border-gray-200 px-4 py-2">
                                <select
                                    value={user.role}
                                    onChange={e => handleRoleChange(user.id, e.target.value as User['role'])}
                                    className="px-3 py-1 bg-white border border-gray-300 rounded"
                                >
                                    <option value="accountant">Accountant</option>
                                    <option value="worker">Worker</option>
                                    <option value="boss">Boss</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;
