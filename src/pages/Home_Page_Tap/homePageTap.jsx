import React, { useState, useEffect, useRef } from 'react';
import "./homePage.css";
import ball from "../../assets/icons/soccer_ball.png";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { INDEX, SETTINGS, TAP } from "../../utils/const.jsx";
import BackTab from "../../component/backTab/BackTab.jsx";
import volteg from "../../assets/icons/high-voltage.png";
import $API from "../../utils/https.jsx";

const HomePageTap = () => {
    const [score, setScore] = useState(0);
    const [dailyBonus, setDailyBonus] = useState(0);
    const [animations, setAnimations] = useState([]);
    const [touchCount, setTouchCount] = useState(0);
    const [energy, setEnergy] = useState(0); // Energiyani 0 ga boshlaymiz
    const [maxEnergy, setMaxEnergy] = useState(200); // Maksimal energiyani boshqarish uchun
    const [ballPressed, setBallPressed] = useState(false);
    const [username, setUsername] = useState('');
    const { user_id } = useParams();
    const timerRef = useRef(null); // Timer debouncing uchun

    // Fetch user data from API
    const getCoinData = async () => {
        try {
            const res = await $API.get(`http://84.247.160.205/users/${user_id}`);
            console.log(res);
            setScore(res.data.detail.coins);
            setDailyBonus(res.data.detail.bonus);
            setEnergy(res.data.detail.energy); // Serverdan olgan energiya
            setMaxEnergy(res.data.detail.max_energy); // Serverdan olgan maksimal energiya
            setUsername(res.data.detail.username);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getCoinData(); // Component yuklanishi bilan ma'lumotlarni olish
    }, [user_id]);

    // Serverga PUT yoki PATCH so'rovini yuborish funksiyasi
    const updateServer = async (newScore, newEnergy) => {
        try {
            const res = await $API.patch(`http://84.247.160.205/users/${user_id}`, {
                coins: newScore,
                energy: newEnergy
            });
            console.log(res);

            // PATCH muvaffaqiyatli bo‘lgandan so'ng yana ma'lumotlarni olib kelish
            getCoinData();
        } catch (e) {
            console.log(e);
        }
    };

    // Debouncing orqali serverga so'rov yuborish uchun
    const debounceUpdate = (newScore, newEnergy) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current); // Avvalgi timer to'xtatiladi
        }
        timerRef.current = setTimeout(() => {
            console.log(newScore , newEnergy)
            updateServer(newScore, newEnergy);
        }, 1000); // 1 sekund davomida tap qilinmasa, serverga update boradi
    };

    // Handle tapping the ball
    const handleStart = (event) => {
        const touches = event.touches || [{ clientX: event.clientX, clientY: event.clientY }];
        const touchLength = touches.length;

        if (energy <= 0) return;

        const allowedTouches = Math.min(touchLength, energy);
        setTouchCount(allowedTouches);

        const rect = event.currentTarget.getBoundingClientRect();

        const newAnimations = Array.from({ length: allowedTouches }).map((_, index) => {
            const touch = touches[index];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;

            return {
                id: Date.now() + index,
                x: x,
                y: y,
            };
        });

        setAnimations(prev => [...prev, ...newAnimations]);
        setBallPressed(true);

        setTimeout(() => {
            setAnimations(prev => prev.filter(animation => !newAnimations.find(newAnim => newAnim.id === animation.id)));
            setBallPressed(false);
        }, 500);
    };

    // Handle end of tapping
    const handleEnd = () => {
        const newScore = score + touchCount;
        const newEnergy = Math.max(0, energy - touchCount);
        setScore(newScore);
        setEnergy(newEnergy);
        setTouchCount(0);
        debounceUpdate(newScore, newEnergy);
    };

    // Energy regeneration every 3 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            setEnergy(prevEnergy => Math.min(maxEnergy, prevEnergy + 1)); // Energiyani maksimal limitga yetguncha oshirish
        }, 3000);

        return () => clearInterval(intervalId);
    }, [maxEnergy]);

    return (
        <div className="home-page">
            <div className="home-page_user_settings">
                <BackTab back_url={`${INDEX}${user_id}`} />
                <div className="home-page_user">
                    {username}
                    <span className="home-page_user_icon"><UserOutlined/></span>
                </div>
            </div>
            <div className="ball-content">
                <div className="ball-score-container">
                    <div className="ball-score">
                        <p>Ballaringiz</p>
                        <h1>{score}</h1>
                    </div>
                    <div className="ball-score">
                        <p>Bugungi sovg'alar</p>
                        <h1>{dailyBonus}/20</h1>
                    </div>
                </div>
                <div className="tap_ball"
                     onTouchStart={handleStart}
                     onTouchEnd={handleEnd}
                     onMouseDown={handleStart}
                     onMouseUp={handleEnd}
                     onContextMenu={(e) => e.preventDefault()}
                     style={{ position: "relative", overflow: "hidden" }}
                >
                    <img src={ball}
                         alt="ball"
                         className={`ball-image ${ballPressed ? 'pressed' : ''}`}
                         draggable="false"
                         onContextMenu={(e) => e.preventDefault()}
                    />
                    {animations.map(animation => (
                        <div
                            key={animation.id}
                            className="ball-animation"
                            style={{ left: `${animation.x}px`, top: `${animation.y}px` }}
                        >
                            <div className="small-ball"></div>
                        </div>
                    ))}
                </div>
                <div className="tap_ball_energy">
                    <div className="energy_info">
                        <img src={volteg} alt="volteg" />
                        <p>{energy}/{maxEnergy}</p> {/* Dynamic energy and maxEnergy */}
                    </div>
                    <div className="energy_line">
                        <span style={{ width: `${(energy / maxEnergy) * 100}%` }}></span> {/* Progress bar */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePageTap;
