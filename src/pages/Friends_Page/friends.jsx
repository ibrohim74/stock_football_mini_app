import React, {useState} from 'react';
import "./friends.css";
import gift from "../../assets/icon/freepik-export-20240923164119B0Nu.webp";
import ball from "../../assets/icons/soccer_ball.png";
import user_img from "../../assets/icon/xsxxa.webp";
import reload from "../../assets/icon/restart.webp";
import {CopyOutlined} from "@ant-design/icons";
import {message, notification} from "antd";
import AppBar from "../../component/App_bar/app_bar.jsx";

// ref_users malumotlari
const ref_users = [
    {id: 1, username: "khasanov_ibroxim1", status: "Professional Futbolchi", score: 4000000},
    {id: 2, username: "khasanov_ibroxim2", status: "Mahalla Futbolchisi", score: 430500},
    {id: 3, username: "khasanov_ibroxim3", status: "Havaskor Futbolchi", score: 50450},
    {id: 4, username: "khasanov_ibroxim4", status: "Akademiya Futbolchisi", score: 69032},
    {id: 5, username: "khasanov_ibroxim5", status: "Professional Futbolchi", score: 400000},
    {id: 6, username: "khasanov_ibroxim6", status: "Terma Jamoa", score: 4000000},
    {id: 7, username: "khasanov_ibroxim7", status: "Chempiyon", score: 4000000},
    {id: 8, username: "khasanov_ibroxim8", status: "Legenda", score: 4000000},
    {id: 9, username: "khasanov_ibroxim9", status: "Professional Futbolchi", score: 4000000},
    {id: 10, username: "khasanov_ibroxim10", status: "Professional Futbolchi", score: 4000000},
];

const Friends = () => {
    const [showAll, setShowAll] = useState(false);
    const shareLink = "https://t.me/stock_football_bot"; // Ulashish uchun havola
    const [messageApi, contextHolder] = message.useMessage();
    const displayedUsers = showAll ? ref_users : ref_users.slice(0, 3);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareLink).then(() => {
            messageApi.success("Havola nusxalandi!");
        });
    };

    const openShareLink = () => {
        // Telegram orqali to'g'ridan-to'g'ri ulashish havolasi ochiladi
        window.open(shareLink, '_blank');
    };

    const formatNumber = (num) => {
        if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(1) + 'k';
        return num.toString();
    };
    return (
        <div className="friends">
            {contextHolder}
            <div className="content_friends">
                <div className="friends_content">
                    <div className="friends_title">
                        <h1>Do'stlarni taklif qiling!</h1>
                        <p>Do'stingiz darajasi oshgani uchun darhol +5K va bonuslar olasiz</p>
                    </div>

                    <div className="friends_gift_card">
                        <img src={gift} loading={"lazy"} alt="Rating"/>
                        <div className="friends_gift_card_text">
                            <h1>Do'st taklif qilish</h1>
                            <p><img src={ball} loading={"lazy"} alt="Ball"/>+5K taklif uchun</p>
                        </div>
                    </div>

                    <div className="friends_ref">
                        <div className="friends_ref_title">
                            <div className="friends_ref_title_top">
                                <h1>Do'stlar ro'yxati ({ref_users.length})</h1>
                                <img src={reload} loading={"lazy"} alt="Ball" width={60} height={60}/>
                            </div>
                            <p>{ref_users.length > 0 ? '' : 'Siz hali hech kimni taklif qilmagansiz'}</p>
                        </div>

                        <div className={`friends_ref_box ${showAll ? "show_all" : ""}`}>
                            {displayedUsers.map(user => (
                                <div key={user.id} className="friends_ref_item">
                                    <img src={user_img} loading={"lazy"} alt="User"/>
                                    <div className="friends_ref_item_info">
                                        <h1>{user.username}</h1>
                                        <p>
                                            {user.status}
                                            <span><img  loading={"lazy"} src={ball} alt=""/>{formatNumber(user.score)}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {!showAll && ref_users.length > 0 && (
                                <button onClick={() => setShowAll(true)} className="show_more_button">
                                    Barchasini ko'rsatish
                                </button>
                            )}
                        </div>

                        <div className="ref_link_box">
                            <div className="ref_button" onClick={openShareLink}>Do`stni taklif qilish</div>
                            <div className="ref_link" onClick={copyToClipboard}>
                                <CopyOutlined/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Friends;
