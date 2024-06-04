import { useState, useEffect } from 'react';
import useAxios from "../utils/useAxios";
import jwtDecode from 'jwt-decode';

function Dashboard() {
    const backendBaseUrl = 'http://127.0.0.1:8000';

    const [res, setRes] = useState("");
    const api = useAxios();
    const token = localStorage.getItem("authTokens");

    let user_id, username, full_name, image;
    if (token) {
        const decode = jwtDecode(token);
        user_id = decode.user_id;
        username = decode.username;
        full_name = decode.full_name;
        image = decode.image;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/test/");
                setRes(response.data.response);
            } catch (error) {
                console.log(error);
                setRes("Something went wrong");
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await api.post("/test/");
                setRes(response.data.response);
            } catch (error) {
                console.log(error);
                setRes("Something went wrong");
            }
        };
        fetchPostData();
    }, []);

    return (
        <div>
            <div className="container-fluid" style={{ paddingTop: "100px" }}>
                <div className="row">
                    <div className="col-md-3 ml-sm-auto col-lg-2 pt-3 px-4">
                      <img
                        src={`${backendBaseUrl}/media/default.jpg`} 
                        alt="Gesture Recognition"
                        style={{ height: "auto", maxHeight: "30vh", objectFit: "contain", width: '100%' }}  // Ensures image doesn't exceed 30% of viewport height
                      />
                      <h2 style={{ marginTop: '30px'  }}>Gesture Detection</h2>
                      <img
                        src={`${backendBaseUrl}/media/logo.jpg`} 
                        alt="Gesture Detection"
                        style={{ height: "auto", maxHeight: "70vh", objectFit: "contain", width: '100%', marginTop: '10px'  }}  // Ensures image doesn't exceed 70% of viewport height and adds a top margin
                      />
                    </div>
                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                            <h1 className="h2">My Dashboard</h1>

                            <div className="col-md-5"> {/* Adjust the column width as needed */}
                                <h2>Hello {username}!</h2>
                            </div>
                        </div>

                        <div className="alert alert-success d-flex align-items-center">
                            <strong>{res}</strong>
                        </div>

                        {/* Second image in blue area */}
                        <div className="row mt-2">
                            <div className="col-12">
                                <img
                                    src={`${backendBaseUrl}/media/logo.jpg`}   // Placeholder or own image
                                    alt="Gesture Detection"
                                    className="w-100"
                                />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
