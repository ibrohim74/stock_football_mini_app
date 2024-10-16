import React, {useEffect, useState} from 'react';
import "./friends.css";
import gift from "../../assets/icon/freepik-export-20240923164119B0Nu.webp";
import ball from "../../assets/icons/soccer_ball.png";
import user_img from "../../assets/icon/xsxxa.webp";
import friendsIcon from "../../assets/icon/omixta.webp";
import {CopyOutlined} from "@ant-design/icons";
import {message} from "antd";
import AppBar from "../../component/App_bar/app_bar.jsx";
import {useTranslation} from "react-i18next";
import {$API} from "../../utils/https.jsx";
import {useParams} from "react-router-dom";
import LoaderFootball from "../../component/loader/loader_football.jsx";
import Odometer from "react-odometerjs";
import {jwtDecode} from "jwt-decode"; // LoaderFootball import qilish

const Friends = () => {
    const [showAll, setShowAll] = useState(false);
    const [friendsData, setFriendsData] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [remainingTime, setRemainingTime] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(true); // Loading holatini qo'shish
    const [hoursBonusCoin, setHoursBonusCoin] = useState(null);
    const {t} = useTranslation();
    const [messageApi, contextHolder] = message.useMessage();
    const {user_id} = useParams();

    const displayedUsers = showAll && friendsData.length > 3 ? friendsData : friendsData.slice(0, 3);

    const getUserData = async () => {
        setLoading(true); // Yuklanish boshlandi
        try {
            const res = await $API.get(`/users/friends/` , null , {params:{user_id}});
            console.log(res);
            setFriendsData(res.data.friends);
            setCurrentUser(res.data.user);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false); // Yuklanish tugadi
        }
    };

    const getClaim = async () => {
        try {
            const res = await $API.post(`/referrals/activate/${user_id}`);
            console.log(res);
            setHoursBonusCoin(res.data.coin);
            if (res.status === 200) {
                await getUserData(); // Foydalanuvchi ma'lumotlarini yuklash
            }

            const startTime = new Date(res.data.start_time).getTime(); // Start time ni vaqtga aylantirish
            const endTime = new Date(res.data.end_time).getTime(); // End time ni vaqtga aylantirish

            // Vaqtni localStorage ga saqlash
            localStorage.setItem('friendsStartTime', startTime.toString());
            localStorage.setItem('friendsEndTime', endTime.toString());

            // Qolgan vaqtni hisoblash
            const currentTime = Date.now(); // Hozirgi vaqt
            const remaining = endTime - currentTime; // Qolgan vaqtni hisoblash
            setRemainingTime(remaining);

            // Tugma ni o'chirish
            setButtonDisabled(true);

            setTimeout(() => {
                setHoursBonusCoin(null);
            }, 3000);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false); // Yuklanish tugadi
        }
    };

    useEffect(() => {
        const savedEndTime = localStorage.getItem('friendsEndTime');

        if (savedEndTime) {
            const currentTime = Date.now();
            let remaining = parseInt(savedEndTime) - currentTime; // ISO formatdan o'qish

            if (remaining > 0) {
                setRemainingTime(remaining);
                setButtonDisabled(true);

                const timerId = setInterval(() => {
                    remaining = parseInt(savedEndTime) - Date.now(); // Har bir sekundda yangilanadi

                    if (remaining <= 0) {
                        clearInterval(timerId);
                        setButtonDisabled(false);
                        localStorage.removeItem('friendsStartTime');
                        localStorage.removeItem('friendsEndTime');
                        getUserData();
                    } else {
                        setRemainingTime(remaining); // Qolgan vaqtni yangilash
                    }
                }, 1000);

                // O'chirish uchun to'plamni ochirish
                return () => clearInterval(timerId);
            } else {
                // Agar vaqt tugagan bo'lsa
                setButtonDisabled(false);
                localStorage.removeItem('friendsStartTime');
                localStorage.removeItem('friendsEndTime');
                getUserData();
            }
        }
    }, [friendsData]);


    const copyToClipboard = () => {
        navigator.clipboard.writeText(`https://t.me/snkrsshoopbot?start=${user_id}`).then(() => {
            messageApi.success(t("copy"));
        }).catch(err => {
            console.error("Nusxa olishda xato:", err);
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

    // Qolgan vaqtni formatlash funksiyasi
    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
    };

    useEffect(() => {
        getUserData();

        const intervalId = setInterval(() => {
            setRemainingTime((prevTime) => {
                if (prevTime <= 1000) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prevTime - 1000;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);


    return (
        <div className="friends">
            {contextHolder}
            <div className="content_friends">
                <div className="friends_content">
                    <div className="friends_title">
                        <div className="friends_title_icon">
                            <img src={friendsIcon} alt=""/>
                        </div>
                        <h1>{t("friends.title")}</h1>
                    </div>

                    {loading ? (
                        <LoaderFootball/>
                    ) : (
                        <>

                            <div className="friends_gift_card">
                                <p><img src={ball} loading={"lazy"} alt="Ball"/>
                                    <Odometer value={currentUser.coins} format="( ddd),dd"/>
                                </p>
                                {buttonDisabled ? (
                                    <>
                                        {t("friends.claim_active")}
                                        <p>{formatTime(remainingTime)}</p> {/* Qolgan vaqtni ko'rsatish */}
                                    </>
                                ) : (<>
                                        {friendsData.length > 0 ? <button onClick={getClaim}>{t("friends.claim")}</button>
                                            :
                                            <button style={{color:"white"}}>{t("friends.claim")}</button>
                                        }

                                    </>
                                )}
                            </div>

                            <div className="friends_ref">
                                <div className="friends_ref_title">
                                    <div className="friends_ref_title_top">
                                        <h1>({friendsData.length}) {t("friends.fiends")} </h1>
                                    </div>
                                    <p className={"no_friends"}>{friendsData.length > 0 ? '' : t("friends.no_friends")}</p>
                                </div>

                                <div className={`friends_ref_box ${showAll ? "show_all" : ""}`}>
                                    {displayedUsers.map(user => (
                                        <div key={user.id} className="friends_ref_item">
                                            <div className="friends_ref_item_left">
                                                <img src={user_img} loading={"lazy"} alt="User"/>
                                                <h1>{user.username}</h1>
                                            </div>

                                            <div className="friends_ref_item_info">
                                                <p>{user.status} </p>
                                                <span><img loading={"lazy"} src={ball}
                                                           alt=""/>{formatNumber(parseInt(user.coins))}</span>

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
                                        <CopyOutlined/>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Friends;
