import React, { useEffect, useState } from 'react';
import { Modal } from 'antd'; // Antd modalni import qilamiz
import $API from "../../utils/https.jsx";
import { useParams } from "react-router-dom";
import "./exp_shop.css"
import imgHeader from "../../assets/imgs/perspective_matte-36-128x128.png"
import ball from "../../assets/icons/soccer_ball.png"

const ExpShop = () => {
    const [score, setScore] = useState(0);
    const [tapBonus, setTapBonus] = useState(0);
    const [remainingTime, setRemainingTime] = useState(0); // Taymer uchun state
    const [isModalVisible, setIsModalVisible] = useState(false); // Modal uchun state
    const [selectedItem, setSelectedItem] = useState(null); // Bosilgan exp_item uchun state
    const { user_id } = useParams();
    const [userExpData, setUserExpData] = useState([])
    const getCoinData = async () => {
        try {
            const res = await $API.get(`/users/${user_id}`);
            setScore(res.data.user_data.coins);
            setTapBonus(res.data.user_data.bonus);
            setUserExpData(res.data.experience)
            const startDate = res.data.user_data.start_date ? new Date(res.data.user_data.start_date) : new Date();
            const endDate = res.data.user_data.end_date ? new Date(res.data.user_data.end_date) : new Date("2024-09-27T00:00:00.000Z");

            const timeDifference = endDate.getTime() - Date.now();
            setRemainingTime(timeDifference);
        } catch (e) {
            console.log(e);
            const fallbackEndDate = new Date("2024-09-27T00:00:00.000Z");
            const timeDifference = fallbackEndDate.getTime() - Date.now();
            setRemainingTime(timeDifference);
        }
    };
    console.log()
    const formatNumber = (num) => {
        if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(1) + 'k';
        return num.toString();
    };

    useEffect(() => {
        getCoinData();

        const intervalId = setInterval(() => {
            setRemainingTime(prevTime => {
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

    const expItems = [
        { id: 1, title: 'komunikatsiya', experience: 324, level: 7, coins: 513 },
        { id: 2, title: 'ta\'lim', experience: 540, level: 8, coins: 34234 },
        { id: 3, title: 'texnologiya', experience: 455, level: 6, coins: 23423 }
    ];

    console.log(userExpData);
    return (
        <div className="ExpShop">
            <div className="exp_content">
                <div className="exp_nav_box">
                    <div className="exp_nav">
                        <div className="exp_tap_bonus">
                            <h1>Tap Bonus</h1>
                            <p>+{tapBonus}</p>
                        </div>
                        <div className="exp_exp">
                            <h1>Tajribangiz</h1>
                            <p>{formatNumber(4000000)}</p>
                        </div>
                    </div>
                </div>

                <div className="exp_ball_score">
                    <div className="exp_ball">
                        <img src={ball} alt="" loading={"lazy"} width={25}/>
                        <h1>{score}</h1>
                    </div>
                    <button>Tajriba ortirish</button>
                    <p>{formatTime(remainingTime)}</p> {/* Taymerni ko'rsatish */}
                </div>
                <div className="exp_box">
                    {userExpData.map(item => (
                        <div key={item.id} className="exp_item" onClick={() => showModal(item)}>
                            <div className="exp_item_header">
                                <img src={imgHeader} loading={"lazy"} alt=""/>
                                <p>{item.name}</p>
                            </div>
                            <div className="exp_item_body">
                                soatiga tajriba +{item.hour_coin}
                            </div>
                            <div className="item_footer">
                                <div className="item_footer_exp">{item.degree + 1}-dar</div>
                                <div className="item_footer_coin">
                                    <img src={ball} loading={"lazy"} alt="" width={15}/>
                                    {formatNumber(item.price)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Modal */}
            <Modal title="Tajriba tafsilotlari" className={"exp_modal"} visible={isModalVisible} onOk={handleOk}
                   onCancel={handleCancel}>
                {selectedItem && (
                    <div>
                        <h2>{selectedItem.name}</h2>
                        <p>Tajriba: {selectedItem.price}</p>
                        {/*<p>Daraja: {selectedItem.level}</p>*/}
                        {/*<p>Coinlar: {formatNumber(selectedItem.coins)}</p>*/}
                        <button>OLISH</button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ExpShop;
