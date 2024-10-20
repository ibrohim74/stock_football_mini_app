import React, { useEffect, useState } from 'react';
import {message, Modal, Skeleton} from 'antd';
import {$API} from "../../utils/https.jsx";
import { useParams } from "react-router-dom";
import "./exp_shop.css";
import imgHeader from "../../assets/imgs/perspective_matte-36-128x128.png";
import ball from "../../assets/icons/soccer_ball.png";
import Odometer from 'react-odometerjs';
import "../../assets/odometer.css";
import { useTranslation } from "react-i18next";
import BackTab from "../../component/backTab/BackTab.jsx";
import naushnik from "../../assets/gift/naushnik.png";
import airpods from "../../assets/gift/airpods.png";
import futbolka from "../../assets/gift/futbolka.png";
import koptok from "../../assets/gift/koptok.png";
import velosiped from "../../assets/gift/velosiped.png";
import iphone from "../../assets/gift/iphone.png";
import powerbank from "../../assets/gift/powebank.png";
import televizor from "../../assets/gift/televizor.png";
import ps5 from "../../assets/gift/ps5.png";
import samakat from "../../assets/gift/samakat.png";
import sigway from "../../assets/gift/sigway.png";

const ExpShop = () => {
    const [score, setScore] = useState(0);
    const [tapBonus, setTapBonus] = useState(0);
    const [hour_coin, setHour_coin] = useState(null);
    const [remainingTime, setRemainingTime] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const { user_id, language } = useParams();
    const [userExpData, setUserExpData] = useState([]);
    const [hoursBonusCoin, setHoursBonusCoin] = useState(0);
    const [buyBtnDis, setBuyBtnDis] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const { t } = useTranslation();
    const items = [ naushnik, airpods, futbolka, koptok, velosiped, iphone, powerbank , televizor, ps5 , samakat, sigway];

    const getCoinData = async () => {
        try {
            const res = await $API.get(`users/experience/${user_id}`);
            setScore(res.data.user.coins);
            setTapBonus(res.data.user.bonus);
            setUserExpData(res.data.experience);
            setHour_coin(res.data.user.hour_coin);
        } catch (e) {
            // messageApi.error(t("exp_shop.status.error"));
        }
    };

    const formatNumber = (num) => {
        if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(1) + 'k';
        return num.toString();
    };

    const buyExp = async () => {
        setBuyBtnDis(true);
        try {
            const res = await $API.post(`/experience/sale/${selectedItem.id}`, null, {
                params: {
                    user_id: selectedItem.user_id,
                },
            });
            setBuyBtnDis(false);
            setIsModalVisible(false);
            getCoinData();
            messageApi.success(t("exp_shop.status.tajriba_oshdi"));
        } catch (e) {
            setBuyBtnDis(false);
            setIsModalVisible(false);
            messageApi.error(t("exp_shop.status.error"));
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

    const showModal = (item) => {
        setSelectedItem(item);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const postExpHours = async () => {

        setButtonDisabled(true);
        try {
            const res = await $API.post(`/experience/${user_id}`, null, {
                params: {
                    activate: true,
                },
            });
            console.log(res)

            const startTime = new Date(res.data.start_time).getTime();
            const endTime = new Date(res.data.end_time).getTime();

            localStorage.setItem('expStartTime', startTime.toString());
            localStorage.setItem('expEndTime', endTime.toString());


            const currentTime = Date.now();
            const remaining = endTime - currentTime;


            setRemainingTime(remaining > 0 ? remaining : 0);


            const timerId = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime <= 1000) {
                        clearInterval(timerId);
                        setButtonDisabled(false);
                        localStorage.removeItem('expStartTime');
                        localStorage.removeItem('expEndTime');
                        getCoinData();
                        return 0;
                    }
                    return prevTime - 1000;
                });
            }, 1000);


            return () => clearInterval(timerId);
        } catch (e) {
            console.log(e);
            messageApi.error(t("exp_shop.status.error"));
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
                        getCoinData();
                        return;
                    }
                    setRemainingTime(updatedRemaining);
                }, 1000);
            }
        }
    }, []);
    return (
        <div className="ExpShop">
            {contextHolder}
            <div className="exp_content">
                <BackTab back_url={`/${user_id}/${language}`} style={{
                    width: "7%"
                }}/>


                <div className="exp_nav_box">
                    <div className="exp_nav">
                        <div className="exp_tap_bonus" >
                            <h1>{t("homePageTap.tap_bonus")}</h1>
                            {/*<p>+{tapBonus}</p>*/}
                        </div>
                        <div className="exp_exp">
                            <h1>{t("homePageTap.tajriba")}</h1>
                            {/*<p>{hour_coin ? formatNumber(hour_coin) : 0}</p>*/}
                        </div>
                    </div>
                </div>

                <div className="exp_ball_score">
                    {/*<div className="exp_ball">*/}
                    {/*    <img src={ball} alt="" loading={"lazy"} width={25}/>*/}
                    {/*    <h1><Odometer value={score} format="( ddd),dd"/></h1>*/}
                    {/*    {hoursBonusCoin ? <p>+{formatNumber(hoursBonusCoin)}</p> : ""}*/}
                    {/*</div>*/}
                    {/*<button style={{color:"white"}} onClick={postExpHours} disabled={buttonDisabled}>*/}
                    {/*    {buttonDisabled ? <>{t("exp_shop.btn_active")}</> : <>{t("exp_shop.btn_disbl")}</>}*/}
                    {/*</button>*/}
                    {/*<p>{formatTime(remainingTime)}</p>*/}
                </div>


                <h1  className={"prev"} style={{textAlign:"center"}} >{t("gift.h1")}</h1>
                <div className="exp_box">
                    {/*{Array.isArray(userExpData) && userExpData.map((item) => (*/}
                    {/*    <div key={item.id} className="exp_item" onClick={() => showModal(item)}>*/}
                    {/*        <div className="exp_item_header">*/}
                    {/*            <img src={item?.photo} loading={"lazy"} alt=""/>*/}
                    {/*        </div>*/}
                    {/*        <div className="exp_item_body">*/}
                    {/*            <p>{item.name}</p>*/}
                    {/*            <p style={{ fontSize: 14 }}>{t('exp_shop.hour_tajriba')} + {formatNumber(item.hour_coin)}</p>*/}
                    {/*        </div>*/}
                    {/*        <div className="item_footer">*/}
                    {/*            <div className="item_footer_exp">{item.degree}-{t("exp_shop.daraja_short")}</div>*/}
                    {/*            <div className="item_footer_coin">*/}
                    {/*                <img src={ball} loading={"lazy"} alt="" width={15}/>*/}
                    {/*                {formatNumber(item.price)}*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*))}*/}

                </div>
            </div>

            <Modal className={"exp_modal"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                {selectedItem && (
                    <div className="exp_modal_box">
                        <div className="exp_modal_header">
                            <img src={selectedItem.photo} alt="asdasd"/>
                        </div>
                        <h2>{selectedItem.name}</h2>
                        <p className={"exp_modal_box_desc"}>{selectedItem.description}</p>
                        <p>{t('exp_shop.hour_tajriba')} : {selectedItem.next_coin}</p>
                        <p>{t('exp_shop.daraja')} : {selectedItem.degree}</p>
                        <p>{t('exp_shop.price')} : {formatNumber(selectedItem.price)}</p>

                        {score > selectedItem.price ? (
                            <div className="exp_modal_footer">
                                <button onClick={buyExp} className={"exp_modal_btn_buy"}
                                        disabled={buttonDisabled}>{t('exp_shop.buy')}</button>
                            </div>
                        ) : (
                            <div className="exp_modal_footer">
                                <button className={"exp_modal_btn_buy disabled"}
                                        disabled={true}>
                                    {t("exp_shop.dis_buy")}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </Modal>

        </div>
    );
};

export default ExpShop;
