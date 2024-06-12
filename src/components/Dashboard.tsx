import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useAuth } from "../contexts/AuthContext";
import Invoices from "./Invoices";
import WarningPanel from "./WarningPanel";
import { mockCustomers, mockSalesData, mockSoldItems } from "./mockData";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const location = useLocation();
    const { email } = location.state || { email: "No email provided" };
    const { logout, showWarning } = useAuth();
    const [numberOfInvoices, setNumberOfInvoices] = useState(0);

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Total Sold Items</h2>
                    <p className="text-2xl">
                        {mockSoldItems.reduce((total, item) => total + item.quantity, 0)}
                    </p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Total Customers</h2>
                    <p className="text-2xl">{mockCustomers.length}</p>
                </div>
                <div
                    className="bg-white p-4 rounded shadow hover:bg-gray-100"
                >
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Sold Items</h2>
                    <ul>
                        {mockSoldItems.map((item) => (
                            <li key={item.id} className="mb-2">
                                {item.name} - Quantity: {item.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Customers</h2>
                    <ul>
                        {mockCustomers.map((customer) => (
                            <li key={customer.id} className="mb-2">
                                {customer.name} - Email: {customer.email}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Invoices onInvoiceCountChange={setNumberOfInvoices} />
            {showWarning && <WarningPanel />}
        </div>
    );
};

export default Dashboard;
