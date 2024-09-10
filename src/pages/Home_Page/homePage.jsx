import React, { useState, useCallback } from 'react';
import "./homePage.css";
import ball from "../../assets/icons/soccer_ball.png";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { SETTINGS } from "../../utils/const.jsx";

const HomePage = () => {
    const [score, setScore] = useState(665);
    const [dailyBonus, setDailyBonus] = useState(0);
    const [animations, setAnimations] = useState([]);
    const [lastTouch, setLastTouch] = useState(null);
    const [isTouching, setIsTouching] = useState(false);

    const handleBallClick = useCallback((event) => {
        const touchCount = event.touches ? event.touches.length : 1;

        if (!lastTouch || Date.now() - lastTouch > 100) {
            setScore(prevScore => prevScore + touchCount);
            setLastTouch(Date.now());
        }


        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;


        const newAnimations = Array.from({ length: touchCount }).map((_, index) => ({
            id: Date.now() + index,
            x: x + Math.random() * 10 - 5,
            y: y + Math.random() * 10 - 5,
            value: touchCount
        }));

        setAnimations(prev => [...prev, ...newAnimations]);

        setTimeout(() => {
            setAnimations(prev => prev.filter(animation => !newAnimations.find(newAnim => newAnim.id === animation.id)));
        }, 500);     
    }, [lastTouch]);

    const handleTouchStart = (event) => {
        if (!isTouching) {
            setIsTouching(true);
            handleBallClick(event);
        }
    };

    const handleTouchEnd = () => {
        setIsTouching(false);
    };

    return (
        <div className="home-page">
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
                     onClick={handleBallClick}
                     onTouchStart={handleTouchStart}
                     onTouchEnd={handleTouchEnd}>
                    <img src={ball} alt="ball" className="ball-image"/>
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

export default HomePage;
