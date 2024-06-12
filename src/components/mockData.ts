export const mockInvoices = [
  {
    id: 1,
    name: "Invoice 1",
    date: "2024-06-10",
    client: "Client A",
    country: "USA",
    status: "Paid",
  },
  {
    id: 2,
    name: "Invoice 2",
    date: "2024-06-11",
    client: "Client B",
    country: "UK",
    status: "Unpaid",
  },
  {
    id: 3,
    name: "Invoice 3",
    date: "2024-06-12",
    client: "Client C",
    country: "Canada",
    status: "Paid",
  },
];

export const mockSoldItems = [
  { id: 1, name: "Item 1", quantity: 10 },
  { id: 2, name: "Item 2", quantity: 20 },
  { id: 3, name: "Item 3", quantity: 15 },
];

export const mockCustomers = [
  { id: 1, name: "Customer 1", email: "customer1@example.com" },
  { id: 2, name: "Customer 2", email: "customer2@example.com" },
  { id: 3, name: "Customer 3", email: "customer3@example.com" },
];

export const mockSalesData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Sales",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: "rgba(54, 162, 235, 0.6)",
    },
  ],
};
