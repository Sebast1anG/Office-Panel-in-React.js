import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../queries';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
    onSave: (newInvoice: Invoice) => void;
    onCancelCreate: () => void;
    checkInvoiceExists: (name: string) => boolean;

}

const CreateInvoice = ({ onSave, onCancelCreate, checkInvoiceExists }: Props) => {
    const initialInvoiceState = {
        id: Date.now(),
        name: '',
        date: '',
        client: '',
        country: '',
        status: 'Unpaid'
    };

    const [newInvoice, setNewInvoice] = useState<Invoice>({ ...initialInvoiceState });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { loading, error, data } = useQuery(GET_COUNTRIES);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewInvoice(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDateSet = (date: Date | null) => {
        setNewInvoice(prevState => ({
            ...prevState,
            date: date ? date.toISOString().split('T')[0] : ''
        }));
    };

    const validateForm = () => {
        const { name, date, client, country } = newInvoice;
        return name && date && client && country;
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

    const handleSave = () => {
        setIsSubmitted(true);
        setErrorMessage('');
        if (!validateForm()) return;

        if (checkInvoiceExists(newInvoice.name)) {
            setErrorMessage('Invoice with this name already exists.');
            return;
        }

        onSave(newInvoice);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading countries.</p>;

    return (
        <div className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-xl font-bold mb-2">Create New Invoice</h2>
            <div className="mb-2">
                <label htmlFor="name" className="block mb-1">
                    Name: <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={newInvoice.name}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !newInvoice.name ? 'border-red-500' : ''}`}
                />
                {isSubmitted && !newInvoice.name && (
                    <p className="text-red-500 text-sm">Name is required</p>
                )}
                {errorMessage && (
                    <p className="text-red-500 text-sm">{errorMessage}</p>
                )}
            </div>
            <div className="mb-2">
                <label id="dateLabel" htmlFor="date" className="block mb-1">
                    Date: <span className="text-red-500">*</span>
                </label>
                <DatePicker
                    selected={newInvoice.date ? new Date(newInvoice.date) : null}
                    onChange={handleDateSet}
                    dateFormat="yyyy-MM-dd"
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !newInvoice.date ? 'border-red-500' : ''}`}
                    id="date"
                    customInput={<CustomInput />}
                />
                {isSubmitted && !newInvoice.date && (
                    <p className="text-red-500 text-sm">Date is required</p>
                )}
            </div>
            <div className="mb-2">
                <label htmlFor="client" className="block mb-1">
                    Client: <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="client"
                    name="client"
                    value={newInvoice.client}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !newInvoice.client ? 'border-red-500' : ''}`}
                />
                {isSubmitted && !newInvoice.client && (
                    <p className="text-red-500 text-sm">Client is required</p>
                )}
            </div>
            <div className="mb-2">
                <label htmlFor="country" className="block mb-1">
                    Country: <span className="text-red-500">*</span>
                </label>
                <select
                    id="country"
                    name="country"
                    value={newInvoice.country}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${isSubmitted && !newInvoice.country ? 'border-red-500' : ''}`}
                >
                    <option value="" disabled>Select a country</option>
                    {data.countries.map((country: { name: string }, index: number) => (
                        <option key={index} value={country.name}>
                            {country.name}
                        </option>
                    ))}
                </select>
                {isSubmitted && !newInvoice.country && (
                    <p className="text-red-500 text-sm">Country is required</p>
                )}
            </div>
            <div className="mb-2">
                <label htmlFor="status" className="block mb-1">Status:</label>
                <select
                    id="status"
                    name="status"
                    value={newInvoice.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                </select>
            </div>
            <div className="flex justify-end">
                <button onClick={handleSave} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Save
                </button>
                <button onClick={onCancelCreate} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default CreateInvoice;
