import React, { useEffect, useState } from 'react';
import "./rating.css";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import ball from '../../assets/icons/soccer_ball.png';
import { useParams } from "react-router-dom";
import $API from "../../utils/https.jsx";
import LoaderFootball from "../../component/loader/loader_football.jsx";
import {useTranslation} from "react-i18next";

// Helper function to format coins
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

const Rating = () => {
    const [selectedStatus, setSelectedStatus] = useState(null); // Initialize without selected status
    const [status, setStatus] = useState([]);
    const [selectData, setSelectData] = useState(null);
    const [loading, setLoading] = useState(false); // Manage loading state
    const [currentUserRank, setCurrentUserRank] = useState({});
    const { user_id } = useParams();
    const {t} = useTranslation();
    const handleSlideClick = (status) => setSelectedStatus(status);

    // Find selected status data
    const selectedData = selectData ? selectData[selectedStatus] : [];
    const top10Data = selectedData ? [...selectedData].sort((a, b) => b.coin - a.coin).slice(0, 10) : [];

    const getUserData = async () => {
        setLoading(true); // Start loading
        try {
            const res = await $API.get(`/users/${user_id}`);
            const statuses = Object.keys(res.data.top_10); // Get status keys
            setStatus(statuses);
            setSelectData(res.data.top_10);
            setCurrentUserRank({
                ...res.data.rank,
                username: res.data.user_data.username ? res.data.user_data.username : res.data.user_data.first_name,
                coin: res.data.user_data.coins,
                id: res.data.user_data.id
            });
            if (statuses.length > 0) {
                setSelectedStatus(statuses[0]);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        getUserData();
    }, [user_id]); // Fetch data when user_id changes

    return (
        <div className="rating">
            <Swiper
                slidesPerView={2.5}
                spaceBetween={10}
                loop={false}
                pagination={{ clickable: true }}
                navigation
                className="ratingSwiper"
            >
                {status.map((stat, index) => (
                    <SwiperSlide
                        key={index}
                        onClick={() => handleSlideClick(stat)}
                        className={stat === selectedStatus ? "selected" : ""}
                    >
                        {stat}
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="rating_table">
                {loading ? (
                    <LoaderFootball /> // Show loader when data is being fetched
                ) : top10Data.length > 0 ? (
                    top10Data.map((item, index) => (
                        <div
                            className={`rating_table_item ${item.user_id.toString() === user_id ? "rating_table_item_current_user" : ""}`}
                            key={item.user_id}
                        >
                            <div className="rating_table_item_info">
                                <h1>{item.username}</h1>
                                <p>
                                    <img loading={"lazy"} src={ball} alt="soccer ball" /> +{formatCoins(item.coin)}
                                </p>
                            </div>
                            <div className="rating_table_item_rating">
                                <h1>{index + 1}</h1>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>{t("no_data")}</p>
                )}

                {currentUserRank &&
                    selectedStatus === currentUserRank.status &&
                    !top10Data.some(item => item.user_id === currentUserRank.id) && (
                        <div className="rating_table_item rating_table_item_current_user">
                            <div className="rating_table_item_info">
                                <h1>{currentUserRank.username}</h1> {/* Assuming `username` is part of the `currentUserRank` data */}
                                <p>
                                    <img loading={"lazy"} src={ball} alt="soccer ball" /> +{formatCoins(currentUserRank.coin)}
                                </p>
                            </div>
                            <div className="rating_table_item_rating">
                                <h1>{currentUserRank.rank}</h1>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default Rating;
