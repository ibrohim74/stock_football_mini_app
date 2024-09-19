import React, { useState, useEffect } from 'react';
import "./homePage.css";
import ball from "../../assets/icons/soccer_ball.png";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import {Link, useParams} from "react-router-dom";
import {INDEX, SETTINGS, TAP} from "../../utils/const.jsx";
import BackTab from "../../component/backTab/BackTab.jsx";

const MAX_ENERGY = 200;

const HomePageTap = () => {
    const [score, setScore] = useState(665);
    const [dailyBonus, setDailyBonus] = useState(0);
    const [animations, setAnimations] = useState([]);
    const [touchCount, setTouchCount] = useState(0);
    const [energy, setEnergy] = useState(MAX_ENERGY);
    const [ballPressed, setBallPressed] = useState(false); // Yangi state - animatsiya uchun
    const {user_id} = useParams();
    const handleTouchStart = (event) => {
        const touchLength = event.touches.length;

        // Agar energiya tugagan bo'lsa, bosishni taqiqlash
        if (energy <= 0) return;

        // Qolgan energiya asosida nechta barmoq ruxsat etilishini hisoblang
        const allowedTouches = Math.min(touchLength, energy);
        setTouchCount(allowedTouches);

        const rect = event.currentTarget.getBoundingClientRect();

        // Har bir barmoq uchun animatsiyalar yarating
        const newAnimations = Array.from({ length: allowedTouches }).map((_, index) => {
            const touch = event.touches[index];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;

            return {
                id: Date.now() + index,
                x: x,
                y: y,
            };
        });

        setAnimations(prev => [...prev, ...newAnimations]);
        setBallPressed(true); // Ball bosilganda animatsiya boshlansin

        // Animatsiyalarni 0.5 sekunddan so'ng olib tashlang
        setTimeout(() => {
            setAnimations(prev => prev.filter(animation => !newAnimations.find(newAnim => newAnim.id === animation.id)));
            setBallPressed(false); // Animatsiya tugadi
        }, 500);
    };

    const handleTouchEnd = async () => {
        // Ballarni qo'shish va energiyani kamaytirish
        await setScore(prevScore => prevScore + touchCount);
        await setEnergy(prevEnergy => Math.max(0, prevEnergy - touchCount)); // Energiyani kamaytirish
        await setTouchCount(0);
    };

    useEffect(() => {
        // Har 3 soniyada energiya regeneratsiyasi
        const intervalId = setInterval(() => {
            setEnergy(prevEnergy => Math.min(MAX_ENERGY, prevEnergy + 1)); // Har 3 soniyada 1 energiya qo'shiladi
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="home-page">
            <div className="home-page_user_settings">
                <div className="home-page_user">
                    <BackTab back_url={`${INDEX}${user_id}`} />
                    <span className={"home-page_user_icon"}><UserOutlined /></span>
                    Xasanov Ibroxim
                </div>
                <Link to={`${TAP}${user_id}/${SETTINGS}`} className="home-page_settings"><SettingOutlined /></Link>
            </div>
            <div className="ball-content">
                <div className="ball-score-container">
                    <div className="ball-score">
                        <p>Ballaringiz</p>
                        <h1>{score}</h1>
                    </div>
                    <div className="ball-score">
                        <p>Bugungi sovolar</p>
                        <h1>{dailyBonus}/20</h1>
                    </div>
                </div>
                <div className="tap_ball"
                     onTouchStart={handleTouchStart}
                     onTouchEnd={handleTouchEnd}
                     onContextMenu={(e) => e.preventDefault()} // O'ng bosishni bloklash
                     style={{ position: "relative", overflow: "hidden" }} // Koptokdan tashqariga chiqmaslik uchun
                >
                    <img src={ball}
                         alt="ball"
                         className={`ball-image ${ballPressed ? 'pressed' : ''}`} // Animatsiya qo'shildi
                         draggable="false"
                         onContextMenu={(e) => e.preventDefault()} // O'ng bosishni bloklash
                    />
                    {animations.map(animation => (
                        <div
                            key={animation.id}
                            className="ball-animation"
                            style={{ left: `${animation.x}px`, top: `${animation.y}px` }} // Animatsiya barmoq bosilgan joyda boshlansin
                        >
                            <div className="small-ball"></div> {/* Kichik koptok */}
                        </div>
                    ))}
                </div>
                <div className="tap_ball_energy">{energy}/{MAX_ENERGY}</div> {/* Energiyani ko'rsatish */}
            </div>
        </div>
    );
}

export default HomePageTap;
