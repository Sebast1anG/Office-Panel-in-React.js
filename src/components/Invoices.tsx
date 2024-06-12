import { useState, useEffect } from 'react';
import EditInvoice from './EditInvoice';
import CreateInvoice from './CreateInvoice';
import { mockInvoices } from './mockData';

interface Invoice {
    id: number;
    name: string;
    date: string;
    client: string;
    country: string;
    status: string;
}

interface InvoicesProps {
    onInvoiceCountChange: (count: number) => void;
}

const Invoices = ({ onInvoiceCountChange }: InvoicesProps) => {
    const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
    const [creatingInvoice, setCreatingInvoice] = useState<boolean>(false);
    const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);

    const numberOfInvoices = invoices.length;

    useEffect(() => {
        if (typeof onInvoiceCountChange === 'function') {
            onInvoiceCountChange(numberOfInvoices);
        }
    }, [numberOfInvoices, onInvoiceCountChange]);

    const handleEdit = (id: number) => {
        const invoice = invoices.find((invoice) => invoice.id === id);
        if (invoice) {
            setEditingInvoice({ ...invoice });
        }
    };

    const handleSave = (editedInvoice: Invoice) => {
        const updatedInvoices = invoices.map((invoice) =>
            invoice.id === editedInvoice.id ? editedInvoice : invoice
        );
        setInvoices(updatedInvoices);
        setEditingInvoice(null);
    };

    const handleCreate = (newInvoice: Invoice) => {
        setInvoices([...invoices, newInvoice]);
        setCreatingInvoice(false);
    };

    const handleCancelCreate = () => {
        setCreatingInvoice(false);
    };

    const handleCancelEdit = () => {
        setEditingInvoice(null);
    };

    const handleDelete = (id: number) => {
        const updatedInvoices = invoices.filter((invoice) => invoice.id !== id);
        setInvoices(updatedInvoices);
    };

    const renderInvoices = () => {
        return (
            <table className="w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-200 px-4 py-2">Name</th>
                        <th className="border border-gray-200 px-4 py-2">Date</th>
                        <th className="border border-gray-200 px-4 py-2">Client</th>
                        <th className="border border-gray-200 px-4 py-2">Country</th>
                        <th className="border border-gray-200 px-4 py-2">Status</th>
                        <th className="border border-gray-200 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                            <td className="border border-gray-200 px-4 py-2">{invoice.name}</td>
                            <td className="border border-gray-200 px-4 py-2">{invoice.date}</td>
                            <td className="border border-gray-200 px-4 py-2">{invoice.client}</td>
                            <td className="border border-gray-200 px-4 py-2">{invoice.country}</td>
                            <td className="border border-gray-200 px-4 py-2">{invoice.status}</td>
                            <td className="border border-gray-200 px-4 py-2">
                                <button
                                    onClick={() => handleEdit(invoice.id)}
                                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(invoice.id)}
                                    className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Invoices</h1>
            <button
                onClick={() => setCreatingInvoice(true)}
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
                Add New Invoice
            </button>
            {creatingInvoice && (
                <CreateInvoice
                    onSave={handleCreate}
                    onCancelCreate={handleCancelCreate}
                />
            )}
            {editingInvoice && (
                <EditInvoice
                    invoice={editingInvoice}
                    onSave={handleSave}
                    onCancel={handleCancelEdit}
                />
            )}
            {renderInvoices()}
        </div>
    );
};

export default Invoices;
