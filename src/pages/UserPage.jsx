import React, {useEffect} from 'react';
import {useState} from "react";
import {sendApiPostRequest} from "../utiles/ApiRequests";
import AddGame from "../components/AddGame";
import LoginForm from "../components/LoginForm";

const UserPage = () => {



    const [postResponse, setPostResponse] = useState({
        errorCode:-1,
        token: "",
        success: null
    })
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (postResponse.errorCode > 0) {
            alert("Wrong username or password")
        }
    },[postResponse])

    const usernameChange = (e) => {
        setUsername(e.target.value)
    }

    const passwordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        sendApiPostRequest("http://localhost:8989/login", {
            username: username, password: password
        }, setPostResponse)

    }


    return (
        <div>
            {
                (postResponse.success) ? <AddGame token={postResponse.token}/> :
                    <LoginForm handleSubmit={handleSubmit} username={username} password={password} usernameChange={usernameChange} passwordChange={passwordChange}/>
            }
        </div>
    );
};

export default UserPage;