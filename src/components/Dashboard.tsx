import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { useAuth } from '../contexts/AuthContext';
import Invoices from './Invoices';
import mockData from './mockData.json';

const Dashboard = () => {
    const location = useLocation();
    const { email } = location.state || { email: 'No email provided' };
    const { logout, role } = useAuth();
    const [numberOfInvoices, setNumberOfInvoices] = useState<number>(0);

    const { mockCustomers, mockSalesData, mockSoldItems } = mockData;

    const userAccess = {
        dashboard: true,
        createInvoice: role === 'accountant' || role === 'boss' || role === 'admin',
        editInvoice: role === 'accountant' || role === 'boss' || role === 'admin',
        userManagement: role === 'admin',
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Welcome, {email}</h1>
                <button
                    onClick={logout}
                    className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Logout
                </button>
            </div>

            {userAccess.userManagement && (
                <div className="mb-4">
                    <Link
                        to="/user-management"
                        className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        User Management
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Total Sold Items</h2>
                    <p className="text-2xl">
                        {mockSoldItems.reduce((total: number, item: any) => total + item.quantity, 0)}
                    </p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Total Customers</h2>
                    <p className="text-2xl">{mockCustomers.length}</p>
                </div>
                <div className="bg-white p-4 rounded shadow hover:bg-gray-100">
                    <h2 className="text-xl font-semibold mb-2">Total Invoices</h2>
                    <p className="text-2xl">{numberOfInvoices}</p>
                </div>
            </div>

            <div className="bg-white p-4 rounded shadow mb-4">
                <h2 className="text-xl font-semibold mb-2">Sales Chart</h2>
                <div className="relative h-96">
                    <Bar
                        data={mockSalesData}
                        options={{ responsive: true, maintainAspectRatio: false }}
                    />
                </div>
            </div>

            {userAccess.dashboard && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-xl font-semibold mb-2">Sold Items</h2>
                        <ul>
                            {mockSoldItems.map((item: any) => (
                                <li key={item.id} className="mb-2">
                                    {item.name} - Quantity: {item.quantity}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-xl font-semibold mb-2">Customers</h2>
                        <ul>
                            {mockCustomers.map((customer: any) => (
                                <li key={customer.id} className="mb-2">
                                    {customer.name} - Email: {customer.email}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {userAccess.createInvoice && <Invoices onInvoiceCountChange={setNumberOfInvoices} />}
        </div>
    );
};

export default Dashboard;
