import { useEffect, useState } from "react";
import API from "../services/api";

function FraudAlerts() {

    const [alerts, setAlerts] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [alertData, setAlertData] = useState({
        alertMessage: "",
        riskLevel: ""
    });

    useEffect(() => {
        loadAlerts();
    }, []);

    const loadAlerts = async () => {
        try {
            const response = await API.get("/fraudalerts");
            setAlerts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setAlertData({
            ...alertData,
            [e.target.name]: e.target.value
        });
    };

    const editAlert = (item) => {

        setEditingId(item.id);

        setAlertData({
            alertMessage: item.alertMessage,
            riskLevel: item.riskLevel
        });
    };

    const saveAlert = async () => {

        try {

            if (editingId) {

                await API.put(`/fraudalerts/${editingId}`, alertData);

                alert("Fraud Alert Updated Successfully");

                setEditingId(null);

            } else {

                await API.post("/fraudalerts", alertData);

                alert("Fraud Alert Added Successfully");
            }

            setAlertData({
                alertMessage: "",
                riskLevel: ""
            });

            loadAlerts();

        } catch(error){

    if(error.response){
        alert(JSON.stringify(error.response.data));
    }
    else{
        alert("Operation Failed");
    }

}
    };

    const deleteAlert = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this alert?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(`/fraudalerts/${id}`);

            alert("Fraud Alert Deleted Successfully");

            loadAlerts();

        } catch (error) {

            console.error(error);

            alert("Delete Failed");
        }
    };

    return (
        <div className="container mt-4">

           <div className="d-flex justify-content-between align-items-center mb-4">
    <h2 className="fw-bold text-danger">
        ⚠️ Fraud Alerts Management
    </h2>

    <span className="badge bg-danger p-2">
        Total Alerts: {alerts.length}
    </span>
</div>

            <div
    className="card shadow border-0 p-4 mb-4"
    style={{ borderRadius: "20px" }}
>

                <input
                    type="text"
                    name="alertMessage"
                    placeholder="Alert Message"
                    className="form-control mb-2"
                    value={alertData.alertMessage}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="riskLevel"
                    placeholder="Risk Level"
                    className="form-control mb-2"
                    value={alertData.riskLevel}
                    onChange={handleChange}
                />

                <button
                    className="btn btn-danger"
                    onClick={saveAlert}
                >
                    {editingId ? "Update Alert" : "Add Fraud Alert"}
                </button>

            </div>

            <table className="table table-hover table-striped shadow">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Alert Message</th>
                        <th>Risk Level</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {alerts.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.alertMessage}</td>
                            <td>{item.riskLevel}</td>

                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => editAlert(item)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteAlert(item.id)}
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

export default FraudAlerts;