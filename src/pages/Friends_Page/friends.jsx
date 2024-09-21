import React, { useState } from 'react';
import "./friends.css";
import gift from "../../assets/imgs/perspective_matte-87-128x128.png";
import ball from "../../assets/icons/soccer_ball.png";
import user_img from "../../assets/imgs/perspective_matte-59-128x128.png";
import reload from "../../assets/imgs/reload.png";
import { CopyOutlined } from "@ant-design/icons";
import {message, notification} from "antd";

// ref_users malumotlari
const ref_users = [
    { id: 1, username: "khasanov_ibroxim1", status: "junior" },
    { id: 2, username: "khasanov_ibroxim2", status: "junior" },
    { id: 3, username: "khasanov_ibroxim3", status: "junior" },
    { id: 4, username: "khasanov_ibroxim4", status: "junior" },
    { id: 5, username: "khasanov_ibroxim5", status: "junior" },
    { id: 6, username: "khasanov_ibroxim6", status: "junior" },
    { id: 7, username: "khasanov_ibroxim7", status: "junior" },
    { id: 8, username: "khasanov_ibroxim8", status: "junior" },
    { id: 9, username: "khasanov_ibroxim9", status: "junior" },
    { id: 10, username: "khasanov_ibroxim10", status: "junior" },
];

const Friends = () => {
    const [showAll, setShowAll] = useState(false);
    const shareLink = "https://t.me/share?url=https://t.me/stock_football_bot&text=asdsadasd"; // Ulashish uchun havola
    const [messageApi, contextHolder] = message.useMessage();
    const displayedUsers = showAll ? ref_users : ref_users.slice(0, 3);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareLink).then(() => {
            messageApi.success("Havola nusxalandi!");
        });
    };

    const openShareLink = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Do\'stni taklif qilish',
                text: 'Do\'stni taklif qilish uchun havola:',
                url: shareLink
            })
                .then(() => console.log('Havola muvaffaqiyatli ulashildi!'))
                .catch((error) => console.log('Ulashishda xato:', error));
        } else {
            window.open(shareLink, '_blank');
        }
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
                        <img src={gift} alt="Gift" />
                        <div className="friends_gift_card_text">
                            <h1>Do'st taklif qilish</h1>
                            <p><img src={ball} alt="Ball" />+5K taklif uchun</p>
                        </div>
                    </div>

                    <div className="friends_ref">
                        <div className="friends_ref_title">
                            <div className="friends_ref_title_top">
                                <h1>Do'stlar ro'yxati ({ref_users.length})</h1>
                                <img src={reload} alt="Ball" />
                            </div>
                            <p>{ref_users.length > 0 ? '' : 'Siz hali hech kimni taklif qilmagansiz'}</p>
                        </div>

                        <div className={`friends_ref_box ${showAll ? "show_all" : ""}`}>
                            {displayedUsers.map(user => (
                                <div key={user.id} className="friends_ref_item">
                                    <img src={user_img} alt="User" />
                                    <div className="friends_ref_item_info">
                                        <h1>{user.username}</h1>
                                        <p>{user.status}</p>
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
                                <CopyOutlined />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Friends;
