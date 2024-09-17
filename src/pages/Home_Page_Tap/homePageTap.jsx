import React, { useState, useCallback } from 'react';
import "./homePage.css";
import ball from "../../assets/icons/soccer_ball.png";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { INDEX, SETTINGS } from "../../utils/const.jsx";
import BackTab from "../../component/backTab/BackTab.jsx";

const HomePageTap = () => {
    const [score, setScore] = useState(665);
    const [dailyBonus, setDailyBonus] = useState(0);
    const [animations, setAnimations] = useState([]);
    const [touchCount, setTouchCount] = useState(0); // Bosilgan barmoqlar sonini saqlash uchun state

    const handleTouchStart = (event) => {
        const touchLength = event.touches.length; // Nechta barmoq bilan bosilganini olish
        setTouchCount(touchLength); // Touch countni saqlash

        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.touches[0].clientX - rect.left;
        const y = event.touches[0].clientY - rect.top;

        // Animatsiyani yaratish uchun barmoq pozitsiyalarini saqlab qo'yish
        const newAnimations = Array.from({ length: touchLength }).map((_, index) => ({
            id: Date.now() + index,
            x: x + Math.random() * 10 - 5,
            y: y + Math.random() * 10 - 5,
            value: touchLength
        }));

        setAnimations(prev => [...prev, ...newAnimations]);

        setTimeout(() => {
            setAnimations(prev => prev.filter(animation => !newAnimations.find(newAnim => newAnim.id === animation.id)));
        }, 500);
    };

    const handleTouchEnd = () => {
        // Bosim tugagandan so'ng ballarni qo'shish
        setScore(prevScore => prevScore + touchCount); // Barmoq soniga qarab ballarni qo'shish
        setTouchCount(0); // Barmoq sonini nolga tushirish
    };

    return (
        <div className="home-page">
            <BackTab back_url={INDEX} />
            <div className="home-page_user_settings">
                <div className="home-page_user">
                    <span className={"home-page_user_icon"}><UserOutlined /></span>
                    Xasanov Ibroxim
                </div>
                <Link to={SETTINGS} className="home-page_settings"><SettingOutlined /></Link>
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
                     onTouchEnd={handleTouchEnd}>
                    <img src={ball} alt="ball" className="ball-image" draggable={false}/>
                    {animations.map(animation => (
                        <div
                            key={animation.id}
                            className="ball-animation"
                            style={{
                                left: `${animation.x}px`,
                                top: `${animation.y}px`,
                            }}
                        >
                            <span>+{animation.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePageTap;
