import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const Settings = () => {
    const {user_id} = useParams();

    useEffect(() => {

        const getUserInfo = async () => {
            try {
                const user = await axios.get(`http://84.247.160.205/users/${user_id}`);
                console.log(user)
            } catch (e) {
                console.log(e);
            }
        }
        getUserInfo();
    }, [])

    return (
        <div>

        </div>
    );
};

export default Settings;