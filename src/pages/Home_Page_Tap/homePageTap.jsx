import React, { useState, useEffect } from 'react';
import "./homePage.css";
import ball from "../../assets/icons/soccer_ball.png";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { INDEX, SETTINGS } from "../../utils/const.jsx";
import BackTab from "../../component/backTab/BackTab.jsx";

const MAX_ENERGY = 200;

const HomePageTap = () => {
    const [score, setScore] = useState(665);
    const [dailyBonus, setDailyBonus] = useState(0);
    const [animations, setAnimations] = useState([]);
    const [touchCount, setTouchCount] = useState(0);
    const [energy, setEnergy] = useState(MAX_ENERGY);

    const handleTouchStart = (event) => {
        const touchLength = event.touches.length;

        // If energy is zero, no tapping is allowed
        if (energy <= 0) return;

        // Calculate how many touches are allowed based on remaining energy
        const allowedTouches = Math.min(touchLength, energy);
        setTouchCount(allowedTouches);

        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.touches[0].clientX - rect.left;
        const y = event.touches[0].clientY - rect.top;

        const newAnimations = Array.from({ length: allowedTouches }).map((_, index) => ({
            id: Date.now() + index,
            x: x + Math.random() * 10 - 5,
            y: y + Math.random() * 10 - 5,
            value: allowedTouches
        }));

        setAnimations(prev => [...prev, ...newAnimations]);

        // Remove animations after 0.5s
        setTimeout(() => {
            setAnimations(prev => prev.filter(animation => !newAnimations.find(newAnim => newAnim.id === animation.id)));
        }, 200);
    };

    const handleTouchEnd = async () => {
        // Add score and decrease energy based on the number of allowed taps
        await setScore(prevScore => prevScore + touchCount);
        await setEnergy(prevEnergy => Math.max(0, prevEnergy - touchCount)); // Decrease energy
        await setTouchCount(0);
    };

    useEffect(() => {
        // Regenerate energy every 3 seconds
        const intervalId = setInterval(() => {
            setEnergy(prevEnergy => Math.min(MAX_ENERGY, prevEnergy + 1)); // Increase energy by 1
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="home-page">
            <div className="home-page_user_settings">
                <div className="home-page_user">
                    <BackTab back_url={INDEX} />
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
                     onTouchEnd={handleTouchEnd}
                     onContextMenu={(e) => e.preventDefault()} // Disable right-click
                >
                    <img src={ball}
                         alt="ball"
                         className="ball-image"
                         draggable="false"
                         onContextMenu={(e) => e.preventDefault()} // Disable right-click
                    />
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
                <div className="tap_ball_energy">{energy}/{MAX_ENERGY}</div> {/* Display energy */}
            </div>
        </div>
    );
}

export default HomePageTap;
