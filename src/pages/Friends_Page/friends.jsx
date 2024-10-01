import React, { useEffect, useState } from 'react';
import "./friends.css";
import gift from "../../assets/icon/freepik-export-20240923164119B0Nu.webp";
import ball from "../../assets/icons/soccer_ball.png";
import user_img from "../../assets/icon/xsxxa.webp";
import reload from "../../assets/icon/restart.webp";
import { CopyOutlined } from "@ant-design/icons";
import { message } from "antd";
import AppBar from "../../component/App_bar/app_bar.jsx";
import { useTranslation } from "react-i18next";
import $API from "../../utils/https.jsx";
import { useParams } from "react-router-dom";

const Friends = () => {
    const [showAll, setShowAll] = useState(false);
    const [friendsData, setFriendsData] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [remainingTime, setRemainingTime] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [hoursBonusCoin, setHoursBonusCoin] = useState(null);
    const { t } = useTranslation();
    const [messageApi, contextHolder] = message.useMessage();
    const { user_id } = useParams();

    const displayedUsers = showAll ? friendsData : friendsData.slice(0, 3);

    const getUserData = async () => {
        try {
            const res = await $API.get(`/users/${user_id}`);
            console.log(res)
            setFriendsData(res.data.friends);
            setCurrentUser(res.data.user_data)

        } catch (e) {
            console.log(e);
        }
    };
    console.log(currentUser);
    const getClaim = async () => {
        const threeHoursInMs = 8*60*60*1000;
        const startTime = Date.now();
        const endTime = startTime + threeHoursInMs;

        // Vaqtni localStorage ga saqlash
        localStorage.setItem('friendsStartTime', startTime.toString());
        localStorage.setItem('friendsEndTime', endTime.toString());

        // Qolgan vaqtni hisoblash
        setRemainingTime(endTime - Date.now());
        setButtonDisabled(true);

        const timerId = setInterval(() => {
            const savedEndTime = parseInt(localStorage.getItem('friendsEndTime'), 10);
            const currentTime = Date.now();
            const timeLeft = savedEndTime - currentTime;

            if (timeLeft <= 1000) {
                clearInterval(timerId);
                setButtonDisabled(false);
                localStorage.removeItem('friendsStartTime');
                localStorage.removeItem('friendsEndTime');

                return;
            }

            setRemainingTime(timeLeft);
        }, 1000);

        try {
            const res = await $API.post(`/referral/activate/${user_id}`);
            console.log(res);
            setHoursBonusCoin(res.data.coin);
        if (res.status === 200){
            getUserData()
        }
            setTimeout(() => {
                setHoursBonusCoin(null);
            }, 3000);
        } catch (e) {
            console.log(e);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`https://t.me/snkrsshoopbot?start=${user_id}`).then(() => {
            messageApi.success("Havola nusxalandi!");
        });
    };

    const openShareLink = () => {
        window.open(`https://t.me/share/url?url=https://t.me/snkrsshoopbot?start=${user_id}`, '_blank');
    };

    const formatNumber = (num) => {
        if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(1) + 'k';
        return num.toString();
    };

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
    };

    useEffect(() => {
        getUserData();
    }, [user_id]);

    return (
        <div className="friends">
            {contextHolder}
            <div className="content_friends">
                <div className="friends_content">
                    <div className="friends_title">
                        <h1>{t("friends.title")}</h1>
                        <p>{t("friends.sub_title")}</p>
                    </div>

                    {friendsData.length > 0 && (
                        <div className="friends_gift_card">
                            <p><img src={ball} loading={"lazy"} alt="Ball" />{currentUser.coins}</p>
                            {buttonDisabled ? (
                                <>
                                    {t("exp_shop.btn_active")}
                                    <p>{formatTime(remainingTime)}</p>
                                </>
                            ) : (
                                <button onClick={getClaim}>{t("friends.claim")}</button>
                            )}
                        </div>
                    )}

                    <div className="friends_ref">
                        <div className="friends_ref_title">
                            <div className="friends_ref_title_top">
                                <h1>{t("friends.fiends")} ({friendsData.length})</h1>
                                <img src={reload} loading={"lazy"} alt="Ball" width={60} height={60} />
                            </div>
                            <p>{friendsData.length > 0 ? '' : t("friends.no_fiends")}</p>
                        </div>

                        <div className={`friends_ref_box ${showAll ? "show_all" : ""}`}>
                            {displayedUsers.map(user => (
                                <div key={user.id} className="friends_ref_item">
                                    <img src={user_img} loading={"lazy"} alt="User" />
                                    <div className="friends_ref_item_info">
                                        <h1>{user.values.username}</h1>
                                        <p>
                                            {user.values.status}
                                            <span><img loading={"lazy"} src={ball} alt="" />{formatNumber(parseInt(user.values.coin))}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {!showAll && friendsData.length > 3 && (
                                <button onClick={() => setShowAll(true)} className="show_more_button">
                                    {t("friends.show_all")}
                                </button>
                            )}
                        </div>

                        <div className="ref_link_box">
                            <div className="ref_button" onClick={openShareLink}>{t("friends.share")}</div>
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
