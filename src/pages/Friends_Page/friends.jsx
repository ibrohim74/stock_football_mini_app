import React, { useEffect, useState } from "react";
import "./friends.css";
import gift from "../../assets/icon/freepik-export-20240923164119B0Nu.webp";
import ball from "../../assets/icons/soccer_ball.png";
import user_img from "../../assets/icon/xsxxa.webp";
import friendsIcon from "../../assets/icon/omixta.webp";
import { CopyOutlined } from "@ant-design/icons";
import { message } from "antd";
import AppBar from "../../component/App_bar/app_bar.jsx";
import { useTranslation } from "react-i18next";
import { $API } from "../../utils/https.jsx";
import { useParams } from "react-router-dom";
import LoaderFootball from "../../component/loader/loader_football.jsx";
import Odometer from "react-odometerjs";

const Friends = () => {
    const [showAll, setShowAll] = useState(false);
    const [friendsData, setFriendsData] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [remainingTime, setRemainingTime] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [hoursBonusCoin, setHoursBonusCoin] = useState(null);
    const [claimAvailable, setClaimAvailable] = useState(false);
    const { t } = useTranslation();
    const [messageApi, contextHolder] = message.useMessage();
    const { user_id } = useParams();
    const [resTime, setResTime] = useState({});
    const displayedUsers = showAll && friendsData.length > 3 ? friendsData : friendsData.slice(0, 3);

    const getUserData = async () => {
        setLoading(true);
        try {
            const res = await $API.get(`/users/friends/`);
            setFriendsData(res.data.friends);
            setCurrentUser(res.data.user_data);
            setHoursBonusCoin(res.data.user_data.hour_coin);
            setResTime(res.data.date);
            console.log(res)
            if (res.data.date?.start_time && res.data.date?.end_time) {
                const startTime = new Date(res.data.date.start_time).getTime();
                const endTime = new Date(res.data.date.end_time).getTime();
                const currentTime = Date.now();
                const remaining = endTime - currentTime;
                setClaimAvailable(true);
                setRemainingTime(remaining);
                setButtonDisabled(remaining > 0);
            } else {
                setButtonDisabled(false);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const getClaim = async () => {
        try {
            const res = await $API.post(`/referrals/activate/`);
            if (res.status === 200) {
                await getUserData();
            }
            const startTime = new Date(res.data.start_time).getTime();
            const endTime = new Date(res.data.end_time).getTime();
            localStorage.setItem("friendsStartTime", startTime.toString());
            localStorage.setItem("friendsEndTime", endTime.toString());

            const currentTime = Date.now();
            const remaining = endTime - currentTime;
            setRemainingTime(remaining);
            setButtonDisabled(true);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const getClaimEnd = async () => {
        try {
            const res = await $API.post(`referrals/claim/`);
            console.log(res)
            setButtonDisabled(false);
            setClaimAvailable(false);
            localStorage.removeItem("friendsStartTime");
            localStorage.removeItem("friendsEndTime");
            setTimeout(() => {
                setHoursBonusCoin(null);
            }, 3000);
            getUserData();
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (remainingTime > 0) {
            const intervalId = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime <= 1000) {
                        clearInterval(intervalId);
                        setButtonDisabled(false);
                        setClaimAvailable(true);
                        return 0;
                    }
                    return prevTime - 1000;
                });
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [remainingTime]);

    useEffect(() => {
        getUserData();
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(`https://t.me/Stockfootball_bot?start=${user_id}`)
            .then(() => {
                messageApi.success(t("copy"));
            })
            .catch((err) => {
                console.error("Error copying to clipboard:", err);
            });
    };

    const openShareLink = () => {
        window.open(`https://t.me/share/url?url=https://t.me/Stockfootball_bot?start=${user_id}`, "_blank");
    };

    const formatNumber = (num) => {
        if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
        if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
        if (num >= 1e3) return (num / 1e3).toFixed(1) + "k";
        return num.toString();
    };

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;
    };

    return (
        <div className="friends">
            {contextHolder}
            <AppBar />
            <div className="content_friends">
                <div className="friends_content">
                    <div className="friends_title">
                        <div className="friends_title_icon">
                            <img src={friendsIcon} alt="" />
                        </div>
                        <h1>{t("friends.title")}</h1>
                    </div>
                    {loading ? (
                        <LoaderFootball />
                    ) : (
                        <>
                            <div className="friends_gift_card">
                                <p>
                                    <img src={ball} loading={"lazy"} alt="Ball" />
                                    <Odometer value={hoursBonusCoin} format="( ddd),dd" />
                                </p>
                                {buttonDisabled ? (
                                    <>
                                        {t("friends.claim_active")}
                                        <p>{formatTime(remainingTime)}</p>
                                    </>
                                ) : claimAvailable ? (
                                    <button onClick={getClaimEnd}>{t("friends.claim")}</button>
                                ) : (
                                    <>
                                        {friendsData.length > 0 && (
                                            <button onClick={getClaim} style={{ color: "white" }}>
                                                {t("friends.activate")}
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                            <div className="friends_ref">
                                <div className="friends_ref_title">
                                    <div className="friends_ref_title_top">
                                        <h1>
                                            ({friendsData.length}) {t("friends.fiends")}
                                        </h1>
                                    </div>
                                    <p className={"no_friends"}>{friendsData.length > 0 ? "" : t("friends.no_friends")}</p>
                                </div>
                                <div className={`friends_ref_box ${showAll ? "show_all" : ""}`}>
                                    {displayedUsers.map((user, index) => (
                                        <div key={index} className="friends_ref_item">
                                            <div className="friends_ref_item_left">
                                                <img src={user_img} loading={"lazy"} alt="User" />
                                                <h1>{user.username}</h1>
                                            </div>
                                            <div className="friends_ref_item_info">
                                                <p>{user.status} </p>
                                                <span>
                                                    <img loading={"lazy"} src={ball} alt="" />
                                                    {formatNumber(parseInt(user.coins))}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    {!showAll && friendsData.length > 3 && (
                                        <button className={"show_more_button"} onClick={() => setShowAll(true)}>
                                            {t("friends.show_all")}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="ref_link_box">
                                <div className="ref_button" onClick={openShareLink}>
                                    {t("friends.share")}
                                </div>
                                <div className="ref_link" onClick={copyToClipboard}>
                                    <CopyOutlined />
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
