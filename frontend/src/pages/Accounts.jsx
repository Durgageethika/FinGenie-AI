import { useEffect, useState } from "react";
import API from "../services/api";

function Accounts() {

    const [accounts, setAccounts] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [account, setAccount] = useState({
        accountNumber: "",
        accountType: "",
        balance: ""
    });

    useEffect(() => {
        loadAccounts();
    }, []);

    const loadAccounts = async () => {
        try {
            const response = await API.get("/accounts");
            setAccounts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value
        });
    };

    const editAccount = (acc) => {

        setEditingId(acc.id);

        setAccount({
            accountNumber: acc.accountNumber,
            accountType: acc.accountType,
            balance: acc.balance
        });
    };

    const saveAccount = async () => {

        try {

            if (editingId) {

                await API.put(`/accounts/${editingId}`, account);

                alert("Account Updated Successfully");

                setEditingId(null);

            } else {

                await API.post("/accounts", account);

                alert("Account Added Successfully");
            }

            setAccount({
                accountNumber: "",
                accountType: "",
                balance: ""
            });

            loadAccounts();

        } catch(error){

    console.log(error);

    if(error.response){
        alert(JSON.stringify(error.response.data));
    }
    else{
        alert("Operation Failed");
    }
}
    };

    const deleteAccount = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this account?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(`/accounts/${id}`);

            alert("Account Deleted Successfully");

            loadAccounts();

        } catch (error) {

            console.error(error);

            alert("Delete Failed");
        }
    };

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">
    <h2 className="fw-bold">
        🏦 Accounts Management
    </h2>

    <span className="badge bg-success p-2">
        Total Accounts: {accounts.length}
    </span>
</div>

            <div
    className="card shadow border-0 p-4 mb-4"
    style={{ borderRadius: "20px" }}
>

                <input
                    type="text"
                    name="accountNumber"
                    placeholder="Account Number"
                    className="form-control mb-2"
                    value={account.accountNumber}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="accountType"
                    placeholder="Account Type"
                    className="form-control mb-2"
                    value={account.accountType}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="balance"
                    placeholder="Balance"
                    className="form-control mb-2"
                    value={account.balance}
                    onChange={handleChange}
                />

                <button
                    className="btn btn-success"
                    onClick={saveAccount}
                >
                    {editingId ? "Update Account" : "Add Account"}
                </button>

            </div>

            <table className="table table-hover table-striped shadow">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Account Number</th>
                        <th>Account Type</th>
                        <th>Balance</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {accounts.map((acc) => (
                        <tr key={acc.id}>
                            <td>{acc.id}</td>
                            <td>{acc.accountNumber}</td>
                            <td>{acc.accountType}</td>
                            <td>{acc.balance}</td>

                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => editAccount(acc)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteAccount(acc.id)}
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

export default Accounts;