import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [customer, setCustomer] = useState({
        username:"",
        password:""
    });

    const handleChange = (e) => {

        setCustomer({
            ...customer,
            [e.target.name]:e.target.value
        });
    };

    const register = async () => {

    try {

        const response = await API.post(
            "/customers",
            customer
        );

        alert("Registration Successful");

        navigate("/");

    } catch (error) {

        if (error.response) {

            alert(
                JSON.stringify(error.response.data)
            );

        } else {

            alert("Registration Failed");
        }
    }
};

    return(

        <div className="container mt-5">

            <div className="card p-4 shadow">

                <h2>Register Customer</h2>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="form-control mb-2"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control mb-2"
                    onChange={handleChange}
                />

                <button
                    className="btn btn-success"
                    onClick={register}
                >
                    Register
                </button>

            </div>

        </div>
    );
}

export default Register;