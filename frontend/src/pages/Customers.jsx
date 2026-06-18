import { useEffect, useState } from "react";
import API from "../services/api";

function Customers() {

    const [customers, setCustomers] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");

    const [customer, setCustomer] = useState({
        username: "",
        email: "",
        password: "",
        role: "CUSTOMER"
    });

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            const response = await API.get("/customers");
            setCustomers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        });
    };

    const editCustomer = (cust) => {

        setEditingId(cust.id);

        setCustomer({
            username: cust.username,
            email: cust.email,
            password: cust.password,
            role: cust.role
        });
    };

    const saveCustomer = async () => {

        try {

            if (editingId) {

                await API.put(`/customers/${editingId}`, customer);

                alert("Customer Updated Successfully");

                setEditingId(null);

            } else {

                await API.post("/customers", customer);

                alert("Customer Added Successfully");
            }

            setCustomer({
                username: "",
                email: "",
                password: "",
                role: "CUSTOMER"
            });

            loadCustomers();

        } catch (error) {

            console.error(error);

            alert("Operation Failed");
        }
    };

    const deleteCustomer = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this customer?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(`/customers/${id}`);

            alert("Customer Deleted Successfully");

            loadCustomers();

        } catch (error) {

            console.error(error);

            alert("Delete Failed");
        }
    };

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">
    <h2 className="fw-bold">
        👥 Customer Management
    </h2>

    <span className="badge bg-primary p-2">
        Total Customers: {customers.length}
    </span>
</div>

            <div
    className="card shadow border-0 p-4 mb-4"
    style={{ borderRadius: "20px" }}
>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="form-control mb-2"
                    value={customer.username}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control mb-2"
                    value={customer.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control mb-2"
                    value={customer.password}
                    onChange={handleChange}
                />

                <select
                    name="role"
                    className="form-control mb-2"
                    value={customer.role}
                    onChange={handleChange}
                >
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>

                <button
                    className="btn btn-primary"
                    onClick={saveCustomer}
                >
                    {editingId ? "Update Customer" : "Add Customer"}
                </button>

            </div>

            <input
    type="text"
    className="form-control mb-4 shadow-sm"
    placeholder="🔍 Search Customer By Username..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
/>

            <table className="table table-hover table-striped shadow">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {customers
                        .filter((c) =>
                            c.username
                                ?.toLowerCase()
                                .includes(search.toLowerCase())
                        )
                        .map((c) => (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.username}</td>
                                <td>{c.email}</td>
                                <td>{c.role}</td>

                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => editCustomer(c)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteCustomer(c.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                </tbody>

            </table>

        </div>
    );
}

export default Customers;