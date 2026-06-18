import { useEffect, useState } from "react";
import API from "../services/api";

function Transactions() {

    const [transactions, setTransactions] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [transaction, setTransaction] = useState({
        transactionType: "",
        amount: "",
        transactionDate: ""
    });

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        try {
            const response = await API.get("/transactions");
            setTransactions(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value
        });
    };

    const editTransaction = (txn) => {

        setEditingId(txn.id);

        setTransaction({
            transactionType: txn.transactionType,
            amount: txn.amount,
            transactionDate: txn.transactionDate
                ? txn.transactionDate.substring(0, 16)
                : ""
        });
    };

    const saveTransaction = async () => {

        try {

            if (editingId) {

                await API.put(`/transactions/${editingId}`, transaction);

                alert("Transaction Updated Successfully");

                setEditingId(null);

            } else {

                await API.post("/transactions", transaction);

                alert("Transaction Added Successfully");
            }

            setTransaction({
                transactionType: "",
                amount: "",
                transactionDate: ""
            });

            loadTransactions();

        } catch(error){

    if(error.response){
        alert(JSON.stringify(error.response.data));
    }
    else{
        alert("Operation Failed");
    }

}
    };

    const deleteTransaction = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(`/transactions/${id}`);

            alert("Transaction Deleted Successfully");

            loadTransactions();

        } catch (error) {

            console.error(error);

            alert("Delete Failed");
        }
    };

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">
    <h2 className="fw-bold">
        🔄 Transactions Management
    </h2>

    <span className="badge bg-secondary p-2">
        Total Transactions: {transactions.length}
    </span>
</div>

            <div
    className="card shadow border-0 p-4 mb-4"
    style={{ borderRadius: "20px" }}
>

                <input
                    type="text"
                    name="transactionType"
                    placeholder="Transaction Type"
                    className="form-control mb-2"
                    value={transaction.transactionType}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    className="form-control mb-2"
                    value={transaction.amount}
                    onChange={handleChange}
                />

                <input
                    type="datetime-local"
                    name="transactionDate"
                    className="form-control mb-2"
                    value={transaction.transactionDate}
                    onChange={handleChange}
                />

                <button
                    className="btn btn-secondary"
                    onClick={saveTransaction}
                >
                    {editingId ? "Update Transaction" : "Add Transaction"}
                </button>

            </div>

           <table className="table table-hover table-striped shadow">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Transaction Type</th>
                        <th>Amount</th>
                        <th>Transaction Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {transactions.map((txn) => (
                        <tr key={txn.id}>
                            <td>{txn.id}</td>
                            <td>{txn.transactionType}</td>
                            <td>{txn.amount}</td>
                            <td>{txn.transactionDate}</td>

                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => editTransaction(txn)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteTransaction(txn.id)}
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

export default Transactions;