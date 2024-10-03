import React, { useEffect, useState } from 'react';
import { Modal } from 'antd'; // Antd modalni import qilamiz
import $API from "../../utils/https.jsx";
import { useParams } from "react-router-dom";
import "./exp_shop.css";
import imgHeader from "../../assets/imgs/perspective_matte-36-128x128.png";
import ball from "../../assets/icons/soccer_ball.png";
import Odometer from 'react-odometerjs';
import "../../assets/odometer.css"
import {useTranslation} from "react-i18next";

const ExpShop = () => {
    const [score, setScore] = useState(0);
    const [tapBonus, setTapBonus] = useState(0);
    const [hour_coin, setHour_coin] = useState(null);
    const [remainingTime, setRemainingTime] = useState(0); // Timer for display
    const [isModalVisible, setIsModalVisible] = useState(false); // Modal for details
    const [selectedItem, setSelectedItem] = useState(null); // Selected exp_item state
    const [buttonDisabled, setButtonDisabled] = useState(false); // Button disable state
    const { user_id } = useParams();
    const [userExpData, setUserExpData] = useState([]);
    const [hoursBonusCoin, setHoursBonusCoin] = useState(null);
    const {t} = useTranslation()
    const getCoinData = async () => {
        try {
            const res = await $API.get(`/users/${user_id}`);
            setScore(res.data.user_data.coins);
            setTapBonus(res.data.user_data.bonus);
            setUserExpData(res.data.experience);
            setHour_coin(res.data.hour_coin);
            console.log(res)
        } catch (e) {
            console.log(e);
        }
    };

    const formatNumber = (num) => {
        if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(1) + 'k';
        return num.toString();
    };

    const buyExp = async () => {
        try {
            const res = await $API.post(`/experience/sale/${selectedItem.id}`, null, {
                params: {
                    user_id: selectedItem.user_id,
                },
            });
            setIsModalVisible(false)
            getCoinData();
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getCoinData();

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

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
    };

    // Modalni ochish funksiyasi
    const showModal = (item) => {
        setSelectedItem(item); // Bosilgan elementni saqlash
        setIsModalVisible(true); // Modalni ochish
    };

    // Modalni yopish funksiyasi
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const postExpHours = async () => {
        // const threeHoursInMs = 3*60*60*1000;
        const threeHoursInMs = 3000;
        const startTime = Date.now();
        const endTime = startTime + threeHoursInMs;

        // Vaqtni localStorage ga saqlash
        localStorage.setItem('expStartTime', startTime.toString());
        localStorage.setItem('expEndTime', endTime.toString());

        // Qolgan vaqtni hisoblash
        setRemainingTime(endTime - Date.now());
        setButtonDisabled(true);

        const timerId = setInterval(() => {
            const savedEndTime = parseInt(localStorage.getItem('expEndTime'), 10);
            const currentTime = Date.now();
            const timeLeft = savedEndTime - currentTime;

            if (timeLeft <= 1000) {
                clearInterval(timerId);
                setButtonDisabled(false);
                localStorage.removeItem('expStartTime');
                localStorage.removeItem('expEndTime');

                return;
            }

            setRemainingTime(timeLeft);
        }, 1000);
        try {
            const res = await $API.post(`/experience/${user_id}`, null, {
                params: {
                    activate: true,
                },
            });
            console.log(res)
            setHoursBonusCoin(res.data.response.coin)
            getCoinData();
            setInterval(()=>{
                setHoursBonusCoin(null)
            },10000)

        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        const savedEndTime = localStorage.getItem('expEndTime');

        if (savedEndTime) {
            const currentTime = Date.now();
            const remaining = parseInt(savedEndTime, 10) - currentTime;

            if (remaining > 0) {
                setRemainingTime(remaining);
                setButtonDisabled(true);
                const timerId = setInterval(() => {
                    const updatedRemaining = parseInt(savedEndTime, 10) - Date.now();
                    if (updatedRemaining <= 1000) {
                        clearInterval(timerId);
                        setButtonDisabled(false);
                        localStorage.removeItem('expStartTime');
                        localStorage.removeItem('expEndTime');
                        getCoinData(); // Yangilangan ma'lumotlarni olish
                        return;
                    }
                    setRemainingTime(updatedRemaining);
                }, 1000);
            }
        }
    }, []);
    return (
        <div className="ExpShop">
            <div className="exp_content">
                <div className="exp_nav_box">
                    <div className="exp_nav">
                        <div className="exp_tap_bonus">
                            <h1>{t("homePageTap.tap_bonus")}</h1>
                            <p>+{tapBonus}</p>
                        </div>
                        <div className="exp_exp">
                            <h1>{t("homePageTap.tajriba")}</h1>
                            <p>{hour_coin ? formatNumber(hour_coin) : 0}</p>
                        </div>
                    </div>
                </div>

                <div className="exp_ball_score">
                    <div className="exp_ball">
                        <img src={ball} alt="" loading={"lazy"} width={25} />
                        <h1><Odometer value={score} format="(.ddd),dd" /></h1>
                        {hoursBonusCoin ? <p>+{formatNumber(hoursBonusCoin)}</p> : ""}
                    </div>
                    <button onClick={postExpHours} disabled={buttonDisabled}>
                        {buttonDisabled ? <>{t("exp_shop.btn_active")}</> : <>{t("exp_shop.btn_disbl")}</>}
                    </button>
                    <p>{formatTime(remainingTime)}</p> {/* Taymerni ko'rsatish */}
                </div>
                <div className="exp_box">
                    {userExpData.map((item) => (
                        <div key={item.id} className="exp_item" onClick={() => showModal(item)}>
                            <div className="exp_item_header">
                                <img src={item.photo} loading={"lazy"} alt="" />

                            </div>
                            <div className="exp_item_body">
                                <p>{item.name}</p>
                               <p style={{fontSize:14}}>soatiga tajriba + {formatNumber(item.hour_coin)}</p>
                            </div>
                            <div className="item_footer">
                                <div className="item_footer_exp">{item.degree}-dar</div>
                                <div className="item_footer_coin">
                                    <img src={ball} loading={"lazy"} alt="" width={15} />
                                    {formatNumber(item.price)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <Modal title="Tajriba tafsilotlari" className={"exp_modal"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                {selectedItem && (
                    <div className="exp_modal_box">
                        <div className="exp_modal_header">
                            <img src={selectedItem.photo} alt="asdasd" />
                        </div>
                        <h2>{selectedItem.name}</h2>
                        <p className={"exp_modal_box_desc"}>{selectedItem.description}</p>
                        <p>soatiga tajriba: {selectedItem.price}</p>
                        <p>Daraja: {selectedItem.degree}</p>
                        <p>Coinlar: {formatNumber(selectedItem.price)}</p>

                        {score > selectedItem.price ? (
                            <div className="exp_modal_footer">
                                <button onClick={buyExp} className={"exp_modal_btn_buy"}>OLISH</button>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ExpShop;
