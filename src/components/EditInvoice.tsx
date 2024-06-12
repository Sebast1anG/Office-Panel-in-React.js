import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GET_COUNTRIES } from '../queries';
import { FaCalendarAlt } from 'react-icons/fa';

interface Invoice {
    id: number;
    name: string;
    date: string;
    client: string;
    country: string;
    status: string;
}

interface Props {
    invoice: Invoice;
    onSave: (editedInvoice: Invoice) => void;
    onCancel: () => void;
}

const EditInvoice = ({ invoice, onSave, onCancel }: Props) => {
    const [editedInvoice, setEditedInvoice] = useState<Invoice>({ ...invoice });
    const { loading, error, data } = useQuery(GET_COUNTRIES);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedInvoice(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDateChange = (date: Date | null) => {
        setEditedInvoice(prevState => ({
            ...prevState,
            date: date ? date.toISOString().split('T')[0] : ''
        }));
    };

    const CustomInput = React.forwardRef(({ value, onClick }: any, ref: any) => (
        <div className="relative w-full">
            <input
                type="text"
                readOnly
                value={value}
                onClick={onClick}
                ref={ref}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <FaCalendarAlt
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                onClick={onClick}
            />
        </div>
    ));

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading countries.</p>;

    return (
        <div className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-xl font-bold mb-2">Edit Invoice {invoice.id}</h2>
            <div className="mb-2">
                <label className="block mb-1">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={editedInvoice.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div className="mb-2">
                <label className="block mb-1">Date:</label>
                <DatePicker
                    selected={editedInvoice.date ? new Date(editedInvoice.date) : null}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    customInput={<CustomInput />}
                />
            </div>
            <div className="mb-2">
                <label className="block mb-1">Client:</label>
                <input
                    type="text"
                    name="client"
                    value={editedInvoice.client}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div className="mb-2">
                <label className="block mb-1">Country:</label>
                <select
                    name="country"
                    value={editedInvoice.country}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                    {data.countries.map((country: { name: string }, index: number) => (
                        <option key={index} value={country.name}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-2">
                <label className="block mb-1">Status:</label>
                <select
                    name="status"
                    value={editedInvoice.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                </select>
            </div>
            <div className="flex justify-end">
                <button onClick={() => onSave(editedInvoice)} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Save
                </button>
                <button onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EditInvoice;
