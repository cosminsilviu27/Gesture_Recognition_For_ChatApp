import React, { useState, useEffect } from 'react';
import './style/Message.css';
import useAxios from '../utils/useAxios';
import jwtDecode from 'jwt-decode';
import { Link, useHistory } from 'react-router-dom/';
import moment from 'moment';

function Message() {
    const baseURL = 'http://127.0.0.1:8000/api';
    const backendBaseUrl = 'http://127.0.0.1:8000';
    const [messages, setMessages] = useState([]);
    let [newSearch, setNewSearch] = useState({ search: "" });

    const axios = useAxios();

    const token = localStorage.getItem('authTokens');
    const decoded = jwtDecode(token);
    const user_id = decoded.user_id;
    const history = useHistory();

    useEffect(() => {
        try {
            axios.get(`${baseURL}/my-messages/${user_id}/`).then(res => {
                setMessages(res.data);

                if (res.data.length > 0) {
                    const lastMessage = res.data[0];
                    const chatPartnerId = (lastMessage.sender.id === user_id)
                        ? lastMessage.reciever.id
                        : lastMessage.sender.id;

                    history.push(`/inbox/${chatPartnerId}/`);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleSearchChange = event => {
        setNewSearch({
            ...newSearch,
            [event.target.name]: event.target.value,
        });
    };

    const searchUser = () => {
        axios.get(`${baseURL}/search/${newSearch.username}/`)
            .then(res => {
                if (res.status === 404) {
                    console.log(res.data.detail);
                    alert("User does not exist");
                } else {
                    history.push(`/search/${newSearch.username}/`);
                }
            })
            .catch(error => {
                alert("User Does Not Exist");
            });
    };

    return (
        <div>
            <main className="content" style={{ marginTop: "150px" }}>
                <div className="container p-0">
                    <h1 className="h3 mb-3">Messages</h1>
                    <div className="card">
                        <div className="row g-0">
                            <div className="col-12 col-lg-5 col-xl-3 border-right">
                                <div className="px-4">
                                    <div className="d-flex align-items-center">
                                        <input
                                            type="text"
                                            className="form-control my-3"
                                            placeholder="Search..."
                                            onChange={handleSearchChange}
                                            name='username'
                                        />
                                        <button className='ml-2' onClick={searchUser} style={{border:"none", borderRadius:"50%"}}><i className='fas fa-search'></i></button>
                                    </div>
                                </div>

                                {messages.map(message => (
                                    <Link 
                                        to={`/inbox/${(message.sender.id === user_id) ? message.reciever.id : message.sender.id}/`}
                                        className="list-group-item list-group-item-action border-0"
                                    >
                                        <small><div className="badge bg-success float-right text-white">{moment.utc(message.date).local().fromNow()}</div></small>
                                        <div className="d-flex align-items-start">
                                            {(message.sender.id !== user_id) &&
                                                <img src={message.sender_profile.image} className="rounded-circle mr-1" alt="1" width={40} height={40}/>
                                            }
                                            {(message.sender.id === user_id) &&
                                                <img src={message.reciever_profile.image} className="rounded-circle mr-1" alt="2" width={40} height={40}/>
                                            }

                                            <div className="flex-grow-1 ml-3">
                                                {(message.sender.id === user_id) &&
                                                    (message.reciever_profile.full_name !== null ? message.reciever_profile.full_name : message.reciever.username)
                                                }

                                                {(message.sender.id !== user_id) &&
                                                    (message.sender.username)
                                                }

                                                <div className="small"><small>{message.message}</small></div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}

                                <hr className="d-block d-lg-none mt-1 mb-0" />
                            </div>

                            <div className="col-12 col-lg-7 col-xl-9">
                                <div className="py-2 px-4 border-bottom d-none d-lg-block">
                                    <div className="d-flex align-items-center py-1">
                                        {/* Add remaining chat UI code here */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Message;
