import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {

    const [user, setUser] = useState({});

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        try {

            const username =
                localStorage.getItem("username");

            const response =
                await API.get(`/customers/username/${username}`);

            setUser(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <div className="container mt-4">

            <div className="card shadow p-4">

                <h2 className="mb-4">
                    👤 Customer Profile
                </h2>

                <h4>
                    Welcome {user.username}
                </h4>

                <hr />

                <p>
                    <b>ID :</b> {user.id}
                </p>

                <p>
                    <b>Username :</b> {user.username}
                </p>

                <p>
                    <b>Email :</b> {user.email}
                </p>

                <p>
                    <b>Role :</b> {user.role}
                </p>

            </div>

        </div>
    );
}

export default Profile;