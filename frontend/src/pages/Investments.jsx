import { useEffect, useState } from "react";
import API from "../services/api";

function Investments() {

    const [investments, setInvestments] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [investment, setInvestment] = useState({
        investmentType: "",
        amount: ""
    });

    useEffect(() => {
        loadInvestments();
    }, []);

    const loadInvestments = async () => {
        try {
            const response = await API.get("/investments");
            setInvestments(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setInvestment({
            ...investment,
            [e.target.name]: e.target.value
        });
    };

    const editInvestment = (inv) => {

        setEditingId(inv.id);

        setInvestment({
            investmentType: inv.investmentType,
            amount: inv.amount
        });
    };

    const saveInvestment = async () => {

        try {

            if (editingId) {

                await API.put(`/investments/${editingId}`, investment);

                alert("Investment Updated Successfully");

                setEditingId(null);

            } else {

                await API.post("/investments", investment);

                alert("Investment Added Successfully");
            }

            setInvestment({
                investmentType: "",
                amount: ""
            });

            loadInvestments();

        } catch(error){

    if(error.response){
        alert(JSON.stringify(error.response.data));
    }
    else{
        alert("Operation Failed");
    }

}
    };

    const deleteInvestment = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this investment?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(`/investments/${id}`);

            alert("Investment Deleted Successfully");

            loadInvestments();

        } catch (error) {

            console.error(error);

            alert("Delete Failed");
        }
    };

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">
    <h2 className="fw-bold">
        📈 Investments Management
    </h2>

    <span className="badge bg-info p-2">
        Total Investments: {investments.length}
    </span>
</div>

            <div
    className="card shadow border-0 p-4 mb-4"
    style={{ borderRadius: "20px" }}
>

                <input
                    type="text"
                    name="investmentType"
                    placeholder="Investment Type"
                    className="form-control mb-2"
                    value={investment.investmentType}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    className="form-control mb-2"
                    value={investment.amount}
                    onChange={handleChange}
                />

                <button
                    className="btn btn-info"
                    onClick={saveInvestment}
                >
                    {editingId ? "Update Investment" : "Add Investment"}
                </button>

            </div>

            <table className="table table-hover table-striped shadow">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Investment Type</th>
                        <th>Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {investments.map((inv) => (
                        <tr key={inv.id}>
                            <td>{inv.id}</td>
                            <td>{inv.investmentType}</td>
                            <td>{inv.amount}</td>

                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => editInvestment(inv)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteInvestment(inv.id)}
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

export default Investments;