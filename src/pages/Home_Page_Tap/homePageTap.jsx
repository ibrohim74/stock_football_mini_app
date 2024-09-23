import React, { useState, useEffect, useRef } from 'react';
import "./homePage.css";
import ball from "../../assets/icons/soccer_ball.png";
import { Link, useParams } from "react-router-dom";
import $API from "../../utils/https.jsx";
import user_img from "../../assets/imgs/perspective_matte-59-128x128.png";
import AppBar from "../../component/App_bar/app_bar.jsx";
import clickSound from "../../assets/ui-click-43196.mp3"; // Add your click sound file
import volteg from "../../assets/icons/high-voltage.png";

const HomePageTap = () => {
    const [score, setScore] = useState(0);
    const [dailyBonus, setDailyBonus] = useState(0);
    const [animations, setAnimations] = useState([]);
    const [touchCount, setTouchCount] = useState(0);
    const [energy, setEnergy] = useState(0);
    const [maxEnergy, setMaxEnergy] = useState(200);
    const [ballPressed, setBallPressed] = useState(false);
    const [username, setUsername] = useState('');
    const [vibrationEnabled, setVibrationEnabled] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const { user_id } = useParams();
    const clickAudio = useRef(new Audio(clickSound));
    const timerRef = useRef(null);

    // Fetch user data from API
    const getCoinData = async () => {
        try {
            const res = await $API.get(`http://84.247.160.205/users/${user_id}`);
            setScore(res.data.detail.coins);
            setDailyBonus(res.data.detail.bonus);
            setEnergy(res.data.detail.energy);
            setMaxEnergy(res.data.detail.max_energy);
            setUsername(res.data.detail.username);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getCoinData();
    }, [user_id]);

    // Load vibration and sound settings from localStorage
    useEffect(() => {
        const savedVibration = localStorage.getItem('settings_vibr') === 'true';
        const savedSound = localStorage.getItem('settings_mute') === 'true';
        setVibrationEnabled(savedVibration);
        setSoundEnabled(savedSound);
    }, []);

    // Server update function with debounce
    const updateServer = async (newScore, newEnergy) => {
        try {
            const res = await $API.patch(`http://84.247.160.205/users/${user_id}`, {
                coins: newScore,
                energy: newEnergy
            });
            getCoinData();
        } catch (e) {
            console.log(e);
        }
    };

    const debounceUpdate = (newScore, newEnergy) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            updateServer(newScore, newEnergy);
        }, 1000);
    };

    // Handle tapping the ball
    const handleStart = (event) => {
        if (energy <= 0) return;

        const touches = event.touches || [{ clientX: event.clientX, clientY: event.clientY }];
        const touchLength = touches.length;
        const allowedTouches = Math.min(touchLength, energy);
        setTouchCount(allowedTouches);

        // Vibration effect
        if (vibrationEnabled && navigator.vibrate) {
            navigator.vibrate(100); // 100ms vibration
        }

        // Play sound effect for each tap
        if (soundEnabled) {
            const newClickAudio = new Audio(clickSound);
            newClickAudio.play(); // Play sound on tap
        }

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
            setEnergy(prevEnergy => Math.min(maxEnergy, prevEnergy + 1));
        }, 100);

        return () => clearInterval(intervalId);
    }, [maxEnergy]);

    return (
        <div className="home-page">
            <AppBar />
            <div className="home-page_user_settings">
                <Link to={`/${user_id}/settings`} className="home-page_user">
                    <h1>{username}</h1>
                    <span className="home-page_user_icon"><img src={user_img} alt=""/></span>
                </Link>
            </div>
            <div className="ball-content">
                <div className="ball-score-container">
                    <div className="ball-score">
                        <p>Ballaringiz</p>
                        <h1>{score}</h1>
                    </div>
                    <div className="ball-score">
                        <p>Darajangiz</p>
                        <h1>Oddiy Yigit</h1>
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
                        <p>{energy}/{maxEnergy}</p>
                    </div>
                    <div className="energy_line">
                        <span style={{ width: `${(energy / maxEnergy) * 100}%` }}></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePageTap;
