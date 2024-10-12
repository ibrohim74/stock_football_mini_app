import React, {useEffect, useState} from 'react';
import {$API} from "../../../utils/https.jsx";
import {useParams} from "react-router-dom";
import "./rating_list.css"
import LoaderFootball from "../../../component/loader/loader_football.jsx";
import {jwtDecode} from "jwt-decode";

const RatingsList = () => {
    const [status, setStatus] = useState([]);
    const [userScore, setUserScore] = useState(0);
    const [currentStatus, setCurrentStatus] = useState({});
    const [loading, setLoading] = useState(false);
    const {token} = useParams();
    const decoded = jwtDecode(token);
    const user_id = parseInt(decoded.user_id, 10);
    const getUserData = async () => {
        setLoading(true); // Start loading
        try {
            const res = await $API.get(`/status`);
            const getUser = await $API.get(`/users/${user_id}`);
            setStatus(res.data);
            setCurrentStatus(getUser.data.status)
            setUserScore(getUser.data.user_data.coins)
            console.log(getUser)
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false); // End loading
        }
    };

    const formatCoins = (coins) => {
        const num = parseInt(coins, 10); // Make sure it's a number
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1) + 'B'; // Billion
        } else if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M'; // Million
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'k'; // Thousand
        } else {
            return num.toString(); // Less than 1000, show as is
        }
    };

    useEffect(() => {
        getUserData();
    }, [token]); // Fetch data when user_id changes

    return (
        <div className="rating_list">
            {loading ? (

                <LoaderFootball/>

            ) : (

                <div className="rating_list_content">

                    {status.map((item, index) => {
                        return (
                            <div className={`rating_list_item ${item.name === currentStatus.name && "active"}`} key={index}>
                                <div className="rating_list_item_left">
                                    <h1>{item.name}</h1>
                                </div>

                                <div className="rating_list_item_right">
                                    <h1>
                                        {item.name === currentStatus.name ? <>
                                            {formatCoins(userScore)} / {formatCoins(currentStatus.limit_coin)}
                                        </> : <>
                                        {formatCoins(item.limit_coin)}
                                        </>}
                                    </h1>
                                </div>

                            </div>
                        )
                    })}

                </div>

            )}

        </div>
    );
};

export default RatingsList;