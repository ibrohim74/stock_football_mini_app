import React from 'react';
import "./rating.css";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import ball from '../../assets/icons/soccer_ball.png';
import {useParams} from "react-router-dom";

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

const StatusUsers = [
    {
        id: 0,
        status: "Mahalla Futbolchisi",
        table_data: [
            { id: 1, username: "Mahalla Futbolchisi", coins: "15342" },
            { id: 2, username: "Mahalla Futbolchisi", coins: "14523" },
            { id: 3, username: "Mahalla Futbolchisi", coins: "13210" },
            { id: 4, username: "Oddiy Yigit 4", coins: "12456" },
            { id: 5, username: "Oddiy Yigit 5", coins: "11230" },
            { id: 6, username: "Oddiy Yigit 6", coins: "10789" },
            { id: 7, username: "Oddiy Yigit 7", coins: "9542" },
            { id: 8, username: "Oddiy Yigit 8", coins: "8423" },
            { id: 9, username: "Oddiy Yigit 9", coins: "7350" },
            { id: 10, username: "Oddiy Yigit 10", coins: "8023" },
            { id: 11, username: "Oddiy Yigit 11", coins: "5200" },
            { id: 12, username: "Oddiy Yigit 12", coins: "4000" },
            { id: 13, username: "Oddiy Yigit 13", coins: "3400" },
            { id: 14, username: "Oddiy Yigit 13", coins: "3300" },
            { id: 15, username: "Oddiy Yigit 13", coins: "2880" },
            { id: 1376002269, username: "Khasanov_ibroxim", coins: "2850" },
        ]
    },
    {
        id: 1,
        status: "Havaskor Futbolchi",
        table_data: [
            { id: 1, username: "Talaba 1", coins: "15342" },
            { id: 2, username: "Talaba 2", coins: "14523" },
            { id: 3, username: "Talaba 3", coins: "13210" },
            { id: 4, username: "Talaba 4", coins: "12456" },
            { id: 5, username: "Talaba 5", coins: "11230" },
            { id: 6, username: "Talaba 6", coins: "10789" },
            { id: 7, username: "Talaba 7", coins: "9542" },
            { id: 8, username: "Talaba 8", coins: "8423" },
            { id: 9, username: "Talaba 9", coins: "7350" },
            { id: 10, username: "Talaba 10", coins: "6523" },
            { id: 11, username: "Talaba 11", coins: "5200" },
            { id: 12, username: "Talaba 12", coins: "4000" },
        ]
    },
    {
        id: 2,
        status: "Akademiya Futbolchisi",
        table_data: [
            { id: 1, username: "Stajyor 1", coins: "15342" },
            { id: 2, username: "Stajyor 2", coins: "14523" },
            { id: 3, username: "Stajyor 3", coins: "13210" },
            { id: 4, username: "Stajyor 4", coins: "12456" },
            { id: 5, username: "Stajyor 5", coins: "11230" },
            { id: 6, username: "Stajyor 6", coins: "10789" },
            { id: 7, username: "Stajyor 7", coins: "9542" },
            { id: 8, username: "Stajyor 8", coins: "8423" },
            { id: 9, username: "Stajyor 9", coins: "7350" },
            { id: 10, username: "Stajyor 10", coins: "6523" },
            { id: 11, username: "Stajyor 11", coins: "5200" },
            { id: 12, username: "Stajyor 12", coins: "4000" },
        ]
    },
    {
        id: 3,
        status: "Professional Futbolchi",
        table_data: [
            { id: 1, username: "Mutaxassis 1", coins: "15342" },
            { id: 2, username: "Mutaxassis 2", coins: "14523" },
            { id: 3, username: "Mutaxassis 3", coins: "13210" },
            { id: 4, username: "Mutaxassis 4", coins: "12456" },
            { id: 5, username: "Mutaxassis 5", coins: "11230" },
            { id: 6, username: "Mutaxassis 6", coins: "10789" },
            { id: 7, username: "Mutaxassis 7", coins: "9542" },
            { id: 8, username: "Mutaxassis 8", coins: "8423" },
            { id: 9, username: "Mutaxassis 9", coins: "7350" },
            { id: 10, username: "Mutaxassis 10", coins: "6523" },
            { id: 11, username: "Mutaxassis 11", coins: "5200" },
            { id: 12, username: "Mutaxassis 12", coins: "4000" },
        ]
    },
    {
        id: 4,
        status: "Terma Jamoa",
        table_data: [
            { id: 1, username: "Menejer 1", coins: "15342" },
            { id: 2, username: "Menejer 2", coins: "14523" },
            { id: 3, username: "Menejer 3", coins: "13210" },
            { id: 4, username: "Menejer 4", coins: "12456" },
            { id: 5, username: "Menejer 5", coins: "11230" },
            { id: 6, username: "Menejer 6", coins: "10789" },
            { id: 7, username: "Menejer 7", coins: "9542" },
            { id: 8, username: "Menejer 8", coins: "8423" },
            { id: 9, username: "Menejer 9", coins: "7350" },
            { id: 10, username: "Menejer 10", coins: "6523" },
            { id: 11, username: "Menejer 11", coins: "5200" },
            { id: 12, username: "Menejer 12", coins: "4000" },
            { id: 12, username: "Menejer 12", coins: "4000" },
        ]
    },
    {
        id: 5,
        status: "Chempiyon",
        table_data: [
            { id: 1, username: "Usta 1", coins: "15342" },
            { id: 2, username: "Usta 2", coins: "14523" },
            { id: 3, username: "Usta 3", coins: "13210" },
            { id: 4, username: "Usta 4", coins: "12456" },
            { id: 5, username: "Usta 5", coins: "11230" },
            { id: 6, username: "Usta 6", coins: "10789" },
            { id: 7, username: "Usta 7", coins: "9542" },
            { id: 8, username: "Usta 8", coins: "8423" },
            { id: 9, username: "Usta 9", coins: "7350" },
            { id: 10, username: "Usta 10", coins: "6523" },
            { id: 11, username: "Usta 11", coins: "5200" },
            { id: 12, username: "Usta 12", coins: "4000" },
        ]
    },
    {
        id: 6,
        status: "Legenda",
        table_data: [
            { id: 1, username: "Rahbar 1", coins: "15342" },
            { id: 2, username: "Rahbar 2", coins: "14523" },
            { id: 3, username: "Rahbar 3", coins: "13210" },
            { id: 4, username: "Rahbar 4", coins: "12456" },
            { id: 5, username: "Rahbar 5", coins: "11230" },
            { id: 6, username: "Rahbar 6", coins: "10789" },
            { id: 7, username: "Rahbar 7", coins: "9542" },
            { id: 8, username: "Rahbar 8", coins: "8423" },
            { id: 9, username: "Rahbar 9", coins: "7350" },
            { id: 10, username: "Rahbar 10", coins: "6523" },
            { id: 11, username: "Rahbar 11", coins: "5200" },
            { id: 12, username: "Rahbar 12", coins: "4000" },
        ]
    }
];

const Rating = () => {
    const [selectedStatus, setSelectedStatus] = React.useState(StatusUsers[0].status);
    const { user_id } = useParams();

    const handleSlideClick = (status) => setSelectedStatus(status);

    const selectedData = StatusUsers.find(user => user.status === selectedStatus);
    const top10Data = selectedData ? [...selectedData.table_data].sort((a, b) => b.coins - a.coins).slice(0, 10) : [];

    // Foydalanuvchini topish
    const currentUserData = selectedData?.table_data.find(item => item.id.toString() === user_id);

    const finalData = currentUserData && !top10Data.some(item => item.id === currentUserData.id)
        ? [...top10Data, currentUserData]
        : top10Data;

    // Foydalanuvchini joylash va uning o'rnini topish
    const allData = currentUserData ? [...selectedData.table_data] : []; // Foydalanuvchini ko'rsatish uchun to'liq ma'lumot
    const sortedAllData = [...allData].sort((a, b) => b.coins - a.coins);
    const userRank = sortedAllData.findIndex(item => item.id.toString() === user_id) + 1;

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
                {StatusUsers.map((user) => (
                    <SwiperSlide
                        key={user.id}
                        onClick={() => handleSlideClick(user.status)}
                        className={user.status === selectedStatus ? "selected" : ""}
                    >
                        {user.status}
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="rating_table">
                {finalData.length > 0 ? (
                    finalData.map((item, index) => (
                        <div className={`rating_table_item ${item.id.toString() === user_id ? "rating_table_item_current_user" : ""}`} key={item.id}>
                            <div className="rating_table_item_info">
                                <h1>{item.username}</h1>
                                <p>
                                    <img loading={"lazy"} src={ball} alt="soccer ball" /> +{formatCoins(item.coins)}
                                </p>
                            </div>
                            <div className="rating_table_item_rating">
                                <h1>{item.id.toString() === user_id ? userRank : index + 1}</h1>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No data available for the selected status</p>
                )}
            </div>
        </div>
    );
};


export default Rating;
