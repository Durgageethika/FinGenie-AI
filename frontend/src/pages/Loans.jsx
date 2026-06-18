import { useEffect, useState } from "react";
import API from "../services/api";

function Loans() {

    const [loans, setLoans] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [loan, setLoan] = useState({
        amount: "",
        tenure: "",
        status: ""
    });

    useEffect(() => {
        loadLoans();
    }, []);

    const loadLoans = async () => {
        try {
            const response = await API.get("/loans");
            setLoans(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setLoan({
            ...loan,
            [e.target.name]: e.target.value
        });
    };

    const editLoan = (loanData) => {

        setEditingId(loanData.id);

        setLoan({
            amount: loanData.amount,
            tenure: loanData.tenure,
            status: loanData.status
        });
    };

    const saveLoan = async () => {

        try {

            if (editingId) {

                await API.put(`/loans/${editingId}`, loan);

                alert("Loan Updated Successfully");

                setEditingId(null);

            } else {

                await API.post("/loans", loan);

                alert("Loan Added Successfully");
            }

            setLoan({
                amount: "",
                tenure: "",
                status: ""
            });

            loadLoans();

        } catch(error){

    if(error.response){
        alert(JSON.stringify(error.response.data));
    }
    else{
        alert("Operation Failed");
    }
}
    };

    const deleteLoan = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this loan?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(`/loans/${id}`);

            alert("Loan Deleted Successfully");

            loadLoans();

        } catch (error) {

            console.error(error);

            alert("Delete Failed");
        }
    };

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">
    <h2 className="fw-bold">
        💰 Loans Management
    </h2>

    <span className="badge bg-warning text-dark p-2">
        Total Loans: {loans.length}
    </span>
</div>

            <div
    className="card shadow border-0 p-4 mb-4"
    style={{ borderRadius: "20px" }}
>

                <input
                    type="number"
                    name="amount"
                    placeholder="Loan Amount"
                    className="form-control mb-2"
                    value={loan.amount}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="tenure"
                    placeholder="Tenure (Months)"
                    className="form-control mb-2"
                    value={loan.tenure}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="status"
                    placeholder="Status"
                    className="form-control mb-2"
                    value={loan.status}
                    onChange={handleChange}
                />

                <button
                    className="btn btn-warning"
                    onClick={saveLoan}
                >
                    {editingId ? "Update Loan" : "Add Loan"}
                </button>

            </div>

            <table className="table table-hover table-striped shadow">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Amount</th>
                        <th>Tenure</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {loans.map((loan) => (
                        <tr key={loan.id}>
                            <td>{loan.id}</td>
                            <td>{loan.amount}</td>
                            <td>{loan.tenure}</td>
                            <td>{loan.status}</td>

                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => editLoan(loan)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteLoan(loan.id)}
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

export default Loans;